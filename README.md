# Mongo-NodeJS-CRUD
CRUD operations in MongoDB with NodeJS based backend server.

## Steps to run it in your localhost

* Create .env file (in the same directory where all the above files are existing) by running setup_env.sh file using below command (make sure you are in the folder where all the above files are present)
```
sh setup_env.sh
```

This will generate different keys as shown below and fill the suitable values there:
```
BACKEND_SERVER_PORT=5000
MONGODB_URL="MongoDB's database connection string"
```

* Run below command to install all the dependencies to run the server:
```
npm install --save
```

* Run below command to run the server
```
npm run dev
```

The server must be up and running now!

Considering you have set port number in .env file to ```5000```, then navigate to below url to see documentation of all of the APIs and test them.
> [http://localhost:5000/docs/](http://localhost:5000/docs/)

## Explanation

There will be 3 different main categories of APIs
- User's operations APIs
- Project's operations APIs
- Model's operations APIs

> Start by creating user and then doing CRUD operations on it.
> Then create projects inside User.
> Then create different models and add synthetic data csv and real data csvs.

![image](https://user-images.githubusercontent.com/50065408/137629055-b083a786-9142-4b2c-a07a-b84efd9df0c6.png)

## Testing APIs

In the swagger UI documentation, I have put there the request schemas for each of the API endpoints and also added [responses.txt](https://github.com/JeetKaria06/Mongo-NodeJS-CRUD/blob/main/responses.txt) file which has the responses that each of the API endpoints gives.

