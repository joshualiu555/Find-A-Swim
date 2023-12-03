import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";
import "./pages.css"

export const EditWorkout = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [stroke, setStroke] = useState("")
    const [distance, setDistance] = useState("")

    const {workoutID} = useParams()
    const navigate = useNavigate()

    const [cookies, _] = useCookies(["access_token"])

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/workouts/edit/${workoutID}`, {
                    headers: {authorization: cookies.access_token}
                })
                setName(response.data.name)
                setDescription(response.data.description)
                setStroke(response.data.stroke)
                setDistance(response.data.distance)
            } catch (err) {
                console.log(err)
            }
        }

        fetchWorkout()
    }, [])

    const handleEdit = async (e) => {
        e.preventDefault()
        await axios.put(`http://localhost:3001/workouts/${workoutID}`, {name, description, stroke, distance}, {
            headers: {authorization: cookies.access_token}
        })
        alert("Workout edited")
        navigate("/my-workouts")
    }

    const handleStroke = (event) => {
        setStroke(event.target.value)
    }

    const handleDistance = (event) => {
        setDistance(event.target.value)
    }

    return (
        <div>
            <h1>Edit Workout</h1>
            <form className={"workout-container"} onSubmit={handleEdit}>
                <label htmlFor={"name"}>Name</label>
                <input type={"text"} id={"name"} name={"name"} value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="stroke">Stroke</label>

                <select name="strokes" id="stroke" value={stroke} onChange={handleStroke}>
                    <option value="freestyle">Freestyle</option>
                    <option value="backstroke">Backstroke</option>
                    <option value="butterfly">Butterfly</option>
                    <option value="breaststroke">Breaststroke</option>
                    <option value="im">IM</option>
                </select>

                <label htmlFor="distance">Distance</label>
                <select name="distances" id="distance" value={distance} onChange={handleDistance}>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="400/500">400/500</option>
                    <option value="800/1000">800/1000</option>
                    <option value="1500/1650">1500/1650</option>
                </select>

                <label htmlFor={"description"}>Description</label>
                <textarea id={"description"} name={"description"} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <button type={"submit"}>Edit Workout</button>
            </form>
        </div>
    )
}
