# **Project Overview: Movie Streaming App**

## **Welcome to NextFelix!**

This application is a **dynamic movie streaming platform** built with **React (Frontend)** and **Node.js (Backend)**, designed to replicate the functionality of real-world services like Netflix. It supports various user roles, has a beautiful UI/UX design, and integrates all major features such as user registration, login, movie watching, movie recommendations, and administrative controls.

### **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [How to Run](#how-to-run)
6. [Screenshots](#screenshots)
7. [Role-Based Authentication](#role-based-authentication)
8. [Important Notes](#important-notes)
9. [Contact](#contact)

---

## **Introduction**

This project simulates a real-world **movie streaming platform**. The goal is to create an application that allows users to browse movies, watch them, receive recommendations, and perform user-specific actions like logging in, registering, and managing content if they are administrators.

The design is inspired by Netflix, with a **responsive** interface suitable for both **desktop** and **mobile** screens. We use **JWT (JSON Web Tokens)** for secure authentication and role-based access control.

---

## **Features**

Here’s a breakdown of the features available in the app:

### **User Features**
- **User Registration & Login**: 
  - Sign up with necessary details (name, password, picture, etc.).
  - Login with username and password.
  - Profile picture is displayed on the home screen.
- **Movie Browsing**: 
  - Browse movies by categories (Action, Comedy, Drama, etc.).
  - Search movies by title.
  - View movie details including recommendations.
- **Watch Movies**: 
  - Play movies directly from the application with a custom video player.
  - Watch trailers or full movies.
- **Dark/Light Mode**: 
  - Switch between light and dark themes with a toggle button.

### **Admin Features**
- **Manage Movies**: 
  - Add, edit, or delete movies.
- **Manage Categories**: 
  - Add, edit, or delete movie categories.
  
---

## **Technology Stack**

### **Frontend**
- **React**: For building the UI with components.
- **React Router**: To manage routing and navigation between pages.
- **CSS (Styled Components)**: For responsive styling.
- **JWT Authentication**: For secure user login and token management.

### **Backend**
- **Node.js + Express**: Server-side framework for API handling.
- **MongoDB**: For storing user data, movie details, etc.
- **JWT Authentication**: For securing endpoints and user authorization.

---

## **System Architecture**

The application is structured in the following layers:

- **Frontend**: React app that communicates with the backend using RESTful APIs.
- **Backend**: Node.js server that exposes API endpoints for user registration, login, and movie management.
- **Database**: MongoDB database that stores users, movies, categories, and recommendations.
- **Authentication**: Secure user authentication using JWT tokens.

---

## **How to Run**

To run the application, follow the steps below.

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/movie-streaming-app.git
cd movie-streaming-app
