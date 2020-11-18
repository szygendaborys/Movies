import { instanceMethod, prop, Ref, staticMethod, Typegoose } from '@hasezoey/typegoose';
import { Model } from 'mongoose';
import { InstanceType } from "@hasezoey/typegoose";
import mongoose from 'mongoose';
import Movie from '../movies/Movie';
import CommentVoteRepository from '../../server/repositories/CommentVoteRepository';

export default class Comment extends Typegoose {

    _id:mongoose.Schema.Types.ObjectId;

    @prop({ required: true })
    user: string; // potentially use a ref to the user doc in the future

    @prop({ required: true })
    comment: string;

    @prop({ required: true, min:0, default:0 })
    votesUp: number;

    @prop({ required: true, min:0, default:0 })
    votesDown: number;

    @prop({ required: false, ref: 'Movie' })
    movieRef: Ref<Movie>;

    constructor(user:string = '', comment:string = '', movieRef?:Movie) {
        super();

        this.user = user;
        this.comment = comment;

        this.movieRef = movieRef;

        this.votesUp = 0;
        this.votesDown = 0;
    }

    @staticMethod
    public static async findComments<T>(this: Model<InstanceType<T | any>, {}> & T, query:Object = {}, projection:Object = {}, populateVotes:boolean = false) {
        const comments:any[] = await this.find(query,projection).lean().exec();

        if(populateVotes) {
            const voteDeltasMap = await CommentVoteRepository.getVotesDeltaMapForComments(comments);
            
            for(const comment of comments) {
                const voteDelta = voteDeltasMap.get(comment._id.toString());
                if(voteDelta) {
                    comment.votesUp = voteDelta.positive;
                    comment.votesDown = voteDelta.negative;
                }
            }
        }

        return comments;
    }

    @staticMethod
    public static async addComment<T>(this: Model<InstanceType<T | any>, {}> & T, comment:Comment) {
        await this.create(comment);
    }

    @instanceMethod
    public setMovieRef(movieRef:Movie | mongoose.Schema.Types.ObjectId):void {
        this.movieRef = movieRef;
    }

    @instanceMethod
    public handleVoteAdd(byNumber:number = 0) {
        if(byNumber !== 0) {
            if(byNumber < 0) this.votesDown++;
            else this.votesUp++;
        }
    }

    public get votesDelta():number {
        return this.votesUp - this.votesDown;
    }

    public get totalVotes():number {
        return this.votesUp + this.votesDown;
    }

}