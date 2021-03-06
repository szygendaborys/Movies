import QueryGeneratorOpts from "../server/interfaces/queryGeneratorOpts.interface";
import QueryParams from "../server/interfaces/queryParams.interface";

// NOTE: This could be achieved also by using a node module called 'querystring' -> require('querystring').stringify(query);
abstract class QueryGenerator {

    protected readonly _api:string;

    private readonly _opts:QueryGeneratorOpts = {};

    constructor(api:string, opts?:QueryGeneratorOpts) {
        this._api = api;

        if(opts) this._opts = Object.assign(this._opts, opts);
    }

    protected _getURL(query:QueryParams, requireApiKey:boolean = false):string {
        return `${this._api}/${this._generateQueryEntries(query, requireApiKey)}`
    }

    protected _generateQueryEntries(queryParams:QueryParams, requireApiKey:boolean = false):string {
        let query = ``;

        if(requireApiKey) query += `&apikey=${encodeURIComponent(this._opts.apikey)}`;

        for(const [k,v] of Object.entries(queryParams)) {
            query += `&${k}=${encodeURIComponent(v)}`            
        }

        query = query.substring(1);
        query = `?${query}`;

        return query;
    }

}

export default QueryGenerator;