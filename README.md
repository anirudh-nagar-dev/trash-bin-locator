# 🗑️ Trash Bin Locator

A web application that helps users find nearby trash bins using their current location. Users can search and filter bins, view them on an interactive map, check their distance, update bin status, and add new bins.

## Features

- 📍 Detects the user's current location
- 🗺️ Displays trash bins on an interactive map
- 📏 Calculates distance between the user and each bin
- 🔎 Search bins by name
- ♻️ Filter bins by status
- ➕ Add new trash bins
- 🔄 Update bin status
- ✅ Form validation and error handling
- 🧭 Get directions to a bin using Google Maps
- 📱 Responsive user interface

## Tech Stack

### Frontend
- React
- Vite
- React Leaflet
- Leaflet
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## How It Works

The React frontend communicates with an Express.js backend through REST API endpoints. Bin data is stored in MongoDB Atlas.

The application obtains the user's location through the browser's Geolocation API and uses latitude and longitude coordinates to calculate the distance to nearby bins.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bins` | Get all trash bins |
| POST | `/api/bins` | Add a new trash bin |
| PATCH | `/api/bins/:id` | Update a bin's status |

## Project Structure

```text
trash-bin-locator/
├── backend/
│   ├── models/
│   │   └── Bin.js
│   └── server.js
│
├── src/
│   ├── Components/
│   │   ├── Navbar.jsx
│   │   ├── BinCard.jsx
│   │   └── Map.jsx
│   ├── App.jsx
│   ├── distance.js
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md
## Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd trash-bin-locator
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
```

### 4. Configure environment variables

Create an environment file in the `backend` directory and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

> ⚠️ Never commit your environment file or expose your MongoDB connection string publicly.

### 5. Start the backend

```bash
node server.js
```

### 6. Start the frontend

From the project root:

```bash
npm run dev
```

## Future Improvements

- User authentication and admin access
- More advanced location-based search
- Improved map markers based on bin status
- Deployment for public access