import Product from "../models/product.js";

export function addProduct (req,res){

    console.log(req.user)

    if(req.user==null){
        res.status(401).json({
            message:"Please login and try again"
        })
        return
    }
    if(req.user.role!="admin"){
        res.status(403).json({
            message:"You are not authorized to add products"
        })
        return
    }
    const data=req.body;
    const newProduct= new Product(data);
    newProduct.save().then((result)=>{
        res.json(result);
    }).catch((error)=>{
        res.status(500).json(error);
    });
}