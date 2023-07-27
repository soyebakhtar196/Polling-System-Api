# Polling-System-Api
# Here hosted link: https://polling-system-api-gp50.onrender.com

Simple Polling API for raising the questions and its answer options using JavaScript, MongoDB, ExpressJS and NodeJS

## Table of Contents

- Generalinfo
- Technology
- Setup
- Functionality
- status

## Introduction

    This project serves as an Ultimate polling system tool for all audience,
    it serves storing the query and options related to it including its votes.
    The main incentive for this project is to master Node.js,
    a part of my online course in coding ninjas.

## Technology

    1. Postman
    2. JavaScript
    3. NodeJS
    4. ExpressJS
    5. MongoDB

## Setup

    The app has all the required files and libraries in it in the form of links.
    $ npm start to start app in terminal in visual studio code.
    We will use Postman, which is an API platform for building and using APIs.
    Every API route which we made, is tested in Postman.

## Functionality

    * Showing Question list.
    * Raising Question and adding options to it.
    * Deleting Question and Options.
    * Able to add vote to options.
    * Able to fetch specific question.

## Status

    This project is completely developed and has functionality, however
    some improvements can be made.

## API URL
    - /questions/create (To create a question)
    - /questions/:id/options/create (To add options to a specific question)
    - /questions/:id/delete (To delete a question)
    - /options/:id/delete (To delete an option)
    - /options/:id/add_vote (To increment the count of votes)
    - /questions/:id (To view a question and it’s options)
    
## Folder Structure
```
CSV_Upload/
|── config/
│          ├── mongoose.js
|
|── controllers/api/
|              |   |-index.js
|              |   |-option.js
|              |   |-question.js
│              |-home_controller.js
|
├── models/
│         ├─ options.js
|         |-question.js
|
|──routes/api/
|        |   |-index.js
|        |   |-options.js
|        |   |-questions.js
|        |-index.js
|
|──app.js
├── .gitignore
├── package.json
├── README.md
