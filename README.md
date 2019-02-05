# RESTful API for Products and Orders

Following tutorial Academind

## Instructions

### Installation
Clone repo and install npm packages:

`git clone git@github.com:LondonJim/Shop-API.git`

`npm install`

Currently it is set up using `Mongo Atlas` cloud database, you will need to signup and create or connect your own database.

I created a file `nodemon.json` in the root directory that contains my environment variables that are used with Mongo Atlas. The JWT_KEY can be any string you want.

eg.
```
{
  "env": {
    "MONGO_ATLAS_USER": "XXXXXXXXXXXX",
    "MONGO_ATLAS_PW": "XXXXXXXXXXX",
    "JWT_KEY": "XXXXXXXXXXX"
  }
}
```
----

## API

### Products

----
List all products

`GET` `/products`

----

Create new product (must use JWT in header authorization)

`POST` `/products`

Example body form-data sent:
```
|              KEY              |      VALUE      |
|:-----------------------------:|:---------------:|
| name                   (text) | name of product |
| price                  (text) | 9.99            |
| productImage           (file) | file.jpg        |
```
note: only .jpg and .png image files are accepted up to a maximum of 1mb

----
Get individual product information

`GET` `/products/:id`

----

Update individual product information (must use JWT in header authorization)

`PATCH` `/products/:id`

Example body:
```
[
  {
    "propName": "name", "value": "new product name",
    "propName": "price", "value": 12.99
  }
]
```
Note: properties can be entered individually above

----

### Orders
----

List all Orders

`GET` `/orders`

----

Create new order (must use JWT in header authorization)

`POST` `/orders`

Example body:
```
{
  "productId": "product id here",
  "quantity": 3
}
```

----

Get individual order information

`GET` `/orders/:id`

----

Delete an order (must use JWT in header authorization)

`DELETE` `/orders/:id`

----

### Users
----
Sign up a new user

`POST` `/users/signup`

example body:
```
{
    "email": "user@example.com",
    "password": "test"
}
```
note: passwords are stored encrypted using bcrypt

----

Log in a user

`POST` `/users/login`

example body:
```
{
    "email": "user@example.com",
    "password": "test"
}
```
note: returns a JWT that can be used for an hour

----

Delete a user

`Delete` `/users/:id`

----
