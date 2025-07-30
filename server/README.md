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

## 📚 Documentation

- Full API and usage documentation is available on [GitBook](https://your-gitbook-url.gitbook.io/xperience-debugging/).
- All code and documentation are synced with GitHub.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. Alternatively you can fork the repo.

---

## 📄 License

MIT

---
