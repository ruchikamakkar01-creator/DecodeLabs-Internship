# Task API - Project 2

A simple backend API made with Node.js and Express.

## How to run it

1. Install dependencies:
```
npm install
```

2. Start the server:
```
npm start
```

3. It runs on http://localhost:3000

## Endpoints

- `GET /tasks` - returns all tasks
- `GET /tasks/:id` - returns one task, or 404 if it doesn't exist
- `POST /tasks` - creates a new task (needs a `title` in the request body)

## Testing it

You can use Postman, Thunder Client (VS Code extension), or curl.

Example POST body:
```json
{
  "title": "Buy groceries"
}
```

If you leave out the title, it returns a 400 error instead of creating the task.

## Notes

Tasks are stored in a plain array in memory, not a real database - so
they reset every time the server restarts. That's fine for this project
since a database wasn't required.
