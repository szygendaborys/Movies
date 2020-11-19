
import * as express from "express";
import Controller from "../interfaces/controller.interface";
import Comment from '../../dataModel/comments/Comment';
import CommentRepository from "../repositories/CommentRepository";
import CommentVote from "../../dataModel/comments/CommentVote";
import CommentVoteRepository from "../repositories/CommentVoteRepository";
import CommentValidator from "../businessLayer/comments/CommentValidator";

export default class CommentsController implements Controller {
    public path: string = '/comments';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(`${this.path}/vote`, this.getCommentVotes);
        this.router.post(`${this.path}/vote`, this.postCommentVote);

        this.router.get(this.path, this.getComments);
        this.router.get(`${this.path}/:id`, this.getComment);
        this.router.post(this.path, this.postComment);       
    }
    
    private getComments = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const comments = await CommentRepository.findComments({},{},true);

            res.status(200).json({ comments });
        } catch (err) {
            next(err);
        }
    };

    private getComment = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { id } = req.params;
            const comment = await CommentRepository.findById(id);

            res.status(200).json({
                comments: [comment]
            })
        } catch (err) {
            next(err);
        }
    };

    private postComment = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { user, comment, movieRef } = req.body;

            const commentDTO = new Comment(user, comment, movieRef);
            await CommentRepository.addComment(commentDTO);

            res.status(201).end();
        } catch (err) {
            next(err);
        }
    };

    private getCommentVotes = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const comment = await CommentVoteRepository.findCommentVotes();

            res.status(200).json({
                comments: comment
            })
        } catch (err) {
            next(err);
        }
    };

    private postCommentVote = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { user, comment, add } = req.body;
            const commentVoteDTO = new CommentVote(user, comment, add);
            
            await CommentValidator.handleInsertVoteValidations(user, comment);
            await CommentVoteRepository.insertComment(commentVoteDTO);

            res.status(201).end();
        } catch (err) {
            next(err);
        }
    };


}
