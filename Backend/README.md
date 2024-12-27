# API Documentation

## `/users/register` Endpoint

### Description
This endpoint is used to register a new user.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `fullname` (object): An object containing the user's full name.
  - `firstname` (string, required): The first name of the user. It must be at least 3 characters long.
  - `lastname` (string, optional): The last name of the user. It must be at least 3 characters long.
- `email` (string, required): The email of the user. It must be a valid email address.
- `password` (string, required): The password of the user. It must be at least 6 characters long.

### Example Response

- `user` (object):
  - `fullname` (object): An object containing the user's full name.
    - `firstname` (string): The first name of the user.
    - `lastname` (string): The last name of the user.
  - `email` (string): The email of the user.
- `token` (string): JWT token

## `/users/login` Endpoint

### Description
This endpoint is used to log in an existing user.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:

- `email` (string, required): The email of the user. It must be a valid email address.
- `password` (string, required): The password of the user. It must be at least 6 characters long.

### Example Response

- `user` (object):
  - `fullname` (object): An object containing the user's full name.
    - `firstname` (string): The first name of the user.
    - `lastname` (string): The last name of the user.
  - `email` (string): The email of the user.
- `token` (string): JWT token
