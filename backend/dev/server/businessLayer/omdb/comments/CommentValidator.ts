import mongoose from 'mongoose';
import CommentRepository from "../../../repositories/CommentRepository";
import CommentVoteRepository from "../../../repositories/CommentVoteRepository";

export default class CommentValidator {

    public static async handleInsertVoteValidations(user:string, commentId:mongoose.Schema.Types.ObjectId) {
        const projection = {_id:1};
        
        const [comment, haveIVoted] = await Promise.all([
            CommentRepository.findById(commentId, projection).lean(),
            CommentVoteRepository.findOne({
                user,
                comment:commentId
            }, projection).lean()
        ]);

        if(!comment) throw new Error('Error: Comment does not exist!');
        if(haveIVoted) throw new Error('Error: You have already voted!');
    }
}