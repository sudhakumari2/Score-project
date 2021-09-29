# Interview candidate selection
In this project first create two table candidate or test_score in the database and find heighest score and average .

# Reqiurement and Installation
In this project I installed some dependencies.
There are some basic commands :-
# Knex
- Knex is SQL query builder, mainly it is using Node.js application with built in model schema creation, table migration, connection pooling and seeding.
    ```
        npm install knex --save
    ````
# Expess
- Express is a minimal flexible interface to build our application .it provides us the tools that are required to build our app.
    ```
        npm install express --save
    ```
# MySQL 
- Mysql is most popular open-source relational database management system . It is fast , easy to use.
     ```
        sudo apt install mysql-server -y
        sudo mysql -u root -p 
        ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Sudha@1234';
        INFO- password should be strong. Exa:- Sudha@1234
    ```
# Nodemon
- nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

- nodemon does not require any additional changes to your code or method of development.
    ```
       npm install nodemon --save
    ```
# what is does:-
### candidate information-
In database candidate table will be create in that whole candidate information will be there.
### test_score information-
In database test_score table create in that whole round score is there .
from the test_score table it will give heightest  score and average of score.
# i have used
- Database
- knex
- Express
- router
- middleware
- port
- Export module
- crud operation
- Arrow function
- app.listen
- app.use
# how to run-
   - **index.js** - this is my connection file for running this project you can run this file.
   - **datbase.js** - this is my database file i created both table in this file and i stored user data.
   - **router.js** - this is my router file and in this i created so many routes with crud operation . so these route will define url path.