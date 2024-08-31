import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(0)

export default function CartContextProvider(props){

    let headers = {
        token:localStorage.getItem("userToken")
    }
    const [cartid, setcartid] = useState(0)
    const [numberItems, setnumberItems] = useState(0)
    function getLoggedCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
        .then((res)=>{
            console.log(res.data.numOfCartItems);
            setnumberItems(res.data.numOfCartItems);
            setcartid(res.data._id)
            return res
        })
        .catch((error)=>error)
    }
    function addProduct(prodid){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId: prodid
        },{
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }
    function updateProduct(prodid , count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodid}`,{
            count: count
        },{
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }
    function deleteProduct(prodid){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodid}`,{
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }
    function checkoutCart(cartId , url , formvl){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress: formvl
        },{
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }
    return <CartContext.Provider value={{getLoggedCart,addProduct,updateProduct,deleteProduct,checkoutCart,cartid,setcartid,setnumberItems,numberItems}}>
        {props.children}
    </CartContext.Provider>
}