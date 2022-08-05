# REST API Coding Practice 1: 
## Microservices architecture, Overall Login
I began this project to learn how best to develop a decoupled application in JavaScript, I plan on having three distinct applications that can all be run from the front end, controlled by a login page that will issue permissions to access individual applications. This project was also meant to help me reinforce the workflows that I developed during my Code Nation Course while working as part of a team.

The repository you are currently looking at is going to handle the initial logging into the site, and handing out the permissions to access the distinct applications.

### Installation
After cloning the repository, run `npm install` to install the following dependancies:
```
    ExpressJS
    Mongoose
    JsonWebToken
    DotEnv
    CORS
    BcryptJS
    NodeMon
```
Then create a `.env` file, copying the information from `.env.template` and filling out the variables there.

```
    DEBUG = [true/false]
    PORT = [Numerical value the application will use]
    MONGO_INFRA_URI = [Database connection string]
    SECRET = [String that will be used to create JSON Web Tokens]
    SALT = [Numerical value that will be used to encrypt the password]
```


