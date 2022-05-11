import mongoose from "mongoose";

export default class Product{
    constructor(data){
        this.data = data;
    }
    static get model(){
        return 'products'
    }
    static get schema(){
        return{
            title:String,
            description:String,
            code:String,
            thumbnail:String,
            price:Number,
            stock:Number,
            status:{
                type: String,
                default: 'available'
            }
        }
    }
}