import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose"
import userRouter from "./routes/userRouter.js"
import productRouter from "./routes/productRouter.js"





let app=express(); 

app.use(bodyParser.json());
app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (token) {
        try {
            const decoded = jwt.verify(token, "kv-secret-89!");
            req.user = decoded;
        } catch (error) {
            // Token verification failed - continue without setting user
        }
    }
    
    next();
});


let mongourl="mongodb+srv://binzsilva75:12345@cluster0.jnn7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongourl)

let connection=mongoose.connection
connection.once("open",()=>{
    console.log("Mongodb Connection established successfully")
}) 

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)


app.listen(3000,()=>{
    console.log("server is runing on port 3000")
}

)
