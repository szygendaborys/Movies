import { expect } from 'chai';
import 'mocha';
import QueryGeneratorOpts from '../server/interfaces/queryGeneratorOpts.interface';
import QueryGenerator from '../utilities/QueryGenerator';

describe('QueryGenerator tests', () => {

    let q:{[key:string]:string} = {
        val1: '3431',
    }

    let api = 'http://www.test.com';
    let opts:QueryGeneratorOpts = {
        apikey:'testapikey'
    }

    class TestingClass extends QueryGenerator {
        constructor(api:string, opts?:QueryGeneratorOpts) {
            super(api, opts);
        }

        public getUrl(query:{[key:string]:string},requireApiKey:boolean = false) {
            return this._getURL(query, requireApiKey);
        }

        public getQuery(query:{[key:string]:string},requireApiKey:boolean = false) {
            return this._generateQueryEntries(query,requireApiKey);
        }
    }

    let instance:TestingClass;

    beforeEach(() => {
        instance = new TestingClass(api, opts);
    });

    it('should return a valid url with no secure key', () => {
        const url = instance.getUrl(q);
        expect(url).to.equal(`${api}/?val1=${q.val1}`);
    });

    it('should return a valid url with a secure key', () => {
        const url = instance.getUrl(q, true);
        expect(url).to.equal(`${api}/?apikey=${opts.apikey}&val1=${q.val1}`);
    });

    it('should throw an error', () => {
        expect(() => instance.getQuery(undefined, true)).to.throw(TypeError, 'Cannot convert undefined or null to object');
    })

});