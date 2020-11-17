import { prop, staticMethod, Typegoose } from '@hasezoey/typegoose';
import { Model } from 'mongoose';
import OmdbConstants from '../../server/businessLayer/omdb/enums/OmdbConstants';
import { InstanceType } from "@hasezoey/typegoose";

export default class Movie extends Typegoose {

    @prop({ required: true })
    id: string;

    @prop({ required: true })
    title: string;

    @prop({ required: true, minlength:4, maxlength:10 })
    year: string;

    @prop({ required: true })
    runtime: number; //ms

    @prop({ required: true })
    director: string;

    @prop({ required: true })
    language: string;

    @prop({ required: true })
    poster: string;

    @prop({ required: true })
    rating: string;

    @prop({ required: true, enum: OmdbConstants.MovieTypes })
    type: OmdbConstants.MovieTypes;

    @prop({ required: true })
    plot: string;

    constructor(id:string = '', title:string = '', year:string = '9999', runtime:string = '0', director:string = '', language:string = '', 
        poster:string = '', rating:string = '', type:OmdbConstants.MovieTypes = OmdbConstants.MovieTypes.MOVIE, plot:string = '') {
            super();

            this.id = id;
            this.title = title;
            this.year = year;
            this.runtime = this.getRuntimeInMs(runtime);
            this.director = director;
            this.language = language;
            this.poster = poster;
            this.rating = rating;
            this.type = type;
            this.plot = plot;

        }

    @staticMethod
    public static async findMovies<T>(this: Model<InstanceType<T | any>, {}> & T) {
        return this.find({},{_id:0}).lean().exec() as Promise<Movie[]>;
    }

    @staticMethod
    public static async insertMovies<T>(this: Model<InstanceType<T | any>, {}> & T, movies:Movie[]) {
        await Promise.all(
            movies.map(movie => this.updateOne(
                { id:movie.id }, movie, { upsert:true }
            ))
        );
    }

    private getRuntimeInMs(runtime:string):number {
        const minutes = Number(runtime.split(" ")[0]);
        if(isNaN(minutes)) return 0;
        return minutes * 60 * 1000; // ms format
    }

}