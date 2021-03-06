# POST /api/comments/vote
---

Post a vote for the particular comment.
## Request Information
#### URI Parameters

None.

#### Body Parameters

| Name    | Description            | Type     | Additional Information                                   |
|---------|------------------------|----------|----------------------------------------------------------|
| user    | User id                | string   | Required. Currently no string format restrictions.       |
| comment | Comment id             | ObjectId | Required. A MongoDB ObjectId reference to the specified comment '_id'. |
| add     | Positive/Negative Vote | boolean  | Optional. Default value = true. If true - upvote the comment.                |

Comment "_id" can be found by using GET on `/api/comments`.

## Request Formats
`application/json, text/json`
##### Sample:
`status: 201`
None.

## Common Errors
```
{
    "error": "Error: You have already voted!"
    "error": "Error: Comment does not exist!"
    "error": "Error: Invalid query!"
    "error": "Error: Undefined error has occurred."
}
```


