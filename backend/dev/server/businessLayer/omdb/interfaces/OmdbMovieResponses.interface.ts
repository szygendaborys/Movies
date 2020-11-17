import OmdbConstants from "../enums/OmdbConstants";

export interface OmdbMultipleMovieResponseUnit {
    Title: string,
    Year: string,
    imdbID: string,
    Type: OmdbConstants.MovieTypes,
    Poster: string,
    Error?: string
}

export interface OmdbSingleMovieResponse extends OmdbMultipleMovieResponseUnit {
    Runtime: string,
    Genre: string, //"Animation, Comedy"
    Director: string,
    Actors: string, //"Dan Castellaneta, Nancy Cartwright, Harry Shearer, Julie Kavner"
    Plot: string,
    Language: string, //"English, Spanish, Albanian"
    imdbRating: string, // our rating
    Response: "True" | "False",
}

export interface OmdbMultipleMovieResponse {
    Search: OmdbMultipleMovieResponseUnit[],
    Response: "True" | "False",
    Error?: string
}