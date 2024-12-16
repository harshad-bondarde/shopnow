import CategoryItem from "../components/CategoryItem"
const categories=[
  { href:"/jeans",name:"Jeans",imageUrl:"/jeans.jpg"},
  { href:"/t-shirts",name:"T-shirts",imageUrl:"/tshirts.webp"},
  { href:"/shoes",name:"Shoes",imageUrl:"/shoes.webp"},
  { href:"/glasses",name:"Glasses",imageUrl:"/glasses.png"},
  { href:"/jackets",name:"Jackets",imageUrl:"/jackets.webp"},
  { href:"/suits",name:"Suits",imageUrl:"/suits.jpg"},
  { href:"/bags",name:"Bags",imageUrl:"/bag.webp"},
]
const HomePage = () => {
  return (
    <>
      <div className="min-h-screen text-white ">
        <div className=" mx-auto px-4 py-16">
          <div className="text-center text-4xl font-bold text-blue-300 mb-12">
            Explore Our Categories
          </div>
          <div className="text-center text-xl text-gray-300 mb-12">
            Discover lastest trends 
          </div>
          <div className="grid grid-cols-3 gap-4 m-20">
            {categories.map((category,key)=>(<CategoryItem key={key} category={category}/>))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
