# content-monkey
node version: 22.8

Java 21

# Frontend

Install dependencies <br>
`npm install` <br>

Start development server <br>
`npm run dev` <br>

To create a build <br>
`npm run build` <br>
Ensure this runs with no errors before making a pull request

# Backend

Set environment variables for Spring Boot to access database. <br><br>

Go to <a href="https://data.heroku.com/">Heroku<a/> and click on content-monkey. <br>
Go to the Settings tab, View Credentials. <br><br>

Set environment variables in your Shell profile where <br>
`CM_DB_URL=jdbc:postgresql://[host]/[database]`<br>
`CM_DB_USERNAME=[user]`<br>
`CM_DB_PASSWORD=[password]`<br><br>

Run `mvn clean install` in the backend folder <br>
Run `mvn spring-boot:start` to start the backend development server <br>

# Database

Download <a href="https://www.postgresql.org/download/">PostgreSQL<a />. <br>
Open pgAdmin <br><br>
Right click Servers > Register > Server...<br>
Name it then go to the Connection tab, past the Host, Username, and Password from <a href="https://data.heroku.com/">Heroku<a/>. <br>
Parameters tab - sslmode = require <br>
Advanced tab - Set DB restriction to the "Database" value from <a href="https://data.heroku.com/">Heroku<a/>. This filters database results because our database is one of many hosted on the AWS instance provided by Heroku.<br>
