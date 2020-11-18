import { expect } from 'chai';
import 'mocha';
import mongoose from 'mongoose';
import Comment from '../dataModel/comments/Comment';

describe('Comments tests', () => {

    let exampleComment:Comment;

    beforeEach(() => {
        exampleComment = new Comment('123userid','A new testing comment!');
    });

    it('new Comment votesDelta should be equal 0', () => {
        expect(exampleComment.votesDelta).to.equal(0);
    });

    it('votesDelta should be equal 2', () => {
        exampleComment.handleVoteAdd(-1);
        exampleComment.handleVoteAdd(1);
        exampleComment.handleVoteAdd(1);
        exampleComment.handleVoteAdd(1);
        expect(exampleComment.votesDelta).to.equal(2);
    })

    it('should add a Movie ._id as a ref to the comment instance', () => {
        const randomId = new mongoose.Schema.Types.ObjectId('');
        exampleComment.setMovieRef(randomId);
        expect(exampleComment.movieRef).to.equal(randomId);
    });

});