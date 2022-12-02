# Perspektiv
For social media users who want a more creative, collaborative, and/or open contribution-based social media platform. 

Perspektiv is a social media web application that allows multiple users to share their own perspectives on a trip, event, or anything shared among users in a single post. 

Unlike Instagram, Twitter, and Facebook, our product enables users to work with friends, acquaintances, and other collaborators to create a unified social media post, as opposed to dividing a group experience into individual posts.

# CI-CD Badges:
[![Build and deploy -backend- Node.js app to Azure Web App - Perspektiv](https://github.com/anonymous-pterodactyl/Perspektiv/actions/workflows/ci-cd_perspektiv.yml/badge.svg)](https://github.com/anonymous-pterodactyl/Perspektiv/actions/workflows/ci-cd_perspektiv.yml)

[![Build frontend - Perspektiv](https://github.com/anonymous-pterodactyl/Perspektiv/actions/workflows/ci-cd_frontend.yml/badge.svg)](https://github.com/anonymous-pterodactyl/Perspektiv/actions/workflows/ci-cd_frontend.yml)

[![Build and deploy backend to Azure Web App - Perspektiv](https://github.com/anonymous-pterodactyl/Perspektiv/actions/workflows/ci-cd_backend.yml/badge.svg)](https://github.com/anonymous-pterodactyl/Perspektiv/actions/workflows/ci-cd_backend.yml)

# To set up on your machine:
1. Clone the project
   - Navigate to a directory where you want to clone the project
   - Paste `git clone https://github.com/anonymous-pterodactyl/Perspektiv.git` in the command line
3. Run `npm install --legeacy-peer-deps` on the command line in root, frontend and backend
4. Add .env file to the backend directory which is only granted to people with permission

# To run:
1. Navigate to backend directory `npm run dev` to start the backend
2. Navigate to frontend driectory `npm start` to start the frontend which will open the application in browser

# UI Prototype (Figma):
Last Updated October 29, 2022

https://www.figma.com/file/y4sYKrMqJDqsF7V8trsUqr/Storyboard?node-id=2%3A4&t=pW6ZKOGMVraMOftd-1

# Code Style:
Uses Prettier - ESLint

Linting is currently disabled due to impeding development

Ideal Properties:
   - Indent: Tab
   - Linebreak: 0
   - Quotes: double
   - Semicolon: always

# User Stories:
*  As a user, I want to be able post all types of media, like photos and videos, so that I can fully share my experiences with my friends.
*  As a user, I want to control who can participate in posts I start because I don’t want people from outside my friend group messing them up.
*  As a user, I want to be able to organize and format my posts to make them look how I want.
*  As a new user, I want to be able to create an account without the huge hassle of putting in too much personal information. The information I would prefer to specify is my name, username, and password.
*  As a regular user, I want to be able to log in to an account associated with the platform to be able to save my data and connections.
*  As a backend engineer, I want to be able to get the sign-up information from a new user and store it in an existing user database.
*  As a regular user, I want to be able to connect with my friends and to people who have similar interests as me. I would like to collaborate on posts with these people and also see the posts that the collective has posted with others as well.
*  As a frontend engineer, I want to personalize users’ feeds with posts from their hodgepodge list. This will require me to push new activity from users and formulated connections to their feed updating it every time a user refreshes their feed.
*  As a backend engineer, I need to mitigate excessive calls to databases from refreshing feeds so that the application does not run slow and/or crash.
*  As a user, I want to search for specific hodgepodges or individuals to connect with or view posts manually.
*  As a user, I want a simple profile page that is aesthetically pleasing but easilty navigable.
*  As a frontend engineer, we will mimic current social profile layouts until later versions/sprints.
*  As a user, I want to have a responsive user interface to react with what I’m currently doing.
*  As a user, I want to sort, filter and find the posts that have the similar topic using the tag for an easy search.
*  As a user, I want to protect myself against hackers stealing my information.
*  As a user, I want to be able to interact with my friends with ease.
*  As a user, I want to enjoy my time interacting with the app and have the desire to log back on.
*  As a user, I want to be able to edit my personal information at all times and change my password without issues.

