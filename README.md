# CareerGuideX
CareerGuideX is an AI-powered career guidance and job application platform designed to help users discover suitable jobs through skill-based intelligence. Users can manually add their skills , after which the system analyzes these skills using AI.

Based on the added skills, CareerGuideX intelligently filters and suggests relevant job roles. For each suggested role, the platform searches for real-time job openings using external job APIs and displays matching opportunities to the user. This approach simplifies the job search process by combining smart skill-to-role mapping, automated job discovery, and a clean, user-friendly experience.
---

## ✨ Features

* 🔐 **User Authentication**

  * Email & password login / registration
  * Google & GitHub OAuth authentication
  * JWT-based secure sessions

*🔁 Forgot & Reset Password (Nodemailer)

*Secure "Forgot Password" flow using email verification

*Password reset link sent via Nodemailer

*Token-based reset with expiry for enhanced security

* 👤 **User Profile Management**

  * Create and update user profiles
  * Upload profile pictures (Cloudinary integration)

* 📄 **Resume Management**

  * Upload  resumes 
  * Resume storage using Cloudinary
  * View and delete uploaded resumes

* 🤖 **AI Skill Extraction & Job Matching**

  * Matches skills with relevant job roles

* 📌 **Job Listings & Auto Apply**

  * Fetch jobs using external Job APIs (Adzuna)
  * Track applied jobs

* 💬 **Chatbot (Career Assistant)**

  * Helps users contact for admin 
* 🛡️ **Admin Panel**

  * Admin authentication
  * Manage users and platform data

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* GSAP (Animations)

### Backend

* Node.js
* Express.js
* MongoDB (MongoDB Atlas)
* Mongoose
* Passport.js (OAuth)
* JWT Authentication

### AI & APIs

* AI APIs for resume skill extraction
* Adzuna Job Search API

### Cloud & Deployment

* Cloudinary (Resume & image storage)
* Render (Frontend & Backend deployment)

---

## 📂 Project Structure

CareerGuideX/
├── frontend/ # User-facing application
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── services/
│ ├── public/
│ └── main.jsx
├── admin-frontend/ # Admin dashboard application
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── layouts/
│ ├── public/
│ └── main.jsx
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── config/
│ └── utils/
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory and add:

```
PORT=5005
MONGO_URI=mongodb://127.0.0.1:27017/careerguidex
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:5005/api
CORS_ORIGINS=http://localhost:5173,http://localhost:5174

# Job & Search APIs
JOBS_API_KEY=your_rapidapi_key_here
LINKEDIN_API_HOST=linkedin-job-search-api.p.rapidapi.com
LINKEDIN_API_KEY=your_linkedin_api_key

ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_API_KEY=your_adzuna_api_key

SERPAPI_KEY=your_serpapi_key

# Admin Configuration
ADMIN_ID=your_admin_id
ADMIN_EMAIL=admin@careerguidex.com
ADMIN_PASSWORD=your_admin_password
ADMIN_JWT_SECRET=your_admin_jwt_secret

# Email Service
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password

# OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
# User Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_ADMIN_ID=your_admin_id

# 🧑‍💼 Admin Frontend (admin-frontend/.env)
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_ADMIN_ID=your_admin_id

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```
git clone https://github.com/Devaraj01311/CareerGuideX.git
cd careerguidex
```

### 2️⃣ Backend Setup

```
cd backend
npm install
npm run dev
```

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```
### 3️⃣Admin Setup

```
cd admin
npm install
npm run dev
```

---

## 🌐 Live Demo
* Link: https://careerguidex.onrender.com
---

## 📸 Screenshots



---

## 🔮 Future Enhancements

* Advanced AI-based job recommendations
* Resume scoring and improvement suggestions
* Interview preparation module
* Notifications for job status updates


---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Devaraj L**

* GitHub: [https://github.com/Devaraj01311](https://github.com/Devaraj01311)
* LinkedIn: [https://linkedin.com/in/Devaraj-l-b30b88353](https://linkedin.com/in/Devaraj-l-b30b88353)
* Portfolio: [https://portfolio-qcyw.onrender.com](https://portfolio-qcyw.onrender.com)

---

⭐ If you like this project, give it a star on GitHub!
