# CSGO Utility Application

## Project Description
This project is to assist using csgo's utility by creating a library that can be used privately by teams.

## Technologies
This is a ReactJS Single Page Application that uses the following framework and libraries:
- [ReactJS](https://reactjs.org/)
- [Redux](https://react-redux.js.org/)
- [Material UI](https://material-ui.com/)
- [Fontawesome](https://fontawesome.com/)
- [Lodash](https://lodash.com/)
- [Recaptcha](https://www.google.com/recaptcha/about/)
- [MomentJS](https://momentjs.com/)
- [axios](https://www.axios.com/)
- [nginx](https://www.nginx.com/)
- [react-konva konva](https://www.npmjs.com/package/react-konva)
- [react-image-gallery](https://www.npmjs.com/package/react-image-gallery)

## NPM Packages
The application uses the following npm packages:

### ReactJS:
- react
- react-dom
- react-router-dom
- react-cookie

### Redux:
- react-redux
- redux-thunk

### UI Frameworks:
Material UI:
- @material-ui/core"
- @material-ui/icons
- @material-ui/lab

### Fontawesome:
- react-fontawesome
- fontawesome-svg-core
- free-brands-svg-icons
- free-regular-svg-icons
- free-solid-svg-icons

### Utilities:
- react-google-recaptcha
- lodash
- moment
- axios
- react-html-parser

## Requirements
This project is meant to be paired with the personal website backend in order to load apis. However, the website can still be run.

The application has been developed with NodeJS version 14.17.1 LTS

It has been developed targeted towards Chrome Browsers desktops.

## How to Run the project
1. Clone the project to your local directory:

2. install all npm packages
``` 
    $ npm install
```
3.  Run the project to localhost:3006/csgo-app
``` 
    $ npm run start
```

## to build static files
1. Build reactjs 
``` 
    $ INLINE_RUNTIME_CHUNK=false npm run build
```
2. The built app will be at /build