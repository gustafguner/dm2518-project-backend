# PSST backend

This is the backend for the [app](https://github.com/gustafguner/dm2518-project-app.git). This is part of our project in the course DM2518 at KTH.

## Install

### Prerequisites

Node v11.8.0
[Yarn](https://yarnpkg.com/lang/en/)
[MongoDB](https://www.mongodb.com/download-center)

### Clone and install dependencies

```bash
$ git clone https://github.com/gustafguner/dm2518-project-backend.git
$ cd dm2518-project-backend
$ yarn install
```

### Starting the backend

Make sure that yarn has installed the dependencies.
Create a file named `.env` in project root. This file needs the following variables:

```
PORT=4000
MONGODB_URL="xxxxx"
MONGODB_USERNAME="xxxxx"
MONGODB_PASSWORD="xxxxx"
JWT_SECRET="xxxxx"
```

This backend requires access to a MongoDB instance.

Start the server with `yarn watch` for development purposes, or just start it with yarn start`

### yarn commands

- start - `Start application`
- watch - `Start the application for development, automatic restart on file changes`
