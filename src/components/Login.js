import { useState } from 'react'
import './Login.css';

const Login = (props) => {

    // local state to store input field details
    // useRef can also be used to get the details
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // storing any error messages
    const [error, setError] = useState("")

    // input change handlers
    const onUserNameChange = (e) => {
        setUsername(e.target.value)
    }
    const onPassWordChange = (e) => {
        setPassword(e.target.value)
    }


    const onLogin = (e) => {
        // stop submit from refreshing the page
        e.preventDefault()

        // This check is not needed in general as the submit button itself will be disabled.
        // but just for double check incase of any issue
        if (!username || !password) {
            setError("Required fields are empty")
            return
        }

        // Fetching the user data and checking the user name and password against it.
        // ideally this should be done on the server side
        // but for simplicity, we are doing it here.
        fetch("http://localhost:3001/users")
            .then(res => res.json())
            .then(users => {
                const selectedUser = users.find(user => user.name === username)
                if (selectedUser && selectedUser.password === password) {
                    props.onLogin(selectedUser.role)
                } else {
                    setError("UserName or Password are incorrect")
                }
            }).catch(err => {
                setError("Something Went Wrong")
            })
    }

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={onLogin}>
                <input type="text" name="username" placeholder="Enter Username" onChange={onUserNameChange} required />
                <input type="password" name="password" placeholder="Enter Password" onChange={onPassWordChange} required />
                <button type="submit" disabled={!username || !password}>Login</button>
            </form>
            {error ? <p className="Error">{error}</p> : null}
        </div>
    )
}

export default Login