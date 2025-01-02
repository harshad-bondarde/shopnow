import Product from "../models/product.model.js"
import cloudinary from "../lib/cloudinary.js"

export const getAllProducts=async (req,res)=>{
    try {
        const products=await Product.find({})
        return res.status(200).json({
            products
        })
    } catch (error) {
        console.log("Error while getting all products ",error.message)
        return res.status(500).json({
            message:"server error",
            error:error.message
        })
    }
}
export const getFeaturedProducts=async (req,res)=>{
    const featuredProducts=await Product.find({isFeatured:true}) //lean() sends plain js obj instead of mongodb document
    if(!featuredProducts)
            return res.status(404).json({
                messgae:"No featured products found"
            })
    return res.status(200).json({
        featuredProducts
    })
}

export const createProduct=async(req,res)=>{
    try {
        const {name,description,price,image,category}=req.body.newProduct
        let cloudinaryRes=null
        if(image){
            cloudinaryRes=await cloudinary.uploader.upload(image,{folder:"products"})
        }
        const product=await Product.create({
            name,
            description,
            price,
            image:cloudinaryRes?.secure_url ? cloudinaryRes?.secure_url : "",
            category
        })
        console.log(product)
        // product.save()
        res.status(200).json({
            product
        })
    } catch (error) {
        console.log("Error while adding product ",error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({
                messgae:"No products found"
            })
        }
        if(product.image){
            const publicId=product.image.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`)
                console.log("image deleted")
            } catch (error) {
                console.log("error while deleting image from cloudinary")                
            }
        }
        await Product.findOneAndDelete(req.params.id)
        res.status(200).json({
            message:"product deleted successfully"
        })
    } catch (error) {
        console.log("error in deleteproduct controller")
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getRecommendedProducts=async (req,res)=>{
    try {
        const products=await Product.aggregate([
            {
                $sample:{size:3}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                }
            }
        ])
        res.status(200).json({
            products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getProductsByCategory=async (req,res)=>{
    const { category }=req.params
    try {
        const products=await Product.find({category})
        res.status(200).json({
            products
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message
        })
    }
}

export const toggleProductFeature=async (req,res) =>{ 
    try {
        const product=await Product.findById(req.params.id)
        if(product){
            product.isFeatured=!product.isFeatured
            const updated=await product.save()
            res.status(200).json({
                isFeatured:updated.isFeatured
            })
        }else{
            res.status(404).json({
                message:"Product not found"
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message:error.message
        })
    }

}
