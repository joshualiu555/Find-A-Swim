import {useEffect, useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";
import "./pages.css"

export const MyWorkouts = () => {
    const [workouts, setWorkouts] = useState([])

    const userID = useGetUserID()
    const [cookies, _] = useCookies(["access_token"])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await axios.get(`https://find-a-swim-1b209de32774.herokuapp.com/workouts/${userID}`, {
                    headers: {authorization: cookies.access_token}
                })
                setWorkouts(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchWorkout()
    }, [])

    return (
        <div>
            <h1>My Workouts</h1>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>
                        <div>
                            <h2>{workout.name}</h2>
                        </div>
                        <div>
                            <h3>{workout.distance} {workout.stroke}</h3>
                        </div>
                        <div>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{workout.description}</p>
                        </div>
                        <Link to={`/my-workouts/edit/${workout._id}`}>
                            <button>Edit</button>
                        </Link>
                        <Link to={`/my-workouts/delete/${workout._id}`}>
                            <button>Delete</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
