# **Project Overview: Movie Streaming App**

## **Welcome to NextFelix!**

This application is a **dynamic movie streaming platform** built with **React, Android (Frontend)** and **Node.js, c++ (Backend)**, designed to replicate the functionality of real-world services like Netflix. It supports various user roles, has a beautiful UI/UX design, and integrates all major features such as user registration, login, movie watching, movie recommendations, and administrative controls.

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
  - Watch full movies.
- **Dark/Light Mode**:
  - Switch between light and dark themes with a toggle button.

### **Admin Features**

- **Become an Admin**:

  - If you'd like to become an admin in the MongoDB database, follow these steps:
    1. Open **MongoDB Compass** and connect to your database.
    2. Navigate to the **"Users"** section and find your username in the list.
    3. Click on your username and, in the roles section, change your role to **"admin"**.
    4. Save the changes.
    5. After updating your role, **log out of the application**.
    6. Log back in, and you will now have admin access to manage movies and categories.

- **Manage Movies**:
  - Add, edit, or delete movies.
- **Manage Categories**:
  - Add, edit, or delete movie categories.

---

## **Technology Stack**

### **Frontend**

- **React**: For building the UI with reusable components for the web.
- **CSS (Styled Components)**: For responsive styling and modern UI.
- **JWT Authentication**: For secure user login, token management, and authentication across both web and mobile apps.
- **Android**: The mobile version of the app is built using **Java** for Android devices.
- **Retrofit**: Used for API communication with the backend to fetch movie data and manage user authentication.

### **Backend**

- **C++**: Smart recommendations engine for processing movie recommendations.
- **Node.js + Express**: Server-side framework for API handling.
- **MongoDB**: For storing user data, movie details, etc.
- **JWT Authentication**: For securing endpoints and user authorization.

---

## **System Architecture**

The application is structured in the following layers:

- **Frontend**:
  - **React** app that communicates with the backend using RESTful APIs.
  - **Android** app built using **Java**, interacting with the same backend to provide a mobile experience.
- **Backend**:
  - **Node.js & Express** server that exposes API endpoints for user registration, login, and movie management.
- **Database**:
  - **MongoDB** database that stores users, movies, categories, and recommendations.
- **Authentication**:
  - Secure user authentication using **JWT** tokens.

---

## **How to Run**

You can run the code using Docker in the following way:

1. Run a Mongo DB container (NOTE: the DB will start empty every time it is restarted)

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --service-ports --rm --name mongo mongo
```

2. Run the recommendation server (make sure the file `./data/user_data.txt` is deleted first)

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --service-ports --rm --name server-main server-main 8080
```

3. Create a config file at `./src/web-server/config/.env.production` with the relevant ports and addresses. If you follow our exact command, this should look like this:

```env
CONNECTION_STRING=mongodb://mongo:27017
PORT=3000
RECOMMEND_IP="server-main"
RECOMMEND_PORT=8080
JWT_PRIVATE_KEY=some_private_key
```

4. Run the web server (it will include the React client)

```bash
docker-compose -f src/docker-compose.yml run --build --remove-orphans --rm --name web-server -p 3000:3000 web-server
```

Now, you can access the web server through localhost at the specified port. For example:

```bash
curl -i http://localhost:3000/api/categories
```

5. Now, you can browse the React client at `http://localhost:3000/`.

6. In addition, you can open `/src/android-client` in Android Studio and run the Android client on an emulator.

---

## **Screenshots**

Here are some screenshots of the application in action:

## React:

### **Home Screen (Before Login)**

![Image](https://github.com/user-attachments/assets/bd9a3e61-d581-45f3-a187-8cf99c777802)

### **Sign up Screen**

![Image](https://github.com/user-attachments/assets/c81e1535-b1df-4159-8781-c59da5afb0bb)

### **Login Screen**

![Image](https://github.com/user-attachments/assets/d90ae46f-7d1d-407a-87b2-4372dbbaa2d1)

### **Home page Screen**

![Image](https://github.com/user-attachments/assets/35013ff0-2d12-4272-b950-fb4f9956c446)

![Image](https://github.com/user-attachments/assets/e9bb0c02-8962-4b8c-b282-568e46d6735c)

### **Search movies screen**

![Image](https://github.com/user-attachments/assets/c9d11fcc-fc0f-4c8b-a56a-27d39a80470e)

### **Movie Details Screen**

![Image](https://github.com/user-attachments/assets/97b40401-a119-4a1c-8429-23ed2925357f)

### **Movie Player**

![Image](https://github.com/user-attachments/assets/5dc73a85-de1c-4b34-b80a-3cefccaf0272)

### **Admin Dashboard**

![Image](https://github.com/user-attachments/assets/441fe2e2-5677-474e-acf4-69c12b5164d6)

![Image](https://github.com/user-attachments/assets/3ce67b70-1532-497b-b168-52b3ffd3a1de)

![Image](https://github.com/user-attachments/assets/ab372919-755c-483d-88c1-2e3040619552)

![Image](https://github.com/user-attachments/assets/830a8127-6035-47d7-99bc-cdc55a6fc3f2)

## Android:

### **Sign up Screen**

![Image](https://github.com/user-attachments/assets/bca3259a-e69d-43c5-a8d1-85c7e0196f72)

### **Login Screen**

![Image](https://github.com/user-attachments/assets/8408d708-43da-4e19-8305-946838f8c9c0)

### **Home page Screen**

![Image](https://github.com/user-attachments/assets/142b6c90-0d33-4d50-9555-208c4b21483b)

### **Search movies screen**

![Image](https://github.com/user-attachments/assets/17684be1-a53b-4acc-8a6d-904d0d0f6d8e)

### **Movie Details Screen**

![Image](https://github.com/user-attachments/assets/ba17bdfe-e51b-4f03-88f7-d7da9c6240f2)

### **Movie Player**

![Image](https://github.com/user-attachments/assets/c21b478f-bfc9-4c26-8c11-9651114a2b6f)

### **Navigation bar**

![Image](https://github.com/user-attachments/assets/45efe7ff-f945-4353-a5ac-6c242bdb6e53)

![Image](https://github.com/user-attachments/assets/4e038405-1499-4545-b840-85d6142ea59c)

### **Admin Dashboard**

![Image](https://github.com/user-attachments/assets/54a8cacb-8a8d-4e5a-83ee-0fedb31218af)

![Image](https://github.com/user-attachments/assets/5da0b962-8502-4313-818a-95069a46b0ea)

---

## **Role-Based Authentication**

### **User Roles**

#### **Regular User:**

- Can browse movies.
- Can watch movies and view recommendations.
- Cannot manage content.

#### **Admin User:**

- Has all user features.
- Can manage movies and categories through the admin panel.

### **JWT Authentication Flow**

1. **Login**: Upon successful login, the user receives a JWT token which is stored in the browser's local storage.
2. **Token Validation**: For each subsequent request, the JWT token is included in the request headers to validate user identity and permissions.
3. **Role-based Access**: Based on the user role (admin or regular), different functionalities are accessible (e.g., only admins can add/edit/delete movies).

---

## **Important Notes**

### **Validation:**

- All user inputs, including registration and login, are validated (e.g., name length, password strength, etc.).
- Feedback is provided for invalid inputs.

### **Security:**

- Passwords are securely hashed before storing.
- JWT tokens are used to protect sensitive data.

### **Responsive Design:**

- The app is fully responsive and adapts well to mobile and desktop views.

---

## **Contact**

For any questions or feedback, feel free to reach out:

Email:

Dvir: [dvir.berl@gmail.com](mailto:dvir.berl@gmail.com)

Dor: [dorshroitman0803@gmail.com](mailto:dorshroitman0803@gmail.com)

Aviv: [avivb77@gmail.com](mailto:avivb77@gmail.com)

GitHub: [https://github.com/dvirberlo/AdvProgProj](https://github.com/dvirberlo/AdvProgProj)

Feel free to explore and contribute to the project. We hope you enjoy using the app!

---

**Happy Streaming! 🍿🎬**
