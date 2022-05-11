import mongoose from "mongoose";
import User from "./User.js";
import Product from "./Product.js";
import Cart from "./Cart.js";
import Message from "./Message.js"
import logger from "../utils/logger.js";

export default class Dao{
    constructor(config){
        this.mongoose = mongoose.connect(config.url.session,{useNewUrlParser:true}).catch(error=>{
            logger.error(error);
            process.exit();
        })
        const populateProducts = function(next) {
            this.populate('products.product');
            next();
        };
        const populateMessages = function(next){
            this.populate('author');
            next();
        }
        
        const timestamp = {timestamps:{createdAt:'created_at',updatedAt:'updated_at'}};
        const userSchema = mongoose.Schema(User.schema,timestamp);
        const cartSchema = mongoose.Schema(Cart.schema,timestamp);
        cartSchema.pre('findOne', populateProducts)
        const productSchema = mongoose.Schema(Product.schema,timestamp);
        const messageSchema = mongoose.Schema(Message.schema, timestamp);
        messageSchema.pre('find', populateMessages)

        this.models ={
            [User.model]:mongoose.model(User.model,userSchema),
            [Cart.model]:mongoose.model(Cart.model,cartSchema),
            [Product.model]:mongoose.model(Product.model, productSchema),
            [Message.model]:mongoose.model(Message.model, messageSchema)
        }
    }

    findOne = async(options,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let result  = await this.models[entity].findOne(options);
        return result?result.toObject():null;
    }
    getAll = async(options,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let results = await this.models[entity].find(options);
        return results.map(result=>result.toObject());
    }
    insert = async(document,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        try{
            let instance = new this.models[entity](document);
            let result = await instance.save();
            return result?result.toObject():null;
        }catch(error){
            logger.log(error);
            return null;
        }
    }
    update = async(document,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let id = document._id;
        delete document._id;
        let result = await this.models[entity].findByIdAndUpdate(id,{$set:document},{new:true})
        return result.toObject();
    }
    delete = async(id,entity)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let result = await this.models[entity].findByIdAndDelete(id);
        return result?result.toObject():null;
    }
    exists = async(entity,options)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        return this.models[entity].exists(options)
    }
}
