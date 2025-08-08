# API Documentation

## `/user/register` Endpoint

### Description
Registers a new user in the system. Accepts user details, validates input, hashes the password, creates a user record, and returns an authentication token upon successful registration.

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
    "message": "Login Successfully",
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

```http
POST /user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

---

## `/user/profile` Endpoint

### Description
Retrieves the profile information of the currently authenticated user. Requires a valid JWT token in the `Authorization` header.

### Method & URL
- **GET** `/user/profile`

### Request Headers
- `Authorization`: `Bearer <JWT token>`

### Status Codes & Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "other_profile_fields": "..."
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized: No user found"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**  
  Error details as handled by the error middleware.

---

## `/user/logout` Endpoint

### Description
Logs out the current user by invalidating the JWT token. Clears the token cookie and blacklists the token to prevent reuse.

### Method & URL
- **POST** `/user/logout`

### Request Headers (Optional)
- `Authorization`: `Bearer <JWT token>` (If token is not in cookie)

### Cookies
- The endpoint also clears the `token` cookie.

### Status Codes & Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out"
  }
  ```

#### Bad Request
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "No token provided for logout."
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**  
  Error details as handled by the error middleware.

---

## `/captain/register` Endpoint

### Description
Registers a new captain with personal and vehicle details.

### Method & URL
- **POST** `/captain/register`

### Required Data (Body)
```json
{
  "fullname": {
    "firstname": "string", // Captain's first name
    "lastname": "string"   // Captain's last name
  },
  "password": "string",     // Account password
  "email": "string",        // Captain's email address
  "vehicle": {
    "color": "string",      // Vehicle color
    "plate": "string",      // Vehicle plate number
    "capacity": "number",   // Vehicle seating capacity
    "vehicleType": "string" // Type of vehicle (e.g., car, bike)
  }
}
```

### Status Codes & Responses

#### Success
- **Status Code:** `201 Created`
- **Body:** Captain registered successfully.

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:** Invalid input data.

#### Conflict
- **Status Code:** `409 Conflict`
- **Body:** Email or vehicle already registered.


## `/captain/login` Endpoint

### Description
Authenticates a captain using their email and password. Returns an authentication token and captain details on success.

### Method & URL
- **POST** `/captain/login`

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
    "message": "Login Successfully",
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


...existing code...
```markdown
## `/captain/profile` Endpoint

### Description
Retrieves the profile information of the currently authenticated captain. Requires a valid JWT token in the `Authorization` header.

### Method & URL
- **GET** `/captain/profile`

### Request Headers
- `Authorization`: `Bearer <JWT token>`

### Status Codes & Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized: No captain found"
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**  
  Error details as handled by the error middleware.

---

## `/captain/logout` Endpoint

### Description
Logs out the current captain by invalidating the JWT token. Clears the token cookie and blacklists the token to prevent reuse.

### Method & URL
- **POST** `/captain/logout`

### Request Headers (Optional)
- `Authorization`: `Bearer <JWT token>` (If token is not in cookie)

### Cookies
- The endpoint also clears the `token` cookie.

### Status Codes & Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out"
  }
  ```

#### Bad Request
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "No token provided for logout."
  }
  ```

#### Other Errors
- **Status Code:** `500 Internal Server Error`
- **Body:**  
  Error details as handled by the error middleware.
```

