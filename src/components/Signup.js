import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "",email: "", password: "", cpassword: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.password===credentials.cpassword)
        {
            const {name, email, password} = credentials;
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            });
            const json = await response.json()
            console.log(json);
            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
                history.push("/");
                props.showAlert("Successfully Account Created", "success")
            }
            else{
                props.showAlert("User already exist with this email", "denger")
            } 
        }else{
            props.showAlert("Confirm Password is not equal to Password", "denger")
        }
       
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container mt-3">
            <h2 className="my-3">Create an account to use iNotebook</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} name="name" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" minLength={5} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
