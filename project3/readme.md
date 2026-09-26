# Task API with MySQL - Project 3

Backend API connected to a real MySQL database, so data is saved
permanently instead of disappearing when the server restarts.

## Before you run it

1. Make sure MySQL is running on your machine.

2. Create the database (using MySQL Workbench, or the command line):

```sql
CREATE DATABASE task_app;
```

3. Open `server.js` and update the `dbConfig` at the top with your own
   MySQL username and password:

```js
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "task_app",
};
```

You don't need to create the `tasks` table yourself - the server does
that automatically the first time it runs.

## How to run it

```
npm install
npm start
```

Runs on http://localhost:3000

## Endpoints

- `GET /tasks` - get all tasks
- `GET /tasks/:id` - get one task
- `POST /tasks` - create a task (needs `title` in the body)
- `PUT /tasks/:id` - update a task's title/completed status
- `DELETE /tasks/:id` - delete a task

## Example requests

Create a task:

```
POST /tasks
{ "title": "Buy groceries" }
```

Update a task:

```
PUT /tasks/1
{ "title": "Buy groceries and milk", "completed": true }
```

## Notes

- Data is stored in a real MySQL table now (`tasks`), not a temporary
  array, so it survives server restarts.
- All queries use `?` placeholders instead of pasting values directly
  into the SQL - this protects against SQL injection.
- Basic validation is done before saving - a task can't be created or
  updated without a `title`.
