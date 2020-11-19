# POST /api/comments
---

Posts a comment to the database.

## Request Information
#### URI Parameters

None.

#### Body Parameters

`x-www-form-urlencoded`
| Name     | Description  | Type     | Additional Information                                    |
|----------|--------------|----------|-----------------------------------------------------------|
| user     | User id      | string   | Required. Currently no restrictions to the string format. |
| comment  | Text comment | string   | Required.                                                 |
| movieRef | Movie id     | ObjectId | Optional.*                                                    |

**Optional*** - Optional parameter. Note that this is **not** a movie "id" from the Omdb API, but a reference to the "_id" field of the document from MongoDB.

Movie "_id" can be found by using GET on `/api/movies`.

## Request Formats
`application/json, text/json`
##### Sample:
`Status: 201`
None.