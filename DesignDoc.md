EcoTrack: Personal Carbon & Habit Tracker Project 

Project Description
EcoTrack is a full stack web application that helps everyday people understand and reduce their personal carbon footprint. Users log the activities they do every day — driving to work, eating a meal, running the heat — and the app turns those logs into a concrete "Daily Footprint" score they can actually act on.
Users can also set monthly reduction goals, like cutting down on meat or taking public transit more often, and track their progress over time.

Tech Stack:
 • Frontend: React (Hooks) with component-specific CSS. 
• Backend: Node + Express (ES Modules). 
• Database: MongoDB 
• Data: activity logs for testing and visualization.

User Persona:
Persona 1: Lisa, 23, College Student
Lisa drives, takes transit, or flies regularly and wants to understand how their travel habits contribute to their personal carbon footprint.

Persona 2: Darius, 33, Wants to do more for the environment
Darius cares about sustainability but has never tracked his impact before and is looking for a simple way to start logging daily activities and see his footprint score.

Persona 3: Pretti, 27, Enviornmentalist
Pretti is already aware of her habits and wants to set concrete monthly reduction goals and track her progress over time to hold herself accountable.

User Stories:
 Tamiyoo Desir: Activity Log Manager (Full Stack) 
User Stories:
 1. As a user, I want to log a new activity (e.g., "30-mile drive") so that I can track my daily emissions. 
2. Read: As a user, I want to view a list of all my logged activities filtered by date to see my history.
 3. As a user, I want to edit an existing log entry if I accidentally entered the wrong distance or category. 
4. As a user, I want to remove a log entry if it was created in error. 
Implementation: Tamiyoo will create the Activity collection, the Express routes for /api/activities, and the Activity List and Activity Form. 

James Khadan: Goals & Milestone Manager (Full Stack)
 User Stories: 
1. As a user, I want to set a monthly reduction goal (e.g., "Reduce meat consumption by 20%") to stay motivated. 
2. As a user, I want to see my progress toward my active goals based on my activity data. 
3. As a user, I want to adjust the target values of my goals as my lifestyle changes. 
4. As a user, I want to delete a goal that is no longer relevant to my journey. 
Implementation: James will create the Goals collection, the Express routes for /api/goals, and the Goal Dashboard and Goal Editor.
