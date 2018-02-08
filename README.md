# todo-api-nosql

This is a basic RESTful API that support CRUD operation over todo items. It has authentication endpoints in order to make private enpoints related to todo items.

The goal of this repository is only to train myself with the technologies used.

## Running Locally

In order to run this project locally you need mongodb and node installed (MongoDb should run in PORT : 27017)

To run follow this steps:
* npm install
* npm start

## Deploy in Heroku

* Create .env file under the root path and add two environment variables:

DB_HOST = db_host_name
SECRET_TOKEN = secret_token

* Follow heroku steps to deploy




