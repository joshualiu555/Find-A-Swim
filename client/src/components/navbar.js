import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import "./navbar.css"

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID")
        navigate("/auth")
    }

    return (
        <div className={"navbar"}>
            <Link to={"/"}>Public Workouts </Link>
            <Link to={"/create-workout"}>Create Workout </Link>
            <Link to={"/my-workouts"}>My Workouts </Link>
            {!cookies.access_token ?
                <Link to={"/auth"}>Login/Register</Link>
                :
                <button onClick={logout}>Logout</button>
            }
        </div>
    )
}