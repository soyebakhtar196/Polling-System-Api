//API Question Controller
const Question = require("../../models/question");
const Option = require("../../models/options");
const mongoose = require('mongoose');

//controller to get all questions
module.exports.getAll=async (req,res)=>{
    try{
        let questions= await Question.find()
        //populating all questions
        .populate({
            path:'options'
        });
        if(questions){
            return res.status(200).json({
            message:'List of Questions',
            questions:questions
        });
        }
        console.log(`Could not fetch questions!`);
        return res.json(401,{message:'Could not fetch questions!'});        
    }
    catch(error){
        console.log(error)
        return res.json(500,{message:'Internal server error'});
    }
}

//controller to create question
module.exports.create=async (req,res)=>{
    try{
        let question= await Question.create(req.body);
        if(question){
            console.log(`Created question : ${question}`);
            return res.json({
                question,
                data: { message: "question created successfully" },
              });
        }
        console.log(`Could not create question!`);
        return res.json(401,{message:'Could not create question!'});
    }
    catch(error){
        console.log(error)
        return res.json(500,{message:'Internal server error'});
    }
}

//controller to create option
module.exports.createOption=async (req,res)=>{
    try{    
        if(!req.params.id){
            console.log(`Could not find question ID!`);
            return res.json(401,{message:'Could not find question ID!'});
        }
        let id = mongoose.Types.ObjectId();
        let option= await Option.create({_id:id,text:req.body.text,link_to_vote:`http://localhost:8000/api/options/${id}/add_vote`,question:req.params.id});
        if(option){
            let pushedoption=await Question.findByIdAndUpdate(req.params.id,{$push:{"options":id}})
            console.log(`Created option : ${pushedoption}`);
            
            return res.json({
                option,
                data: {
                  message: "option created",
                },
              });
        }
        console.log(`Could not create question!`);
        return res.json(401,{message:'Could not create question!'});
    }
    catch(error){ 
        console.log(error)
        return res.json(500,{message:'Internal server error'});
    }
}

//controller to delete question
module.exports.delete=async (req,res)=>{
    try{
        if(!req.params.id){
            console.log(`Could not find question ID!`);
            return res.json(401,{message:'Could not find question ID!'});
        }

        let id = req.params.id;
        let question = await Question.findById(id).populate({path: "options",select: "votes",});
        if (question) {
            // any votes on any option (if any)
            let options = question.options;

            for (let i = 0; i < options.length; i++) {
                if (options[i].votes > 0) {
                return res.status(404).json({
                    data: {message:"questions option has some votes , Not Possible to delete ",},
                });
                }
            }
        }
        let deletedQuestion= await Question.findByIdAndDelete(id);
        let deletedQuestionOptions=await Option.deleteMany({question:id});
        if(deletedQuestion){
            console.log(`Deleted Question : ${deletedQuestion.title}`);
            return res.json(200,{message:`Deleted Question : ${deletedQuestion.title}`});
        }
        console.log(`Could not delete question!`);
        return res.json(401,{message:'Could not delete question!'});
    }
    catch(error){ 
        console.log(error)
        return res.json(500,{message:'Internal server error'});
    }
}

//controller to get question by ID
module.exports.getByID=async (req,res)=>{
    try{
        if(!req.params.id){
            console.log(`Could not find question ID!`);
            return res.json(401,{message:'Could not find question ID!'});
        }
        let question=await Question.findById(req.params.id)
        .populate({
            path:'options'              //populating current question
        });
        if(question){
            console.log(`Fetched Question : ${question.title}`);
            return res.json({ question });
        }
        console.log(`Could not fetch question!`);
        return res.json(401,{message:'Could not fetch question!'});
    }
    catch(error){ 
        console.log(error)
        return res.json(500,{message:'Internal server error'});
    }
}