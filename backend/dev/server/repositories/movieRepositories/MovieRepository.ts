import Movie from "../../../dataModel/test/movies/Movie";

export const MovieRepository = new Movie().getModelForClass(Movie);

export default MovieRepository;