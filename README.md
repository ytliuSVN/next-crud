<p align="center">
  <img src="./public/assets/review.svg" alt="Challenge" width="100" />
</p>

# NextJS Fullstack App

A Fullstack web application that allows employees to submit feedback. Integration with TypeScript, SQLite, Next.js, and Prisma.

## User Stories

- [ ] The user needs to authenticate with GitHub to create a new feedback.
- [ ] The application composes of the `Reviews` and `Drafts` area.
- [ ] When the user sent feedback, they can have a draft and decide to publish it later on.
- [ ] The user can delete their posts from both `Reviews` and `Drafts` area.

## Challenge Scope
* Dynamic API Routes
  * Implement 3 API endpoints including [`create`](./pages/api/post/index.ts), [`publish`](./pages/api/publish/[pid].tsx), and [`delete`](./pages/api/post/[pid].ts).
* Web app
  * Align React App with [Chakra UI](https://chakra-ui.com/)
  * Server-side Rendering with [Next.js](https://nextjs.org/docs/basic-features/typescript)
  * Integrate [Prisma](https://www.prisma.io/) to store our users and their sessions in SQLite database
  * Concern the authentication with [NextAuth.js](https://next-auth.js.org/v3/getting-started/introduction)
* E2E Testing
  * End to End tests with [Cypress](https://www.cypress.io/) testing framework
## App Details

### Instructions

0. Clone the project repository: `git clone git@github.com:ytliuSVN/next-crud.git`
1. Navigate to the project folder: `cd next-crud`
2. Install all the dependencies of project: `yarn install`
3. Start the app in the development mode: `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Loading Environment Variables

Copy and setup environment. An example `.env`:

```
SECRET=RANDOM_STRING

GITHUB_ID=
GITHUB_SECRET=
```

### Run the test

There are two ways you can run the test:

Opens the Cypress Test Runner in the browser.
```
yarn cypress:open
```

Runs Cypress tests to completion.

```
yarn cypress:run
```