# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b829ef25-8bd4-48d3-a86b-889082c3cb55

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b829ef25-8bd4-48d3-a86b-889082c3cb55) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## API server

During development, run both the client and API server:

```sh
npm run dev
```

To start only the API server in development:

```sh
npm run dev:server
```

For production, build the server and start it:

```sh
npm run build:server
npm run start:server
```
