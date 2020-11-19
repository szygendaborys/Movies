# GET /api/comments/vote
---

This gets all comment votes from the database.
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
    "comments": [
            {
                "_id": "5fb69c3c966a3800035ce2c2",
                "user": "Borys",
                "comment": "5fb69841966a3800035ce2c0",
                "add": true,
                "createdAt": "2020-11-19T16:24:29.000Z",
                "updatedAt": "2020-11-19T16:24:29.000Z",
                "__v": 0
            }
    ]
}
```




