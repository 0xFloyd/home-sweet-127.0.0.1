# 127.0.0.1 Sweet 127.0.0.1 [![Build Status](https://travis-ci.com/MrRyanFloyd/home-sweet-127.0.0.1.svg?branch=master)](https://travis-ci.com/MrRyanFloyd/home-sweet-127.0.0.1)

127.0.0.1 Sweet 127.0.0.1 _(a play on 127.0.0.1, localhost)_ is a tastefully simple app for getting the domain or IP address of any website you can imagine, using ipinfo.io and googlemaps api's. 

![alt text](/client/src/assets/home-sweet-home-desktop.png)

## Motivation

I've always thought tools like speedtest.net that return your specific network information and location to be super cool, so I wanted to figure out how they actually work!

## Features

- RESTish API (not fully RESTful, only serves GET, POST requests) GET request to the /api endpoint returns a JSON response for your own IP, and a POST request to the /api endpoint, which must include the domain/ IP as the variable "body" in the JSON form body, returns a JSON response for the requested domain.
- Returns and maps the domain/ IP location information on Google Maps along with additional meta-data related to the IP
- GET endpoint: https://home-sweet-home-ip.herokuapp.com/api
- POST endpoint: https://home-sweet-home-ip.herokuapp.com/api with {"body" : "domain"} as request.body

## Technology

> <img src="/client/src/assets/js.svg" width="40px"> <img src="/client/src/assets/react.svg" width="40px"> <img src="/client/src/assets/react-bootstrap.png" width="40px"> <img src="/client/src/assets/node.svg" width="40px"> <img src="/client/src/assets/express.svg" width="40px"> <img src="/client/src/assets/heroku.svg" width="40px"> <img src="/client/src/assets/git.svg" width="40px"> <img src="/client/src/assets/travis-ci.svg" width="40px"> <img src="/client/src/assets/maps.png" width="40px">

- React and JavaScript on the frontend
- Styled with React-Bootstrap
- NodeJS for runtime environment
- Express for the server
- Axios for promise-based requests to external APIs
- IPInfo.io and GoogleMaps APIs for data
- Hosted with Heroku
- Git and Github for version control
- Travis for continuous integration

## Usage

Clone the repository and create a .env file in the project root and add in your api keys from IPinfo.io and GoogleMapsAPI

```text
REACT_APP_MAPS_API_KEY="YOUR_API_KEY"
ipinfoToken="YOUR_API_KEY"
```

To deploy locally and run server and client with concurrently:

```javascript
npm run dev
```

## License

The project is licensed under the MIT License.
