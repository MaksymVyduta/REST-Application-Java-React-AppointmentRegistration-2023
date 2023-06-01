# Pablo-Med UI application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Overview
This is the frontend application for Pablo-Med system allowing to book doctor appointments and manage them by admins and doctors.

### Technology stack
- Type Script
- NodeJS
- React
- Redux
- Material UI

## Prerequisites 
1. Node JS installed
2. The source code checkout from a git repository

## Running locally

1. Install node dependencies (don't need to run it all the time when runs the project, need to be run during the first setup and all the time when package.json dependencies changed)\
   `npm install`

2. Run the app in local mode, using the local API endpoint. \
   `npm run start:local`

   


## Running unit tests (locally & during CI/CD pipeline).
`npm test`

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Running ESLint - static code analysis (locally & during CI/CD pipeline)
ESLint is an open source project that helps you find and fix problems with your JavaScript code.\
`npm run lint`

See more about [ESLint](https://eslint.org/)

## Building a distribution pack (used by CI/CD pipeline)

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
