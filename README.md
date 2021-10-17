# Mongo-NodeJS-CRUD
CRUD operations in MongoDB with backend NodeJS server.

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
