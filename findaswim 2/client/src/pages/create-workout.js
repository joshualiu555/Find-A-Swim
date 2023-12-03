import {useState} from "react";
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import "./pages.css"


export const CreateWorkout = () => {
    const [cookies, _] = useCookies(["access_token"])
    const userID = useGetUserID()

    const [workout, setWorkout] = useState({
        name: "",
        stroke: "freestyle",
        distance: "50",
        description: "",
        userOwner: userID
    })

    const handleChange = (event) => {
        const {name, value} = event.target
        setWorkout({
            ...workout,
            [name]: value
        })
    }

    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("https://find-a-swim-1b209de32774.herokuapp.com/workouts", workout, {
                headers: {authorization: cookies.access_token}
            })
            alert("Workout created")
            navigate("/my-workouts")
        } catch (err) {
            console.error(err)
        }
    }

    const handleStroke = (event) => {
        setWorkout({
            ...workout,
            stroke: event.target.value
        })
    }

    const handleDistance = (event) => {
        setWorkout({
            ...workout,
            distance: event.target.value
        })
    }

    return (
        <div>
            <h1>Create Workout</h1>
            <form className={"workout-container"} onSubmit={onSubmit}>
                <label htmlFor={"name"}>Name: </label>
                <input type={"text"} id={"name"} name={"name"} onChange={handleChange}/>

                <label htmlFor="stroke">Stroke: </label>
                <select name="strokes" id="stroke" onChange={handleStroke}>
                    <option value="freestyle">Freestyle</option>
                    <option value="backstroke">Backstroke</option>
                    <option value="butterfly">Butterfly</option>
                    <option value="breaststroke">Breaststroke</option>
                    <option value="im">IM</option>
                </select>

                <label htmlFor="distance">Distance: </label>
                <select name="distances" id="distance" onChange={handleDistance}>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="400/500">400/500</option>
                    <option value="800/1000">800/1000</option>
                    <option value="1500/1650">1500/1650</option>
                </select>

                <label htmlFor={"description"}>Description: </label>
                <textarea id={"description"} name={"description"} onChange={handleChange}></textarea>
                <button type={"submit"}>Create Workout</button>
            </form>
        </div>
    )
}
