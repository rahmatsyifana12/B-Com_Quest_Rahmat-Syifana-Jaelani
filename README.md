# About the Website

This website is a company profile website owned by a company called "Cendrawasih" which runs in the travel agent business. People can visit this website to get to know the Cendrawasih company and see articles about the world of traveling in Indonesia.

# About the Project

### Tech Stack

* PostgreSQL
* Express
* NodeJS

### Installation

First thing first, you need to clone/donwload this repository into your computer. You can clone by executing the following command in your selected folder's path:
```
git clone https://github.com/rahmatsyifana12/B-Com_Quest_Rahmat-Syifana-Jaelani.git
```

Or you can just donwload ZIP this repository.

There are several modules required to run this program, but you can directly install all the modules by executing the following command in the project's path:
```
npm install
```

After that, you need to install PostgrSQL. You can visit the following website to download the PostgrSQL installer based on your OS:
https://www.postgresql.org/download/

After the PostgreSQL installation complete, create a database with the name "cendrawasih" without quotes in your PostgreSQL database (I recommend to use pg Admin).

After that, open the project then open ```.env``` file. Change the following data based on your PostgreSQL setting:
* DB_USER
* DB_HOST
* DB_PORT
* DB_DATABASE
* DB_PASSWORD

Or just change the following data if you set your PostgreSQL by default:
* DB_DATABASE (don't change this if your database name for this project is "cendrawasih" without quotes)
* DB_PASSWORD 

And now you can use this program, enjoy!

### Features
There are several features that we can do depending on the role we have. There are 3 roles in this program:
* Guest (when you are not logged in)
* Member
* Admin

#### Guest
* View articles
* View article comments

#### Member
* View articles
* View article comments
* Add comments to an article

#### Admin
* View articles
* View article comments
* Add new article
* Update article
* Delete article
* Add comments to an article
* Delete article's comments

### Entity Relationship Diagram
This is the database design that's applied for this project.

![erd_company_profile](https://user-images.githubusercontent.com/70148910/159276662-7adcfe38-d0d7-48bf-abf7-8202ce752047.jpg)
