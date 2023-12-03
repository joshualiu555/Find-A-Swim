import {useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useCookies} from "react-cookie";

export const DeleteWorkout = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()
    const {workoutID} = useParams()

    const [cookies, _] = useCookies(["access_token"])

    const deleteWorkout = async (workoutID) => {
        await axios.delete(`http://localhost:3001/workouts/${workoutID}`, {
            headers: {authorization: cookies.access_token}
        })
        alert("Workout deleted")
        navigate("/my-workouts")
    }

    return (
        <div>
            <p>Are you sure you want to delete this workout?</p>
            <Link to={"/my-workouts"}>
                <button>
                    No
                </button>
            </Link>
            <button onClick={() => deleteWorkout(workoutID)}>
                Yes
            </button>
        </div>
    )
}
