import Cart from "../models/Cart.js";
import GenericQueries from "./genericQueries.js";
import logger from "../utils/logger.js";

export default class CartService extends GenericQueries{
    constructor(dao){
        super(dao,Cart.model)
    }
    // addProduct = async(id_cart,product)=>{
    //     try{
    //         let file = await this.dao.models[Cart.model].update({_id:id_cart},{$push:{productos:product._id}})
    //         return file
    //     }catch(error){
    //         logger.error(error)
    //     }
    // }
}