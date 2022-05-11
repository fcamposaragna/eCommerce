import { cartService, productService } from "../services/services.js";
import logger from "../utils/logger.js";

const saveCart = async (req, res)=>{
    try{
        cartService.save().then(result=>{
            res.send({status:'success', payload:result})
        })
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error})
    }
};
const getById = async (req,res)=>{
    try{
        let id = req.params.cid;
        let cart = await cartService.getBy({_id:id});
        res.send({status:'success', payload:cart});
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error})
    }
};
const addProduct = async (req,res)=>{
    let quantityChanged = false;
    let { cid, pid } = req.params;
    let { quantity } = req.body;
    try{
        //Check product
        let product = await productService.getBy({_id:pid});
        if(!product) return res.status(404).send({status:'error', error:'Product not found'});
        //Check cart
        let cart = await cartService.getBy({_id:cid});
        if(!cart) return res.status(404).send({status:'error', error:'Cart not found'})
        //Check stock
        if(product.stock===0) return res.status(400).send({status:'error', error:'No stock'});
        //Check quantity
        if(product.stock<quantity){
            quantity = product.stock
            quantityChanged = true
        };
        //Update stock
        product.stock = product.stock - quantity;
        //Check if stock is 0
        if(product.stock===0){
            product.status = 'unaviable'
        }
        cart.products.push({product:pid,quantity});
        await cartService.update(cid,cart);
        res.send({status:'success', quantityChanged, newQuantity:quantity, message:'Product added in cart'});
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error});
    }
};

const deleteProduct = async (req,res)=>{
    let { cid, pid } = req.params;
    try{
        //Check cart
        let cart = await cartService.getBy({_id:cid});
        if(!cart) return res.status(404).send({status:'error', error:'Cart not found'});
        //Exists product in to the cart?
        if(cart.products.some(element=>element.product._id.toString()===pid)){
            let product = await productService.getBy({_id:pid});
            if(!product) return res.status(404).send({status:'error', error:'Product not found'});
            //product on cart
            let productInCart = cart.products.find(element=>element.product._id.toString()===pid);
            //refresh quantity
            product.stock = product.stock + productInCart.quantity;
            await productService.update(pid, product);
            //delete product from cart
            cart.products = cart.products.filter(element=>element.product._id.toString()!==pid);
            await cartService.update(cid, cart);
            res.send({staus:'success', message:'product deleted'})
        }else{
            res.status(400).send({status:'error', error:'Product not found in Cart'})
        }
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error});
    }
}
const updateCart = async(req,res)=>{
    let { cid } = req.params;
    let { products } = req.body;
    let stockLimitation = false;
    //Check cart
    let cart = await cartService.getBy({_id:cid});
    if(!cart)  return res.status(404).send({status:"error",error:"Can't find cart"});
    //Check the availability of each product in the cart
    for(const element of cart.products){
        let product = await productService.getBy({_id:element.product});
        //Get the product in actual cart in order to make a comparison between que current quantity and requested quantity
        let associatedProductInCart = cart.products.find(element=>element.product._id.toString()===product._id.toString());
        //Now get the product in the requested product to check out the quantity
        let associatedProductInInput = products.find(element=>element.product.toString()===product._id.toString());
        if(associatedProductInCart.quantity!==associatedProductInInput.quantity){
            //Ask if the requested quantity is less than the current quantity of the cart
            if(associatedProductInCart.quantity>associatedProductInInput.quantity){
                let difference = associatedProductInCart.quantity - associatedProductInInput.quantity;
                associatedProductInCart.quantity = associatedProductInInput.quantity;
                product.stock+=difference;
                await productService.update(product._id,product);
            }else{
                let difference = associatedProductInInput.quantity - associatedProductInCart.quantity;
                if(product.stock>=difference){//It's ok. We can add it to the cart
                    product.stock -=difference;
                    await productService.update(product._id,product);
                    associatedProductInCart.quantity = associatedProductInInput.quantity;
                }
                else{//There's no sufficient stock to add to the cart
                    stockLimitation=true;
                    associatedProductInCart.quantity +=product.stock;
                    product.stock=0;
                    await productService.update(product._id,product);
                }
            }
        }
        else{
            console.log("La cantidad para este producto no cambió")
        }
    }
    await cartService.update(cid,cart);
    res.send({status:"success",stockLimitation})
}
const confirmPurchase = async(req,res)=>{
    let { cid } = req.params;
    try{
        //Check cart
        let cart = await cartService.getBy({_id:cid});
        if(!cart) return res.status(404).send({status:'error', error:'Cart Not Found'});
        //Empty cart
        cart.products=[];
        await cartService.update(cid, cart);
        res.status(200).send({status:'success', message:'Finished purchase'});
    }catch(error){
        logger.error(error);
        res.stauts(500).send({status:'error', error:error});
    }
}
export default {
    saveCart,
    getById,
    addProduct,
    deleteProduct,
    updateCart,
    confirmPurchase
}