# GET /api/comments/:id
---

This gets comments from the database.
If parameter `:id` is specified it returns the particular comment.

## Request Information
#### URI Parameters

| Name | Description | Type     | Additional Information             |
|------|-------------|----------|------------------------------------|
| :id  | Comment id  | ObjectId | Optional. An "_id" reference to the document |

#### Body Parameters

None.

## Request Formats
`application/json, text/json`
##### Sample:
`/api/comments/5fb69841966a3800035ce2c0`
```json
{
    "comments": [
        {
            "_id": "5fb69841966a3800035ce2c0",
            "votesUp": 0,
            "votesDown": 0,
            "user": "Borys",
            "comment": "An amazing movie!",
            "movieRef": "5fb5b8b4d94be98453d38355",
            "createdAt": "2020-11-19T16:07:29.251Z",
            "updatedAt": "2020-11-19T16:07:29.251Z",
            "__v": 0
        }
    ]
}
```




