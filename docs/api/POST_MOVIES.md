# POST /api/movies
---

Sends a request to [Omdb API](http://www.omdbapi.com), saves/updates results in the database and returns inserted/updated movies.
## Request Information
#### URI Parameters

None.

#### Body Parameters

`x-www-form-urlencoded`

| Name | Description                      | Type                               | Additional Information                       |
|------|----------------------------------|------------------------------------|----------------------------------------------|
| s    | Movie title (multiple documents) | string                             | Fetches multiple documents. Optional*        |
| t    | Movie title (single document)    | string                             | Fetches single document. Optional*           |
| i    | Movie id (single document)       | string                             | Fetches single document. Optional*           |
| plot | Search by a plot                 | string                             | None.                                        |
| page | Page number                      | string                             | Used only with a query for multiple documents. |
| type | Type of a movie                  | 'movie' \| 'series' \| 'episode'   | None.                                        |
| y    | Year of the release              | string (minlength:4, maxlength:10) | None.                                        |
| r    | Return type                      | 'json' \| 'xml'                    | None.                                        |

**Optional*** - While "i", "t" and "s" are optional at least one argument is required

## Request Formats
`application/json, text/json`
##### Sample:
```json
{
    "moviesAdded": [
        {
            "id": "tt0096697",
            "title": "The Simpsons",
            "year": "1989–",
            "runtime": 1320000,
            "director": "N/A",
            "language": "English, Spanish, Albanian, French, Japanese, German, Russian, Hindi, Swahili, Italian, Swedish, Turkish, Cantonese, Mandarin, Hebrew, Arabic, Klingon, Bengali, Czech",
            "poster": "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
            "rating": "8.7",
            "type": "series",
            "plot": "The satiric adventures of a working-class family in the misfit city of Springfield.",
            "$setOnInsert": {
                "__v": 0
            }
        }
    ]
}
```




