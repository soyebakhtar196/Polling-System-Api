//API Option Controller
const Question = require("../../models/question");
const Option = require("../../models/options");

//controller to delete option
module.exports.delete=async (req,res)=>{
    try{
        if(!req.params.id){
            console.log(`Could not find option ID!`);
            return res.json(401,{message:'Could not find option ID!'});
        }
        let id = req.params.id;

        // finding the option exists or not
        let option = await Option.findById(id);
    
        // if option is present then check it has vote or not
        // if option has vote then not have to delete it
        if (option.votes > 0) {
          return res.status(404).json({
            data: { message: "can't delete it! It has vote" },
          });
        }

        let deletedOption= await Option.findByIdAndDelete(id);
        console.log(deletedOption);
        await Question.findByIdAndUpdate(deletedOption.question,{$pull:{"options":deletedOption.id}});
        if(deletedOption){
            console.log(`Deleted Option : ${deletedOption.text}`);
            return res.json(200,{message:`Deleted Option : ${deletedOption.text}`});
        }
        console.log(`Could not delete option!`);
        return res.json(401,{message:'Could not delete option!'});
    }
    catch(error){ 
        console.log(error)
        return res.json(500,{message:'Internal server error'});
    }
}

//controller to add vote to option
module.exports.add_vote=async (req,res)=>{
    try{    
        if(!req.params.id){
            console.log(`Could not find option ID!`);
            return res.json(401,{message:'Could not find option ID!'});
        }
        let addVoteToOption= await Option.findByIdAndUpdate(req.params.id,{$inc:{'votes' : 1}});
        if(addVoteToOption){
            console.log(`Voted Option : ${addVoteToOption.text} with ${addVoteToOption.votes + 1} votes`);
            return res.json(200,{message:`Voted Option : ${addVoteToOption.text} with ${addVoteToOption.votes + 1} votes`});
        }
        console.log(`Could not vote option!`);
        return res.json(401,{message:'Could not vote option!'});
    }
    catch(error){ 
        console.log(error)
        return res.json(500,{message:'Internal server error'});
    }
}