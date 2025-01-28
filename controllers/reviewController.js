import express from "express";
import Review from "../models/review.js";


export function addReview(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Please login and try again"
        });
        return;
    }
    const data = req.body;
    
    data.name=req.user.firstname+" "+req.user.lastname;
    data.email=req.user.email;
    data.profilePicture=req.user.profilePicture;
    const newReview = new Review(data);

    newReview.save().then(() => {
        res.json({
            message: "Review added successfully"});
    }).catch((error) => {
        res.status(500).json(error);
    });
}

export function getReviews(req, res) {
   const user=req.user;

   if (user== null || user.role != "admin") {
     Review.find({isApproved: true}).then((reviews) => {
       res.json(reviews);
     })
     return;
   }
   if (user.role == "admin") {
     Review.find().then((reviews) => {
       res.json(reviews);
     })
     return;
   }
}

export function deleteReview(req, res) {
    const email = req.params.email;

    if (req.user==null){
        res.status(401).json({error:"Please login and try again"});
        return
    }

    if (req.user.role == "admin") {
        Review.deleteOne({email:email}).then(() => {
            res.json({
                message: "Review deleted successfully"
            });
        }).catch((error) => {
            res.status(500).json({error:"Review deletion failed"});
        });
        return
    }

    if (req.user.role=="customer"){
        if (req.user.email!=email){
            Review.deleteOne({email:email}).then(() => {
                res.json({
                    message: "Review deleted successfully"
                });
            }).catch((error) => {
                res.status(500).json({error:"Review deletion failed"});
            });  
        }else{
            res.status(403).json({error:"You cannot delete your own review"});
        }
    }

    
}

export function approveReview(req, res) {
    const email = req.params.email;

    if (req.user==null){
        res.status(401).json({error:"Please login and try again"});
        return
    }

    if (req.user.role == "admin") {
        Review.updateOne({email:email},{$set:{isApproved:true}}).then(() => {
            res.json({
                message: "Review approved successfully"
            });
        }).catch((error) => {
            res.status(500).json({error:"Review approval failed"});
        });
        return
    }else{
        res.status(403).json({error:"You are not authorized to approve reviews"});
    }
}