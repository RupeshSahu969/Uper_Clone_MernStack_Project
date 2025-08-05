# API Documentation

## `/user/register` Endpoint

### Description
Registers a new user in the system. This endpoint accepts user details, validates the input, hashes the password, creates a user record, and returns an authentication token upon successful registration.

### Method & URL
- **POST** `/user/register`

### Required Data (Body)
```json
{
  "fullname": {
    "firstname": "string (min 3 chars, required)",
    "lastname": "string (min 3 chars, optional)"
  },
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Status Codes & Responses

#### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "firstname": "string",
      "lastname": "string",
      "email": "string"
    },
    "token": "JWT token string"
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field",
        "location": "body"
      }
    ]
  }
  ```

#### Duplicate Email
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Email is already in use, please try another one."
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**  
  Error details as handled by the error middleware.

---

## `/user/login` Endpoint

### Description
Authenticates a user using their email and password. Returns an authentication token and user details on success.

### Method & URL
- **POST** `/user/login`

### Required Data (Body)
```json
{
  "email": "string (valid email, required)",
  "password": "string (min 6 chars, required)"
}
```

### Status Codes & Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Login Succesfully",
    "token": "JWT token string",
    "user": {
      "fullname": {
        "firstname": "string",
        "lastname": "string"
      },
      "email": "string"
    }
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password"
      }
    ]
  }
  ```

#### Invalid Credentials
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email and password"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**  
  Error details as handled by the error middleware.

---

### Example Login Request

<!-- ```http -->
POST /user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securePassword123"

}