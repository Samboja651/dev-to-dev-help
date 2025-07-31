# Xperience Debugging – Server

This is the Express.js backend for the Xperience Debugging platform.  
It provides RESTful APIs for ticket management, authentication, and image uploads.

---

## 🛠️ Technologies & Tools

- [Node.js 18](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [MongoDB & Mongoose](https://mongoosejs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Cloudinary](https://cloudinary.com/) (image uploads)
- [Multer](https://github.com/expressjs/multer) (file uploads)
- [JWT](https://jwt.io/) (authentication)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)
- [GitBook](https://www.gitbook.com/) for documentation

---

## ⚙️ Local Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Samboja651/dev-to-dev-help.git
   cd xperience-debugging/server
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file with:

     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     FIREBASE_SERVICE_ACCOUNT=your_firebase_service_account_json
     ```

   - For `FIREBASE_SERVICE_ACCOUNT`, use a JSON string or path to your Firebase service account. Download the file from your firebase account
   project.

4. **Start the server:**

   ```sh
   npm start
   ```

   The API will run at [http://localhost:5000](http://localhost:5000).

---

---

## 📝 API Reference

### Authentication

| Method | Endpoint           | Description                | Body/Params                |
|--------|--------------------|----------------------------|----------------------------|
| POST   | `/api/auth/register` | Register a new user        | `{ username, email, password }` |
| POST   | `/api/auth/login`    | Login with email/password  | `{ email, password }`      |
| POST   | `/api/auth/google`   | Login/Register with Google | `{ idToken }`              |

---

### Issues

| Method | Endpoint                       | Description                         | Body/Params                        |
|--------|--------------------------------|-------------------------------------|------------------------------------|
| POST   | `/api/tickets/submit`          | Create a new ticket                 | `{ title, description, tags, urgency, createdBy, imageUrl }` |
| GET    | `/api/tickets/open`            | Get all open tickets                |                                    |
| GET    | `/api/tickets/claimed`         | Get all claimed tickets             |                                    |
| GET    | `/api/tickets/resolved`        | Get all resolved tickets            |                                    |
| PATCH  | `/api/tickets/claim/:id`       | Claim a ticket                      | `{ claimedBy }`                    |
| PATCH  | `/api/tickets/unclaim/:id`     | Unclaim a ticket                    |                                    |
| PATCH  | `/api/tickets/solution/:id`    | Submit a solution document          | `{ solutionDoc }`                  |
| PATCH  | `/api/tickets/meet/:id`        | Submit a Google Meet link as solution | `{ meetLink }`                   |
| POST   | `/api/tickets/upload-image`    | Upload an image (multipart/form-data) | `image` file                     |

---

### Example: Create Ticket

```http
POST /api/tickets/submit
Content-Type: application/json

{
  "title": "React error on login",
  "description": "Getting 'undefined is not a function' when logging in.",
  "tags": ["react", "login"],
  "urgency": "high",
  "createdBy": "janedoe",
  "imageUrl": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/sample.jpg"
}
```

---

### Example: Upload Image

```http
POST /api/tickets/upload-image
Content-Type: multipart/form-data

image: <file>
```

**Response:**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "imageUrl": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/sample.jpg"
}
```

---

## 📚 Documentation

- Full API and usage documentation is available on [GitBook](https://dev-to-dev.gitbook.io/dev-to-dev-docs/server).
- All code and documentation are synced with GitHub.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. Alternatively you can fork the repo.

---

## 📄 License

MIT

---
