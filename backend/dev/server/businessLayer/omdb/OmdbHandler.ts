import fetch from 'node-fetch';
import { type } from 'os';
import Movie from '../../../dataModel/test/movies/Movie';
import QueryGenerator from '../../../utilities/QueryGenerator';
import OmdbConstants from './enums/OmdbConstants';
import { OmdbMultipleMovieQuery, OmdbSingleMovieQuery } from "./interfaces/OmdbMovieQueries.interface";
import { OmdbMultipleMovieResponse, OmdbMultipleMovieResponseUnit, OmdbSingleMovieResponse } from './interfaces/OmdbMovieResponses.interface';

require('dotenv').config();

export default class OmdbHandler extends QueryGenerator {
    
    constructor() {
        super(OmdbConstants.api, {
            apikey:process.env.OMDB_API_KEY || ''
        });
    }

    public async fetchMovies(query:OmdbSingleMovieQuery | OmdbMultipleMovieQuery):Promise<Movie[]> {
        return query.hasOwnProperty('s') ? 
            await this.fetchMultipleMovies(query as OmdbMultipleMovieQuery) : 
            await this.fetchSingleMovie(query as OmdbSingleMovieQuery);
    }

    private async fetchSingleMovie(query:OmdbSingleMovieQuery):Promise<Movie[]> {
        if(!query.i && !query.t) throw new Error('Error: Invalid query!');

        return fetch(this._getURL(query, true)).then(async res => {
            const omdbMovieDTO = await res.json();
            if (omdbMovieDTO.Response === 'False') {
                const errMsg = omdbMovieDTO.Error || 'Error: Udefined error has occurred.';
                throw new Error(errMsg);
            }

            return [this.mapToMovieDocument(omdbMovieDTO)];
        })
    }

    private async fetchMultipleMovies(query:OmdbMultipleMovieQuery):Promise<Movie[]> {
        return fetch(this._getURL(query, true)).then(async (res) => {
            const omdbMoviesDTO:OmdbMultipleMovieResponse = await res.json();

            if (omdbMoviesDTO.Response === 'False') {
                const errMsg = omdbMoviesDTO.Error || 'Error: Udefined error has occurred.';
                throw new Error(errMsg);
            }

            const promises:Promise<Movie[]>[] = omdbMoviesDTO.Search.map((el:OmdbMultipleMovieResponseUnit) => {
                const q = { i: el.imdbID };
                return this.fetchSingleMovie(q);
            });

            return await Promise.all(promises).then(res => res.reduce((acc, val) => acc.concat(val), []))
        })
    }

    private mapToMovieDocument = ({imdbID, Title ,Year, Runtime, Director, Language, Poster, imdbRating, Type, Plot}:OmdbSingleMovieResponse) => {
        return new Movie(imdbID, Title, Year, Runtime, Director, Language, Poster, imdbRating, Type, Plot);
    }

}