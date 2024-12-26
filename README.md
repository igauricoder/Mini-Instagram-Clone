# Mini-Instagram-Clone
# Instagram Clone Project

This project is an Instagram-like web application built using modern web technologies. It includes features such as user authentication, post creation, likes, and comments.

## Prerequisites
Before starting, ensure you have the following installed on your system:

- **Node.js**: Version 16.14.0
- **npm**: Version 8.3.0
- **Angular CLI**: Version 14.0.6
- **Firebase**: For authentication

## Features
- User authentication using Firebase
- Create posts with text and images
- Like and comment on posts
- Responsive design for both desktop and mobile devices

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/instagram-clone.git
   cd instagram-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Set up a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Firestore Database.
   - Replace the `firebaseConfig` object in `src/environments/environment.ts` with your Firebase project details:
     ```javascript
     export const environment = {
       production: false,
       firebaseConfig: {
         apiKey: "<YOUR_API_KEY>",
         authDomain: "<YOUR_PROJECT_ID>.firebaseapp.com",
         projectId: "<YOUR_PROJECT_ID>",
         storageBucket: "<YOUR_PROJECT_ID>.appspot.com",
         messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
         appId: "<YOUR_APP_ID>"
       }
     };
     ```

4. Start the development server:
   ```bash
   ng serve
   ```
   Open your browser and navigate to `http://localhost:4200/` to view the application.

## Scripts
- `ng serve`: Starts the development server.
- `ng build`: Builds the project for production.

## Technologies Used
- **Angular**: Frontend framework
- **Firebase**: Backend services for authentication and database
- **Node.js**: For handling backend logic like posts, likes, and comments

## Contributions
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

https://github.com/user-attachments/assets/fae803f9-e47e-4c81-9ce2-752ced5dcdcd


https://github.com/user-attachments/assets/de75df68-2b6e-4cb8-996f-a5457414a90c

