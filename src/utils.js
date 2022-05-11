import bcrypt from 'bcrypt';

export const createHash = password=> bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword =(user, password)=> bcrypt.compareSync(password,user.password);
export const serialize = (object,keys) =>{
    let serializedObject = Object.fromEntries(Object.entries(object).filter(pair=>keys.includes(pair[0])))
    serializedObject.id = object._id;
    return serializedObject;
}