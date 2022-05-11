import Dao from "../models/Dao.js";
import UserService from "./users.js";
import ProductService from "./products.js";
import CartService from "./carts.js";
import MessageService from './messages.js';
import config from '../config/config.js';

const dao = new Dao(config.mongo);

export const userService = new UserService(dao);
export const productService = new ProductService(dao);
export const cartService = new CartService(dao);
export const messageService = new MessageService(dao);