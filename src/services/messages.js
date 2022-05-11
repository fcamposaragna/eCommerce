import Messages from "../models/Message.js";
import GenericQueries from "./genericQueries.js";

export default class MessageService extends GenericQueries{
    constructor(dao){
        super(dao, Messages.model)
    }
    // getAllAndPopulate = async(params) =>{
    //     let result = await this.dao.models[Messages.model].find(params).populate('author');
    //     return result;
    // }
}