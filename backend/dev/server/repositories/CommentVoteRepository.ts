import CommentVote from "../../dataModel/comments/CommentVote";
import mongoose from 'mongoose';

export const CommentVoteRepository = new CommentVote('', new mongoose.Schema.Types.ObjectId('')).getModelForClass(CommentVote, { schemaOptions: { timestamps: true } } );

export default CommentVoteRepository;