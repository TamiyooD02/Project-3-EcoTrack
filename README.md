# EcoTrack: Personal Carbon & Habit Tracker

## Authors
- Tamiyoo Desir - [desir.t@northeastern.edu]
- James Khadan - [khadan.j@northeastern.edu]

## Class Link
CS 5610 Web Development - Spring 2026 
(https://johnguerra.co/classes/webDevelopment_online_spring_2026/)

## Project Objective
EcoTrack is a full stack web application that helps everyday people understand and reduce their personal carbon footprint. Users can log daily activities like driving, eating, and energy usage, and the app tracks their environmental impact over time. Users can also set monthly reduction goals and monitor their progress.

## Tools Used
- **Frontend:** React (Hooks), Vite, CSS
- **Backend:** Node.js, Express (ES Modules)
- **Database:** MongoDB (Docker for local development, Atlas for production)
- **Authentication:** Passport.js (Local Strategy), bcrypt, express-session
- **Other:** ESLint, Prettier, Git, GitHub, Render

## Screenshots
### Login Page
![login page to EcoTrack that features a green background along with an email field and a password field. Below that is a green button that says login. Underneath has a message that says "No account with Us? Register" Register is a hyperlink ](<images/Screenshot (271).png>)

### Register Page
![alt text](<images/Screenshot (272).png>)

### Activity Log
![alt text](<images/Screenshot (273).png>)

## Public Deployment Link
[Render Deployment Link]

## Instructions to Build

### Prerequisites
Make sure you have the following installed:
- Node.js (v18 or higher)
- Docker Desktop (for running MongoDB locally)
- Git

### Steps to Run Locally

1. Clone the repository:
```
git clone https://github.com/TamiyooD02/Project-3-EcoTrack.git
```

2. Start MongoDB using Docker:
```
docker run -d -p 27017:27017 --name mongo mongo:latest
```

3. Set up the backend:
```
cd backend
npm install
```

4. Create a `.env` file inside the `backend` folder with the following:
```
MONGO_URI=mongodb://localhost:27017/ecotrack
SESSION_SECRET=ecotrack_secret_key_123
```

5. Start the backend server:
```
node seed.js
node index.js
```

6. Open a new terminal and set up the frontend:
```
cd frontend
npm install
npm run dev
```

7. Open your browser and go to:
```
http://localhost:5173
```
## Video Demo
- Part 1 of Video Demo: https://www.loom.com/share/e9b72abc365944e68b67eac4ee77f7c5
- Part 2 of Video Demo: https://www.youtube.com/watch?v=njjBO_ch11Y

## License
MIT License - see LICENSE file for details

## AI Usage Disclosure
- ReadMe.md template from project 2 was used and edited to create this ReadMe template: (exerpt from project 2) Gen AI (specifically Claude) was used to create a template of this README file before it was edited accordingly to match the scope of this project. The prompt was "Acting like your a senior full stack developer, provide a template of a readme file for an gihub repo of a project you just completed."
- Google search during process the building of the Passport Authentication which led to an AI overview. The prompt was "frontend can't tell the difference between a sucessful response and an error." No code was provided to me just an overview of Standard HTTP Status Codes and Practices for Differentiation.
