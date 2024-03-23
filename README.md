## Courses Assignment

### Client (Frontend)
  - To run the FE part run the command - `npm run dev`
  - It includes the homepage - course cards and search by author(s)
  - To send multiple author(s) in the search enter multiple values seperated by comma

### Server (Backend)
Setup (.env file)
 - PORT -> 5000
 - Clodinary Credentials for uploading images - 
        - Create account on -> https://cloudinary.com/
        - On the Dashboard copy the Cloud name , API key and API secret key in the env file
    - Postgresql -
        (With Docker) - Run the command -> 
        - docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
        - Connection String for connecting to the DB  ->
         postgresql://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable

        (Without Docker) - Neon Tech
        - Login to https://neon.tech/
        - Create account and get the connection string from the dashboard and copy to env file
            e.g of connection string- postgresql://username:password@ep-broken-frost-69135494.us-east-2.aws.neon.tech/calm-gobbler-41_db_2253874

   - To run backend run the command - `npm start`
   
## API (POSTMAN)
### Add Data - 
 URL - http://localhost:5000/course (POST Request)
    Add the data in the Body -> form-data (as we have image)
### Update Data 
 URL - http://localhost:5000/course/id (PATCH Request)
 Add the data in the Body -> form-data (as we have image)
