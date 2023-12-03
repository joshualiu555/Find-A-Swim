import {useEffect, useState} from "react";
import axios from "axios";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {Pdf} from "../components/pdf";
import "./pages.css"

export const PublicWorkouts = () => {
    const [workouts, setWorkouts] = useState([])
    const [stroke, setStroke] = useState("freestyle")
    const [distance, setDistance] = useState("50")

    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const response = await axios.get(`https://find-a-swim-1b209de32774.herokuapp.com/workouts?stroke=${stroke}&distance=${distance}`)
                setWorkouts(response.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchWorkout()
    }, [stroke, distance])

    const handleStroke = (event) => {
        setStroke(event.target.value)
    }

    const handleDistance = (event) => {
        setDistance(event.target.value)
    }

    return (
        <div>
            <h1>Public Workouts</h1>

            <label htmlFor="stroke">Stroke</label>
            <select name="strokes" id="stroke" onChange={handleStroke}>
                <option value="freestyle">Freestyle</option>
                <option value="backstroke">Backstroke</option>
                <option value="butterfly">Butterfly</option>
                <option value="breaststroke">Breaststroke</option>
                <option value="im">IM</option>
            </select>

            <label htmlFor="distance">Distance</label>
            <select name="distances" id="distance" onChange={handleDistance}>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="400/500">400/500</option>
                <option value="800/1000">800/1000</option>
                <option value="1500/1650">1500/1650</option>
            </select>

            <ul>
                {workouts.map((workout) => (
                    <li key={workout._id}>
                        <div>
                            <h2>{workout.name}</h2>
                        </div>
                        <div>
                            <p style={{ whiteSpace:'pre-wrap'}}>{workout.description}</p>
                        </div>
                        <PDFDownloadLink document={<Pdf
                            name={workout.name}
                            stroke={workout.stroke}
                            distance={workout.distance}
                            description={workout.description}/>}
                                         fileName={"workout.pdf"}>
                            <button>Download</button>
                        </PDFDownloadLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
