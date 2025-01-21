import express from "express"
import axios from "axios"
import bodyParser from "body-parser";
import mongoose from "mongoose"


let app=express();

app.use(bodyParser.json());

let mongourl="mongodb+srv://admin:admin123@cluster0.3gqwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongourl)

let connection=mongoose.connection
connection.once("open",()=>{
    console.log("Mongodb Connection established successfully")
}) 



app.get("/",(req,res)=>{
    console.log("that is a request");
    res.json({
        message:"Good Morning "+req.body.name
    })
});

app.post("/",(req,res)=>{
    let studentSchema=mongoose.Schema({
        name:String,
        age:Number,
        height:Number,

    })

    let Student=mongoose.model("students",studentSchema)

    let newStudent=req.body
    let student=new Student(newStudent)
    student.save().then(
        ()=>{
            res.json({
                "message":"Student saved successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                "message":"Student couldnt be saved"
            })
        }
    )
}

)


app.listen(3000,()=>{
    console.log("server is runing on port 3000")
}

)
