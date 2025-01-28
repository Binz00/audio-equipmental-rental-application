import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose"
import userRouter from "./routes/userRouter.js"
import productRouter from "./routes/productRouter.js"
import reviewRouter from "./routes/reviewRouter.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

let app=express(); 

app.use(bodyParser.json());
app.use((req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);
            req.user = decoded;
        } catch (error) {
            // Token verification failed - continue without setting user
        }
    }
    
    next();
});


let mongourl=process.env.MONGO_URL;

mongoose.connect(mongourl)

let connection=mongoose.connection
connection.once("open",()=>{
    console.log("Mongodb Connection established successfully")
}) 

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/reviews",reviewRouter)


app.listen(3000,()=>{
    console.log("server is runing on port 3000")
}

)
//u1 123
//customer u2 234 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJlbWFpbCI6InUyLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTczODA1MDMzOH0.5yWwPgW7NtOR72yQ8G8M9zjGtPqSniq2rZk65BI2ANo"
//admin u3  234  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJKb2huIiwibGFzdG5hbWUiOiJEb2UiLCJlbWFpbCI6InUzLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODA1MDU2NX0.PWtDFL2S-y2v1EZdDs1S3_EXUZ1j1SNnxsmTURF1O2U"
