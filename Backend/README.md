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

## `/users/profile` Endpoint

### Description
This endpoint retrieves the profile information of the authenticated user.

### Method
`GET`

### Authentication
Requires valid JWT token in:
- Authorization header: `Bearer <token>` or
- Cookie: `token=<token>`

### Example Response

- **Success (200)**

- `user` (object):
  - `fullname` (object): An object containing the user's full name.
    - `firstname` (string): The first name of the user.
    - `lastname` (string): The last name of the user.
  - `email` (string): The email of the user.


## `/users/logout` Endpoint

### Description
This endpoint logs out the current user by invalidating their token provided in cookie or headers.

### Method
`GET`

### Authentication
Requires valid JWT token in:
- Authorization header: Bearer <token> or
- Cookie: `token=<token>`

### Example Response

- **Success (200)**
  - `message` (string): "User successfully logged out."
- **Unauthorized (401)**
  - `error` (string): "Unauthorized"

## Captain Routes

### `/captains/register` Endpoint

### Description
Register a new captain with vehicle details.

### Method
`POST`

### Request Body
- `fullname` (object): Captain's full name
  - `firstname` (string, required): Minimum 3 characters
  - `lastname` (string, optional)
- `email` (string, required): Valid email address
- `password` (string, required): Minimum 6 characters
- `vehical` (object): Vehicle details
  - `color` (string, required): Minimum 3 characters
  - `plate` (string, required): Minimum 3 characters
  - `capacity` (number, required): Minimum value 1
  - `vehicalType` (string, required): Must be one of: 'car', 'motorcycle', 'auto'

### Example Responses

#### Success Response
**Status Code**: `201 Created`

- `captain` (object):
  - `fullname` (object): An object containing the captain's full name.
    - `firstname` (string): The first name of the captain.
    - `lastname` (string): The last name of the captain.
  - `email` (string): The email of the captain.
  - `password` (string):The captain's Password.
  - `vehical` (object): Vehicle details
    - `color` (string): Vehical's color.
    - `plate` (string): Vehical's plate.
    - `capacity` (number): Vehical's capacity.
    - `vehicalType` (string): Vehical's type.
  - `token` (string): JWT token
