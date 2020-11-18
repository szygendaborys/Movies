import { expect } from 'chai';
import 'mocha';
import sinon from 'sinon';
import Movie from '../dataModel/movies/Movie';
import OmdbConstants from '../server/businessLayer/omdb/enums/OmdbConstants';
import { OmdbSingleMovieQuery } from '../server/businessLayer/omdb/interfaces/OmdbMovieQueries.interface';
import OmdbHandler from '../server/businessLayer/omdb/OmdbHandler';

describe('Omdb Handling tests', () => {

    let exampleMovie:Movie;
    let instance:OmdbHandler;

    let err:Error = new Error('test error');

    let singleMovieQ:OmdbSingleMovieQuery = {
        t:'test title'
    }

    beforeEach(() => {
        exampleMovie = new Movie('123','My test movie','2000','120 min','Example director','English','exampleurl.com','2.13',OmdbConstants.MovieTypes.MOVIE,'example plot');
        instance = new OmdbHandler();
    });

    it('should fetch a movie', async () => {
        const spy = sinon.spy(instance,'fetchMovies');
        singleMovieQ.t = 'Harry Potter';

        const movies = await instance.fetchMovies(singleMovieQ);

        expect(movies).to.have.lengthOf(1);
        expect(async() => await instance.fetchMovies(singleMovieQ)).to.not.throw();
        expect(spy.calledTwice).to.be.true;
    });

    it('should be called only once', () => {
        const stub = sinon.stub(instance, 'fetchMovies').returns(new Promise(() => [exampleMovie]));
        stub(singleMovieQ);       

        expect(() => stub(singleMovieQ)).to.not.throw(err);
        expect(stub.calledTwice).to.be.true;
    });

    it('runtime of the movie should be 0', () => {
        const testingMovie = new Movie('123','My test movie','2000','N/A','Example director','English','exampleurl.com','2.13',OmdbConstants.MovieTypes.MOVIE,'example plot');
        expect(testingMovie.runtime).to.equal(0);
    });

    it('runtime of the movie should be 7200000ms', () => {
        expect(exampleMovie.runtime).to.equal(7200000);
    });

    it('fetch should throw an error', () => {
        const stub = sinon.stub(instance, 'fetchMovies').withArgs(singleMovieQ).throws(err);
        expect(() => stub(singleMovieQ)).to.throw(err);
    })

});