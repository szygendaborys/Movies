module OmdbConstants {
    export enum MovieTypes {
        MOVIE = 'movie',
        SERIES = 'series',
        EPISODE = 'episode',
    }
    export enum MoviePlot {
        SHORT = 'short',
        FULL = 'full'
    }
    export enum MovieReturnType {
        JSON = 'json',
        XML = 'xml'
    }
    export const api = 'http://www.omdbapi.com';
}

export default OmdbConstants;