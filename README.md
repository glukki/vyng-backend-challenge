Execute
====
`heroku local`

Environment variables
====

Required
======
- `MONGO_USER` - mongo user
- `MONGO_PASSWORD` - mongo password
- `MONGO_URI` - mongo uri in `host:port/database` format

Optional
======
- `PORT` - server port to listen on


Endpoints
====
All endpoints expect `application/json` request type

Free to request:
- `POST /user/register` - create new user, request: `{"login": "chuck", "name": "Norris"}`
- `POST /user/login` - get auth token, request: `{"login": "chuckvit"}`

Require `Authorization: Bearer <token>` header:
- `POST /channel` - create new channel for the current user, request: `{"name": "cats"}`
- `GET /channel` - get all channels created by the current user, request: `{}`
- `POST /video` - create new video for the current user, request: `{"name": "meow", "url": "http://example.com", "channel": "5c3798a813256d045bc2734a"}`
- `GET /video` - get all videos created by the current user, request: `{}`
