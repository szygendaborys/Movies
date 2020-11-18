import Movie from "../../dataModel/movies/Movie";

export const MovieRepository = new Movie().getModelForClass(Movie);

export default MovieRepository;