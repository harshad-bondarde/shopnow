import React from 'react'

const PurchaseSuccessPage = () => {
    const sessionId=new URLSearchParams(window.location.search).get("session_id")
    return (
        <div>
            Order is set
        </div>
    )
}

export default PurchaseSuccessPage
