export type User ={
    _id?:string
    name:string,
    email:string,
    password:string,
    birthDay:Date|null,
    image:string
    role?:string
}