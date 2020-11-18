import Comment from "../../dataModel/comments/Comment";

export const CommentRepository = new Comment().getModelForClass(Comment, { schemaOptions: { timestamps: true } } );

export default CommentRepository;