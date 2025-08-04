# API Documentation

## `/user/register` Endpoint

### Description:
This endpoint allows users to register by providing their `firstname`, `lastname`, `email`, and `password`.

### Request:
**Method**: `POST`

**URL**: `/user/register`

#### Required Data (Body):
```json
{
  "fullname": {
    "firstname": "string",   // First name (at least 3 characters)
    "lastname": "string"     // Last name (at least 3 characters)
  },
  "email": "string",          // Must be a valid email format
  "password": "string"        // Password (at least 6 characters)
}

{
  "message": "User registered successfully",
  "user": {
    "firstname": "string",
    "lastname": "string",
    "email": "string"
  },
  "token": "string"  // Authentication token
}
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname"
    },
    {
      "msg": "Last name must be at least 3 characters long",
      "param": "fullname.lastname"
    },
    {
      "msg": "Email must be at least 5 characters long",
      "param": "email"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password"
    }
  ]
}
////


