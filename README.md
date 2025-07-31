# Xperience Debugging

Welcome to **Xperience Debugging** – a collaborative platform where developers can post issues, upload screenshots, and collaborate live to solve bugs, faster.

🌐 <https://dev-to-dev-frontend.onrender.com/>

🌐 [Full Documentation](https://dev-to-dev.gitbook.io/dev-to-dev-docs/)

---

## 🚀 Features

- Modern, animated React UI
- User authentication (email/password & Google)
- Post, claim, and resolve debugging issues
- Image upload (Cloudinary)
- Real-time collaboration
- Responsive design for desktop and mobile
- "Buy me Coffee" PayPal support
- RESTful API backend (Express.js)
- Secure authentication (JWT, Firebase)
- Full documentation on GitBook

---

## 🛠️ Technologies & Tools

**Client:**

- [React 19](https://react.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Animate.css](https://animate.style/)
- [Firebase Auth](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/) (image uploads)
- [Axios](https://axios-http.com/)
- [React Router v7](https://reactrouter.com/)

**Server:**

- [Node.js 18](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [MongoDB & Mongoose](https://mongoosejs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Cloudinary](https://cloudinary.com/)
- [Multer](https://github.com/expressjs/multer)
- [JWT](https://jwt.io/)
- [CORS](https://expressjs.com/en/resources/middleware/cors.html)

**Documentation:**

- [GitBook](https://www.gitbook.com/)
- [Mermaid](https://mermaidchart.cello.so/U8XjwGbZV9M)

---

## ⚙️ Local Setup

### 1. Clone the repository

```sh
git clone https://github.com/Samboja651/dev-to-dev-help.git
cd xperience-debugging
```

### 2. Setup the Server

```sh
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FIREBASE_SERVICE_ACCOUNT=your_firebase_service_account_json
```

> For `FIREBASE_SERVICE_ACCOUNT`, use a JSON string or path to your Firebase service account. Download the file from your Firebase project.

Start the server:

```sh
npm start
```

The API will run at [http://localhost:5000](http://localhost:5000).

---

### 3. Setup the Client

```sh
cd ../client
npm install
```

Create a `.env` file in the `client` folder:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_FIREBASE_API_KEY=your_firebase_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_PAYPAL_PAYMENT_LINK=""
```

Start the client:

```sh
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## 🌐 Accessing the App

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **Production:** Deploy both client and server to your preferred platforms (e.g., Vercel/Netlify for client, Render/Heroku for server).

---

## Message from the Dev

I love exploring, the mission here was to gain experience in using new tools
e.g
experince using

- nosql databases -> **Mongodb**.
- Storing and retrieving media files on -> **cloudinary**. Typically
someone would have used the db. But separating media and other user data
saves on the db work.
- Containerizing applications using **docker**
- Deploying containers on **google cloud**. After one day my expense was $3
and I hastly droped the deployment. Containerizing and deploying on **gcloud** was efficient because my app run without downtime but the cost
was high.
- Deployment on **render.com** freemium service.
- Authenticating user with their google accounts using **firebase**.
- Managing sessions using **Json Web Tokens**.
- Publishing this documentation on **Gitbook**.
- Designing **ERD & flowcharts** using **Mermaid**.
- **Google Analytics** on site visits.
- Expressing my creativity without limitation of tech skills -> **Vibe Coding**. I used **Copilot and GPT 4.1**. I was able to quickly transform
my thoughts.

---

## 📚 Documentation

- Full documentation is available on [GitBook](https://dev-to-dev.gitbook.io/dev-to-dev-docs/).
- All code and documentation are synced with GitHub.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. Alternatively, you can fork the repo.

---

## 📄 License

MIT

---
