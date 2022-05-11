import mongoose from "mongoose";

let Schema = mongoose.Schema;
export default class User{
    constructor(data){
        this.data = data;
    }
    static get model(){
        return 'Users';
    }
    static get schema(){
        return{
            email:String,
            password:String,
            first_name:String,
            last_name:String,
            role:String,
            phone:String,
            profile_picture:String,
            status:{
                type:Boolean,
                default:true
            },
            cart:{
                type:[{
                    type: Schema.Types.ObjectId,
                    ref: 'carts'
                }]
            }
        }
    }
}