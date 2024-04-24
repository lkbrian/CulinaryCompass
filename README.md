# Culinary Compass

After Cloning the Repository Follow the instructions below to get started with the app

## Installation

 ### 1. Frontend Installation:
  - To set up the frontend of the application, run the following command in the application's root directory


    ```bash
    make backend
    ```

### 2. Backend Installation:
 For the backend setup, follow these steps:
- Create a virtual environment.
- Activate the virtual environment.
- Run the backend installation command:

    ```bash
    make backend
    ```

### 3. **Performing Migrations & Seeding Database: 
 - To initialize and seed the database, execute:

    ```bash
    make database
    ```

### 4. Running the App: 
- Once the installations and database setup are complete, you have   multiple options for running the app:

- Run Both Backend and Frontend Concurrently:
- install this 
     ``` console 
        pip install honcho gunicorn
- then run
  
    ```bash
    make app
    ```

    - Run Frontend Only:

    ```bash
    make react
    ```

    - Run Backend Only:

    ```bash
    make flask
    ```

## Accessing the App

After completing the above steps, open your web browser and visit [localhost:4000](http://localhost:4000)
 to start using the Culinary Compass application.

Enjoy exploring the world of flavors and culinary experiences with Culinary Compass! 🍽️🌍
