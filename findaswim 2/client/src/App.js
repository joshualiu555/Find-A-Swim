import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {PublicWorkouts} from "./pages/public-workouts";
import {Auth} from "./pages/auth";
import {CreateWorkout} from "./pages/create-workout";
import {MyWorkouts} from "./pages/my-workouts";
import {Navbar} from "./components/navbar";
import {EditWorkout} from "./pages/edit-workout";
import {DeleteWorkout} from "./pages/delete-workout";

function App() {
  return (
    <div className="App">
      <Router>
          <Navbar/>
          <Routes>
              <Route path="/"  element={<PublicWorkouts/>}/>
              <Route path="/auth"  element={<Auth/>}/>
              <Route path="/create-workout"  element={<CreateWorkout/>}/>
              <Route path="/my-workouts"  element={<MyWorkouts/>}/>
              <Route path="/my-workouts/delete/:workoutID" element={<DeleteWorkout/>}/>
              <Route path="/my-workouts/edit/:workoutID" element={<EditWorkout/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
