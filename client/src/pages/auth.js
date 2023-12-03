import {useState} from "react";
import axios from "axios"
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import "./pages.css"

export const Auth = () => {
    return (
        <div className={"auth"}>
            <h1>Find A Swim</h1>
            <Login/>
            <Register/>
        </div>
    )
}

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post("http://localhost:3001/auth/login", {
                username,
                password
            })
            setCookies("access_token", response.data.token)
            window.localStorage.setItem("userID", response.data.userID)
            navigate("/my-workouts")
        } catch (err) {
            if (err.response.status === 401) {
                alert(err.response.data.error)
            }
        }
    }

    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label={"Login"}
            onSubmit={onSubmit}
        />
    )
}

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("http://localhost:3001/auth/register", {username, password})
            alert("Registration completed")
        } catch (err) {
            if (err.response.status === 401) {
                alert(err.response.data.error)
            }
        }
    }

    return (
        <Form
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            label={"Register"}
            onSubmit={onSubmit}
        />
    )
}

const Form = ({setUsername, setPassword, label, onSubmit}) => {
    return (
        <div className={"auth-container"}>
            <form onSubmit={onSubmit}>
                <h2>{label}</h2>
                <div>
                    <label htmlFor={"username"}>Username:</label>
                    <input type={"text"} id={"username"} onChange={(event) => {
                        setUsername(event.target.value)
                    }}/>
                </div>

                <div>
                    <label htmlFor={"password"}>Password:</label>
                    <input type={"password"} id={"password"} onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                </div>

                <button type={"submit"}>{label}</button>
            </form>
        </div>
    )
}
