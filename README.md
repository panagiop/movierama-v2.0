This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to run it (using Docker - Preferable way)

-   Make sure you have [docker] and docker-compose installed.
-   At the root folder create a `.env.prod` file containing the following:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=6b87d831cf000cc9755b9869cabe514d8bfc0e241e5f2ec4dc83a5e0d004bbeb
POSTGRES_USER=test134
POSTGRES_PASSWORD=hajksdg7ASFAT
POSTGRES_DB=post-votes-db-2
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public&connect_timeout=500"
```

-   Run the following command:

```sh
docker-compose up -d
```

-   <b>Note</b>: Wait for a few seconds (almost a minute on my machine) in order for the containers to be up and running
-   Navigate to `http://localhost:3000/` to view the application.

## How to run it (locally)

-   Make sure you have [postgreSQL] installed.
-   At the root folder create a `.env` file containing the following:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=6b87d831cf000cc9755b9869cabe514d8bfc0e241e5f2ec4dc83a5e0d004bbeb
POSTGRES_USER=test134
POSTGRES_PASSWORD=hajksdg7ASFAT
POSTGRES_DB=post-votes-db-2
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}?schema=public&connect_timeout=500"
```

-   At the root folder run `npm i`
-   Create a DB with the above credentials (POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD)
-   Run `npx  prisma  db  push` to create the schema in DB according to <i>schema.prisma</i> file
-   Finally run the server with `npm run dev`

## API documentation

https://documenter.getpostman.com/view/1551953/2s9Y5cufro

## How to use it

-   Create a user by clicking on Sign up button
-   Add a couple of movies by clicking the '+ New movie' button (this button is visible when a user is logged in)
-   Logout and create a second user
-   Now you can vote a movie created by the first user
-   And so on...

[docker]: https://www.docker.com/
[postgreSQL]: https://www.postgresql.org/download/
