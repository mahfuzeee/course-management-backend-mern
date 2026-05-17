# Course Management Backend (MERN)

Backend API for managing courses and users.

## Summary

- Express + MongoDB (Mongoose) API for courses and user authentication.
- Authentication: JWT stored in a cookie named `u_token`.

## Getting started

1. Copy `example.env` to `.env` and set values for:
   - `MONGO_URI` — MongoDB connection string
   - `PORT` — server port (default: 3000)
   - `JWT_SECRET` — secret used to sign tokens
   - `JWT_EXPIRES_IN` — token expiry (e.g. `7d`)

2. Install and run:

```bash
npm install
npm run dev   # for development (nodemon)
npm start     # production
```

## API Routes

All routes are grouped under the router files in `src/routes`.

**Auth / User routes**

- POST /api/users/register
  - Description: Register a new user.
  - Body (JSON):
    - `name` (string, required)
    - `email` (string, required, unique)
    - `password` (string, required)
    - `phoneNumber` (string, required)
  - Response: newly created user (sensitive fields omitted by controller).

- POST /api/users/login
  - Description: Login with `email` and `password`.
  - Body (JSON):
    - `email` (string, required)
    - `password` (string, required)
  - Response: on success the server sets a cookie named `u_token` containing a JWT (signed with `JWT_SECRET`).

- GET /api/users/profile (protected)
  - Description: Get current user's profile.
  - Auth: Requires cookie `u_token`.

- PUT /api/users/profile (protected)
  - Description: Update current user's profile.
  - Body (JSON): fields to update (e.g., `name`, `phoneNumber`, `password`).
  - Auth: cookie `u_token` required.

**Course routes**

All course endpoints are protected and require the `u_token` cookie.

- POST /api/courses/
  - Description: Create a new course.
  - Body (JSON):
    - `title` (string, required, unique)
    - `description` (string, required)
    - `price` (number, required, >= 0)
    - `duration` (string, required)
    - `category` (string, required)
    - `instructorName` (string, required)
    - `courseImage` (string, required — URL or file path)

- GET /api/courses/
  - Description: List all courses.

- GET /api/courses/:id
  - Description: Get a single course by its ID.

- PUT /api/courses/:id
  - Description: Update an existing course by ID.
  - Body: any of the course fields (see create body).

- DELETE /api/courses/:id
  - Description: Delete a course by ID.

## Models (shapes)

User:

- `name`: string
- `email`: string
- `password`: string (hashed on save)
- `phoneNumber`: string

Course:

- `title`: string
- `description`: string
- `price`: number
- `duration`: string
- `category`: string
- `instructorName`: string
- `courseImage`: string

## Example requests

Register:

```bash
curl -X POST http://localhost:3000/api/v1/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","password":"pass123","phoneNumber":"1234567890"}'
```

Login (the server will set the `u_token` cookie):

```bash
curl -i -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"pass123"}'
```

Access protected endpoint with cookie (example with `curl` using cookies stored from login):

```bash
# after login, cookie is stored in cookies.txt
curl -b cookies.txt http://localhost:3000/api/v1/users/profile
```

## Notes

- Passwords are hashed automatically via Mongoose pre-save hook in `src/models/user.model.js`.
- Ensure `JWT_SECRET` is strong and kept out of source control.

---

Created by [Md. Mahfuzur Rahman](https://github.com/mahfuzeee)
