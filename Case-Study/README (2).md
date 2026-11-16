# 🎓 Student Management System --- Cloud-Deployed Full-Stack Web Application

**Project:** Student Management System\
**Frontend Hosting:** Vercel\
**Backend Hosting:** Render\
**Database:** MongoDB Atlas

------------------------------------------------------------------------

## 🌐 Live Production Links

-   **Frontend (Vercel):**
    <https://student-management-frontend-five-pi.vercel.app/>
-   **Backend API (Render):**
    <https://student-management-backend-ha2r.onrender.com/>
-   **GitHub Repository:**
    [Case-Study](https://github.com/BhanuPrasad-270106/full-stack-web-development/tree/main/Case-Study)
-   **Database:** MongoDB Atlas

------------------------------------------------------------------------

## 🏛️ System Architecture

The application is divided into three main layers. The frontend sends
HTTP requests to the backend API, and the backend communicates with
MongoDB Atlas to store and retrieve student information.

``` mermaid
flowchart TD
    User["User"]
    subgraph Frontend["Frontend Layer — Vercel"]
        React["React.js User Interface"]
    end
    subgraph Backend["Backend Layer — Render"]
        Express["Node.js + Express.js API"]
        Routes["Student API Routes"]
    end
    subgraph Database["Database Layer — MongoDB Atlas"]
        Mongo[("Student Records")]
    end

    User --> React
    React -->|"HTTP / JSON requests"| Express
    Express --> Routes
    Routes -->|"Read / Write"| Mongo
```

------------------------------------------------------------------------

## ✨ Features

-   **Student Record Management:** Manage student information through
    the web application.
-   **CRUD Operations:**
    -   **Create:** Add student records.
    -   **Read:** Retrieve and display student records.
    -   **Update:** Edit existing student information.
    -   **Delete:** Remove student records.
-   **Database Integration:** Student data is stored in MongoDB Atlas
    rather than only in the browser.
-   **Frontend and Backend Separation:** React frontend communicates
    with the Express backend through API requests.
-   **Cloud Deployment:** Frontend and backend are deployed
    independently using Vercel and Render.

------------------------------------------------------------------------

## 🛠️ Technology Stack

  -----------------------------------------------------------------------
  Layer                   Technology              Purpose
  ----------------------- ----------------------- -----------------------
  **Frontend**            React.js                Builds the user
                                                  interface

  **Backend**             Node.js, Express.js     Handles server-side
                                                  logic and API requests

  **Database**            MongoDB Atlas           Cloud database for
                                                  student records

  **Frontend Hosting**    Vercel                  Hosts the frontend
                                                  application

  **Backend Hosting**     Render                  Hosts the backend API

  **Version Control**     Git, GitHub             Source-code management
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 📡 REST API

**Backend Base URL:**

``` text
https://student-management-backend-ha2r.onrender.com
```

**Students API endpoint:**

``` text
/api/students
```

The frontend uses this endpoint to communicate with the backend for
student record operations.

  Method     Endpoint              Purpose
  ---------- --------------------- --------------------------
  `GET`      `/api/students`       Retrieve student records
  `POST`     `/api/students`       Add a student record
  `PUT`      `/api/students/:id`   Update a student record
  `DELETE`   `/api/students/:id`   Delete a student record

*Confirm the supported methods and route format against the backend
source before treating this table as the complete API specification.*

------------------------------------------------------------------------

## ⚙️ Local Development Setup

### 1. Clone the repository

``` bash
git clone https://github.com/BhanuPrasad-270106/full-stack-web-development.git
cd full-stack-web-development/Case-Study
```

### 2. Install dependencies

Install dependencies separately in the frontend and backend folders. Use
the actual folder names in your repository.

``` bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend folder and add the MongoDB
connection string using the variable name expected by your backend code.

Example:

``` env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Do not upload your `.env` file or database password to GitHub.

For the frontend, configure the backend API URL using the environment
variable name expected by your React setup.

### 4. Run the application

Start the backend and frontend in separate terminals using the scripts
defined in their respective `package.json` files.

Typical commands are:

``` bash
npm install
npm run dev
```

*The exact start commands and folder paths depend on the scripts and
structure in the repository.*

------------------------------------------------------------------------

## ☁️ Cloud Deployment

  Service             Responsibility
  ------------------- ------------------------------------------
  **Vercel**          Deploys and serves the React frontend
  **Render**          Runs the Node.js and Express backend API
  **MongoDB Atlas**   Stores student records in the cloud

### Application Workflow

1.  A user opens the frontend hosted on Vercel.
2.  The React application sends a request to the backend hosted on
    Render.
3.  Express receives and processes the API request.
4.  The backend communicates with MongoDB Atlas.
5.  The response is returned to the frontend and displayed to the user.

### Local Execution vs Cloud Deployment

-   **Local execution:** The frontend and backend run on the developer's
    computer, and the application is accessed through local URLs.
-   **Cloud deployment:** The frontend and backend are hosted on online
    platforms, making the application accessible through public URLs.
    MongoDB Atlas provides cloud database storage.

------------------------------------------------------------------------

## 🔐 Security Notes

-   Store database credentials in backend environment variables.
-   Never commit `.env` files or expose database credentials in frontend
    code.
-   Configure production environment variables in the Render and Vercel
    dashboards.
-   Keep the MongoDB connection string private.

------------------------------------------------------------------------

## 👨‍💻 Author

**A. Bhanu Prasad**

------------------------------------------------------------------------

*Full-Stack Web Development --- Student Management System Case Study.*
