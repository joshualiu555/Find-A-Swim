# Find-A-Swim
Allows users to search public workouts based on stroke and distance. Also allows them to register / login and create their own workouts.

[Website Link](https://find-a-swim-1b209de32774.herokuapp.com)

### Public Workouts
Has two dropdowns that allows users to search workouts based on stroke and distance.

<img width="324" alt="Screen Shot 2023-12-03 at 7 00 02 PM" src="https://github.com/joshualiu555/Find-A-Swim/assets/53412192/63c10f4e-9e3a-4ae5-933a-534ea4bba7c1">

### Create Workout
If logged in, a user can create a workout. This is prevented if you are just a guest user. 

<img width="407" alt="Screen Shot 2023-12-03 at 7 01 03 PM" src="https://github.com/joshualiu555/Find-A-Swim/assets/53412192/8792305a-1fc8-40a1-9d5f-382d1a917e86">

### My Workouts
If logged in, a user can view their own workouts. They can also edit or delete each workout. 

<img width="325" alt="Screen Shot 2023-12-03 at 7 01 40 PM" src="https://github.com/joshualiu555/Find-A-Swim/assets/53412192/715c2df5-1dbd-40a4-ba31-a8620401fcd1">

### Login / Register
Allows user to register or login to their account. 

<img width="307" alt="Screen Shot 2023-12-03 at 7 02 05 PM" src="https://github.com/joshualiu555/Find-A-Swim/assets/53412192/1986ef85-e179-466c-86f3-5831feab1879">

### See For Yourself
1) Download this repo as a zip and uncompress
2) Run npm install on both the client and server directories
3) Run `npm run dev` in the server directory
4) Run `npm start` in the client directory

### Deploy to Heroku
1) Add Procfile and write `web src/index.js`
2) Run `npm build` in the client directory
3) Copy that content and put it in a folder called "public" in the server directory
4) Deploy with Heroku CLI instructions
