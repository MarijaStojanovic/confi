# Confi

Booking system for an upcoming conferences

### Prerequisites

[NodeJs](https://nodejs.org) `= 10.14.2`

[npmjs](https://www.npmjs.com/) `= 6.4.1`

[nodemon](https://nodemon.io/) `>= 1.11.0`

[git](https://git-scm.com/downloads) `>= 2.0.0`

[mongodb](https://www.mongodb.com) `>= 3.4.10`

### Installing

```shell
mkdir $HOME/Projects
cd $HOME/Projects
git clone git@github.com:MarijaStojanovic/confi.git
cd confi
npm install
```

### Built With
- Bcrypt - Hashing passwords
- body-parser - body parsing middleware
- express-jwt - validates JsonWebTokens
- express - web framework
- jsonwebtoken - authentication middleware
- mongoose - connection to the MongoDB database
___
#### Developer dependencies:
- chai - testing tool
- eslint - code styleguide
- eslint-config-airbnb-base
- eslint-plugin-import
- eslint-plugin-jasmine
- faker - easy generation of fake data
- mocha - testing tool
- supertest - testing tool

## Configuration

Set environment variable
```shell
JWT_SECRET
PORT
API_KEY
DOMAIN
```

To run a project in a `development` enviroment run

```shell
npm run start
```

## Running the tests

To run API releated tests run

```shell
npm run test
```

