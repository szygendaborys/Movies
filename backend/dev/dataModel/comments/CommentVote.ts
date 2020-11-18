import { InstanceType, prop, Ref, staticMethod, Typegoose } from '@hasezoey/typegoose';
import { Model } from 'mongoose';
import Comment from './Comment';
import mongoose from 'mongoose';

export default class CommentVote extends Typegoose {

    _id:mongoose.Schema.Types.ObjectId;

    @prop({ required: true })
    user: string; // potentially, use a ref to the user doc in the future

    @prop({ required: true, ref: 'Comment' })
    comment: Ref<Comment>;

    @prop({ required: true })
    add: boolean;

    constructor(user:string = '', comment:Ref<Comment>, add:boolean = true) {
            super();

            this.user = user;
            this.comment = comment;
            this.add = add;
        }

    @staticMethod
    public static async getVotesDeltaMapForComments<T>(this: Model<InstanceType<T | any>, {}> & T, comments:Comment[]) {
        let voteMap:Map<string, {
            positive: number,
            negative: number,
        }> = new Map();

        // set default values
        comments.map(comment => voteMap.set(comment._id.toString(), {
            positive: 0,
            negative: 0,
        }));

        const votes = await this.find({
            comment: { $in: comments }
        },{
            comment:1,
            add:1
        }).lean();

        for(const vote of votes) {
            let entry = voteMap.get(vote.comment._id.toString());
            if(entry) {
                vote.add ? entry.positive++ : entry.negative++;
            }
        }

        return voteMap;
    }

    @staticMethod
    public static async findCommentVotes<T>(this: Model<InstanceType<T | any>, {}> & T, query:Object = {}, projection:Object = {}) {
        return this.find(query,projection).lean().exec() as Promise<CommentVote[]>;
    }

    @staticMethod
    public static async insertComment<T>(this: Model<InstanceType<T | any>, {}> & T, commentVote:CommentVote){
        await this.create(commentVote);
    }

    public set setAdd(add:boolean) {
        this.add = add;
    }
}