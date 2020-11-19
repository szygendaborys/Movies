import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import Comment from '../dataModel/comments/Comment';
import CommentVote from '../dataModel/comments/CommentVote';
import CommentValidator from '../server/businessLayer/comments/CommentValidator';

describe('Comment validator/vote tests', () => {

    let exampleCommentVote:CommentVote;
    let err:Error = new Error('test error');
    let validator = CommentValidator;

    beforeEach(() => {
        exampleCommentVote = new CommentVote('123userid',new Comment(), true);
    });

    afterEach(function () {
        sinon.restore();
    });

    it('comment validator should fail', () => {
        const stub = sinon.stub(validator, 'handleInsertVoteValidations').throws(err);

        expect(() => stub('asd', exampleCommentVote._id)).to.throw(err);
        expect(stub.calledOnce).to.be.true;
    })

    it('comment validator response should be void/null and be called once', () => {
        const stub = sinon.stub(validator, 'handleInsertVoteValidations').returns(new Promise(() => {}));
        stub('asd', exampleCommentVote._id).then((data) => {
            expect(data).to.be.null;
            expect(stub.calledOnce).to.be.true;
        });
    })

});