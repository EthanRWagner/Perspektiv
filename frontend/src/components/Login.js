import React, {useState} from 'react';
import PropTypes from "prop-types";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

// Validators
const required = value => {
    if (!value) {
        return (<div className="alert alert-danger" role="alert">
            This field is required.
        </div>);
    }
};

function Login(props) {
    const [user, setUser] = useState({
        username: "", password: "",
    });

    Login.propTypes = {
        handleSubmit: PropTypes.any.isRequired
    }

    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "password") setUser({username: user['name'], password: value}); else setUser({
            username: value,
            password: user['job']
        });
    }

    function LoginForm() {
        props.handleSubmit(user);
        setUser({username: '', password: ''});
    }

    return (<div className="col-md-12">
        <div className="card card-container">
            <h2>
                Login
            </h2>
            <Form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        validations={[required]}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="text"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                        validations={[required]}/>
                </div>
                <div className="form-group">
                    <input type="button" value="Submit" onClick={LoginForm}/>
                </div>
            </Form>
        </div>
    </div>);
}

export default Login