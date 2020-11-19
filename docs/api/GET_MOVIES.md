# GET /api/movies
---

Returns an array of movies from the database.
## Request Information
#### URI Parameters

None.

#### Body Parameters

None.

## Request Formats
`application/json, text/json`
##### Sample:
```json
{
    movies: [
        {
            "id": "tt1201607",
            "__v": 0,
            "director": "David Yates",
            "language": "English",
            "plot": "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
            "poster": "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
            "rating": "8.1",
            "runtime": 7800000,
            "title": "Harry Potter and the Deathly Hallows: Part 2",
            "type": "movie",
            "year": "2011"
        },
    ]
}
```




