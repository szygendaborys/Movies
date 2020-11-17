import { prop, Typegoose } from '@hasezoey/typegoose';

export default class TestModel extends Typegoose {

    @prop({ required: true })
    test: string;

    constructor(test:string = '') {
        super();
        this.test = test;
    }
}