import axios from "axios";
import { createContext } from "react";

export let WishContext = createContext(0)

export default function WishContextProvider(props){

    let headers = {
        token:localStorage.getItem("userToken")
    }
    function getLoggedWish(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
        .then((res)=>res)
        .catch((error)=>error)
    }
    function addProductt(prodId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            productId: prodId
        },{
            headers
        })
        .then((res)=>res)
        .catch((err)=>err)
    }
    function deleteProductt(prodId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,{
            headers
        })
        .then((res)=>{
            res
        })
        .catch((err)=>{err

        })
    }
    // function deleteProductt(prodId){
    //     return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${prodId}`,{
    //         headers
    //     })
    //     .then((res)=>res)
    //     .catch((err)=>err)
    // }
    return <WishContext.Provider value={{getLoggedWish,addProductt,deleteProductt}}>
        {props.children}
    </WishContext.Provider>
}