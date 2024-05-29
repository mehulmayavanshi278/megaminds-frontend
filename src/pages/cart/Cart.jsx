import { Button } from '@mui/material'
import axios from 'axios'
import React from 'react'

// 4000003560000008
// const cartItems = [
//     {
//         "ProductID": 1,
//         "name": "Wireless Mouse",
//         "description": "Ergonomic wireless mouse with USB receiver",
//         "Price": 30,
//         "CategoryID": 1,
//         "quantity": 3,
//         "images": ["https://example.com/mouse.jpg"]
//     },
//     {
//         "ProductID": 2,
//         "name": "Mechanical Keyboard",
//         "description": "RGB mechanical keyboard with blue switches",
//         "Price": 30,
//         "CategoryID": 1,
//         "quantity": 2,
//         "images": ["https://example.com/keyboard.jpg"]
//     }
// ]
function Cart() {
//     const handleCheckout = async()=>{
//         try{
//             const res = await axios.post("http://localhost:5000/order/create-checkout-session" , {
//                 cartItems,
//                 userId:"66537e28aea91609ada7ee51",
//             });
//             if(res?.data?.url){
//                 window.location.href=res.data.url
//             }
//         }catch(err){
//             console.log(err);
//         }

//     }
  return (
    <>
      {/* <Button variant="contained"
            color="primary"
            size="large"
            disabled={false}
            onClick={handleCheckout}>Checkout</Button>



<body class="bg-gray-100">



</body> */}
    </>
  )
}

export default Cart
