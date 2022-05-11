import { createTransport } from 'nodemailer';
import config from '../config/config.js';

const transport = createTransport({
    service:'gmail',
    port:587,
    auth:{
        user: config.nodemailer.USER,
        pass: config.nodemailer.PASS
    }
})

export const sendEmail = (user)=>{
    const email = {
        from:'e-Commerce mail <e-Commerce>',
        to: config.nodemailer.USER,
        subject: 'Nuevo registro!',
        text: `Se registro un nuevo usuario:
        nombre: ${user.first_name},
        apellido: ${user.last_name},
        email: ${user.email}`
    }
    return transport.sendMail(email);
};
export const sendEmailConfirmation = (data)=>{
    const email = {
        from:'e-Commerce mail <e-Commerce>',
        to: config.nodemailer.USER,
        subject: 'Nueva compra!',
        text: `El usuario ${data.first_name} ${data.last_name} ha realizado una nueva compra:
        Productos: ${data.products}`
    }
    return transport.sendMail(email)
}