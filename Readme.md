# VideoTube Backend

> A Node.js/Express backend powering a YouTube‑style video hosting application.  Built as part of the 
> **chai aur code** series by Hitesh Choudhary, it demonstrates a full‑featured REST API
> with MongoDB and JWT authentication.

<br/>

## 🔧 Features

- User registration & login with **JWT** and **bcrypt**
- Video upload (multer) & cloud storage (Cloudinary)
- Like/dislike, comment & reply system
- Playlists, subscriptions, dashboards, and more
- Standard middleware: error handling, auth, async wrapper
- Mongoose schemas with aggregation pipelines and pagination

<br/>

## 🚀 Quick start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+ or higher
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- A Cloudinary account (for media assets)

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/parth-parmar21/videotube-backend.git
   cd VideoTube
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment template and configure:
   ```bash
   cp .env.example .env
   ```
   Required variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/videotube
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:5000` by default.

<br/>

## 📁 Project structure

```
src/
├─ controllers/      # request handlers (TODOs to be implemented)
├─ models/           # mongoose schemas
├─ routes/           # express routers
├─ middlewares/      # auth, multer, error wrapping
├─ utils/            # ApiError, ApiResponse, asyncHandler, cloudinary setup
└─ index.js          # app entrypoint
```

<br/>

## 🛠 API Endpoints

All routes are protected by JWT (see `verifyJWT` middleware) except auth endpoints.

### Auth
| Method | Path                 | Description              |
|--------|----------------------|--------------------------|
| POST   | `/api/auth/register` | Register new user        |
| POST   | `/api/auth/login`    | Obtain access & refresh tokens |

### Users
| GET | `/api/users/:id` | Get user profile |
| PATCH | `/api/users/:id` | Update user (avatar, bio, etc) |

### Videos
| POST   | `/api/videos`         | Upload a video             |
| GET    | `/api/videos/:id`     | View video details         |
| PATCH  | `/api/videos/:id/like`| Like/unlike video          |
| ...    |                      | (see controllers for full list) |

### Playlists
| GET    | `/api/playlists/user/:userId` | User's playlists      |
| POST   | `/api/playlists`            | Create playlist        |
| PATCH  | `/api/playlists/add/:videoId/:playlistId` | Add video |
| PATCH  | `/api/playlists/remove/:videoId/:playlistId` | Remove video |
| ...    |                              | more operations (update, delete) |

*(use POSTMAN or similar to explore all routes)*

<br/>

## ✅ Completing TODOs

This repository is intended as a learning assignment.  Many controller functions still
include `// TODO` comments.  You are expected to implement the missing logic and
handle all edge cases.  Once finished, drop a link in the project's Discord or Twitter
for recognition.

<br/>

## 🤝 Contributing

1. Fork the project.
2. Finish one or more controllers completely.
3. Submit a pull request—PRs that only partially address TODOs will not be merged.
4. After review, your repo may be featured here.

<br/>

## 📜 License

MIT © Hitesh Choudhary

---