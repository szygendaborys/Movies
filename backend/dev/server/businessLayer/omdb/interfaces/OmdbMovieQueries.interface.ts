import OmdbConstants from "../enums/OmdbConstants";

interface OmdbMovieQueryOpts {
    type:OmdbConstants.MovieTypes,
    y:string, //year of release
    r:OmdbConstants.MovieReturnType,
}

export interface OmdbSingleMovieQuery extends Partial<OmdbMovieQueryOpts> {
    i?:string, //id
    t?:string // title
    plot?:OmdbConstants.MoviePlot, 
}

export interface OmdbMultipleMovieQuery extends Partial<OmdbMovieQueryOpts> {
    s:string, //title,
    page?:number, //page number. Default to 1
}