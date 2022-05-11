import { productService } from "../services/services.js";
import logger from "../utils/logger.js";

const getAllProducts = async (req, res)=>{
    try{
        productService.getAll().then(result=>{
        res.send({status:'success', payload:result});
        })
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error});
    }
};
const getById = async (req,res)=>{
    try{
        let id = req.params.id;
        productService.getBy({_id:id}).then(result=>{
        res.send({status:'success', payload: result});
        })
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error})
    }
};
const saveProduct = async (req,res)=>{
    try{
        let product = req.body;
        let file = req.file;
        product.thumbnail = req.protocol+"://"+req.hostname+":"+8080+'/images/'+file.filename;
        productService.save(product).then(result=>{
            res.send({status:'success', payload:result});
        });
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error});
    }
}
const updateProduct = async (req,res)=>{
    try{
        let body = req.body;
        let id = req.params.id;
        productService.update(id, body).then(result=>{
            res.send({status:'success', payload:result});
        })
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error});
    }
};
const deleteProduct = async(req,res)=>{
    try{
        let id = req.params.id;
        productService.delete(id).then(result=>{
            res.send({status:'success', message:'Product deleted'});
    })
    }catch(error){
        logger.error(error);
        res.status(500).send({status:'error', error:error})
    }
};

export default {
    getAllProducts,
    getById,
    saveProduct,
    updateProduct,
    deleteProduct
}