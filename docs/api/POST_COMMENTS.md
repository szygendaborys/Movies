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

**Optional*** - Note that it is **not** a movie "id" from Omdb API, but a reference "_id" of the document from the MongoDB.

## Request Formats
`application/json, text/json`
##### Sample:
`Status: 201`
None.