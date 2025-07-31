# Client

Welcome to the **Xperience Debugging - UI**
This is the React-based client for the Xperience Debugging platform, where developers can post issues, upload screenshots, and collaborate live to solve bugs.

---

## 🚀 Features

- Modern React UI with Bootstrap 5 and Bootstrap Icons
- Animated, interactive landing page
- User authentication (email/password & Google)
- Post, claim, and resolve debugging tickets
- Image upload (Cloudinary)
- Responsive design for desktop and mobile
- "Buy me Coffee" PayPal support

---

## 🛠️ Technologies & Tools

- [React 19](https://react.dev/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Animate.css](https://animate.style/)
- [Firebase Auth](https://firebase.google.com/)
- [Cloudinary](https://cloudinary.com/) (for image uploads)
- [Axios](https://axios-http.com/)
- [React Router v7](https://reactrouter.com/)
- [GitBook](https://www.gitbook.com/) for documentation

---

## ⚙️ Local Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Samboja651/dev-to-dev-help.git
   cd xperience-debugging/client
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` (if provided) or create `.env`:

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

4. **Start the development server:**

   ```sh
   npm start
   ```

   The app will run at [http://localhost:3000](http://localhost:3000).

---

## 📚 Documentation

- Full documentation is available on [GitBook](https://dev-to-dev.gitbook.io/dev-to-dev-docs/client).
- All code and documentation are synced with GitHub.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. Alternative you can fork the repo.

---

## 📄 License

MIT

---
