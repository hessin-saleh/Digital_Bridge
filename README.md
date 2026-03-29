# 📚 Digital Bridge API Documentation

**Base URL:** http://localhost:4000

---

## 🟢 1. Guest API (Temporary Messages)
*Public routes. No authentication required.*

### 1.1 Create a Temporary Message
* Endpoint: POST /guest/create
* Description: Creates a self-destructing message with a specific expiration time.
* Request Body (JSON):

    {
      "content": "This is a highly confidential configuration key. Do not share.",
      "expiresInMinutes": 15
    }

* Success Response (201 Created):

    {
      "msg": "Created MSG",
      "data": {
        "content": "This is a highly confidential configuration key. Do not share.",
        "code": "A8xR2",
        "expiresAt": "2024-05-20T10:15:00.000Z",
        "_id": "655b3a..."
      }
    }

### 1.2 Get Message by Code
* Endpoint: GET /guest/:code
* Description: Retrieves the temporary message using the 5-character code.
* Example URL: http://localhost:4000/guest/A8xR2
* Success Response (200 OK):

    {
      "msg": "Message Found",
      "data": {
        "content": "This is a highly confidential configuration key. Do not share.",
        "code": "A8xR2"
      }
    }

---

## 🔵 2. Auth API (Professional Accounts)
*Public routes for user registration and authentication.*

### 2.1 User Signup
* Endpoint: POST /auth/Signup
* Description: Registers a new user and returns an access token.
* Request Body (JSON):

    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "StrongPassword123!"
    }

* Success Response (201 Created):

    {
      "msg": "successful create user",
      "Data": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "user",
        "_id": "655c1b..."
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }

### 2.2 User Login
* Endpoint: POST /auth/Login
* Description: Authenticates a user and returns an access token.
* Request Body (JSON):

    {
      "email": "john.doe@example.com",
      "password": "StrongPassword123!"
    }

* Success Response (200 OK):

    {
      "msg": "scssfyl login",
      "Data": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "role": "user",
        "_id": "655c1b..."
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }

---

## 🔐 3. Vault API (Secure Storage)
**⚠️ IMPORTANT:** All routes in this section are protected. 
You must include the JWT token in the request Headers:
* Key: Authorization
* Value: Bearer <your_token_here>

### 3.1 Create a Vault Item
* Endpoint: POST /vault/
* Request Body (JSON):

    {
      "content": "const DB_URI = 'mongodb+srv://admin:secret@cluster.mongodb.net'; // Keep safe",
      "tags": "dev"
    }

* Success Response (201 Created):

    {
      "msg": "scssful created vault",
      "Data": {
        "content": "const DB_URI = 'mongodb+srv://admin:secret@cluster.mongodb.net'; // Keep safe",
        "tags": "dev",
        "userId": "655c1b...",
        "_id": "777d2c..."
      }
    }

### 3.2 Get All Vault Items (For Current User)
* Endpoint: GET /vault/
* Request Body: None
* Success Response (200 OK):

    {
      "msg": "scssful get all vault",
      "Data": [
        {
          "_id": "777d2c...",
          "content": "const DB_URI = 'mongodb+srv://admin:secret@cluster.mongodb.net'; // Keep safe",
          "tags": "dev"
        },
        {
          "_id": "888e3d...",
          "content": "React.js custom hooks architecture notes.",
          "tags": "learn"
        }
      ]
    }

### 3.3 Get a Specific Vault Item
* Endpoint: GET /vault/:itemId
* Example URL: http://localhost:4000/vault/777d2c...
* Success Response (200 OK):

    {
      "msg": "scssful get vault",
      "Data": {
        "_id": "777d2c...",
        "content": "const DB_URI = 'mongodb+srv://admin:secret@cluster.mongodb.net'; // Keep safe",
        "tags": "dev"
      }
    }

### 3.4 Update a Vault Item
* Endpoint: PUT /vault/:itemId
* Request Body (JSON):

    {
      "content": "const DB_URI = 'mongodb+srv://admin:UPDATED_PASS@cluster.mongodb.net';",
      "tags": "general"
    }

* Success Response (200 OK):

    {
      "msg": "scssful update",
      "Data": {
        "_id": "777d2c...",
        "content": "const DB_URI = 'mongodb+srv://admin:UPDATED_PASS@cluster.mongodb.net';",
        "tags": "general",
        "userId": "655c1b..."
      }
    }

### 3.5 Delete a Vault Item
* Endpoint: DELETE /vault/:itemId
* Request Body: None
* Success Response (200 OK):

    {
      "msg": "successful delete",
      "Data": {
        "_id": "777d2c...",
        "content": "const DB_URI = 'mongodb+srv://admin:UPDATED_PASS@cluster.mongodb.net';",
        "tags": "general"
      }
    }
