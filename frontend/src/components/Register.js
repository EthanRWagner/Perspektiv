import React, {useState} from 'react';
import PropTypes from "prop-types";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {isEmail} from "validator";
import "../css/Register.css";

// Validators

// alerts the user that a field in the form is required
const required = value => {
    if (!value) {
        return (<div className="alert alert-danger" role="alert">
            This field is required.
        </div>);
    }
};

// imported a checker for legitimate email format
const valEmail = value => {
    if (!isEmail(value)) {
        return (<div className="alert alert-danger" role="alert">
            This is not a valid email.
        </div>);
    }
};

// currently restricting usernames to be less than 30 characters
const valUsername = value => {
    if (value.length > 30) {
        return (<div className="alert alert-danger" role="alert">
            The username must be less than 30 characters.
        </div>);
    }
};

// currently password length has to be between 6 and 40 characters
const valPassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (<div className="alert alert-danger" role="alert">
            The password must be between 6 and 40 characters.
        </div>);
    }
};

function Register(props) {
    // uses the model of a user, could get rid of confPassword in the model 
    // can use confPassword in the person state and do not have to pass it in
    // when the user object is created 
    const [person, setPerson] = useState({
        fullName: "", email: "", username: "", password: "", confPassword: "",
    });

    //gets rid of an eslint error
    Register.propTypes = {
        handleSubmit: PropTypes.any.isRequired
    }

    // saves the text data entered in the Form fields
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "fullName") setPerson({
            fullName: value,
            email: person['email'],
            username: person['username'],
            password: person['password'],
            confPassword: person['confPassword']
        }); else if (name === "email") setPerson({
            fullName: person['fullName'],
            email: value,
            username: person['username'],
            password: person['password'],
            confPassword: person['confPassword']
        }); else if (name === "username") setPerson({
            fullName: person['fullName'],
            email: person['email'],
            username: value,
            password: person['password'],
            confPassword: person['confPassword']
        }); else if (name === "password") setPerson({
            fullName: person['fullName'],
            email: person['email'],
            username: person['username'],
            password: value,
            confPassword: person['confPassword']
        }); else setPerson({
            fullName: person['fullName'],
            email: person['email'],
            username: person['username'],
            password: person['password'],
            confPassword: value
        });
    }

    // when the register button is pressed the current state information
    // is passed to the Register Page to be made into a user in the backend
    function registerForm() {
        if (person['password'] === person['confPassword'] && isEmail(person['email'])) {
            props.handleSubmit(person);
            setPerson({fullName: '', email: '', username: '', password: '', confPassword: ''});
        } else {
            throw "Password confirmation invalid: Resubmit registration."
        }
    }

    // Would be nice to add confirmation/error messages like the login page
    return (
    <div className="col-md-12">
        <div className="card card-container">
            <h2>
                Register
            </h2>
            <Form>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <Input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={person.fullName}
                        onChange={handleChange}
                        validations={[required]}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        value={person.email}
                        onChange={handleChange}
                        validations={[required, valEmail]}/>
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        value={person.username}
                        onChange={handleChange}
                        validations={[required, valUsername]}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="text"
                        name="password"
                        id="password"
                        value={person.password}
                        onChange={handleChange}
                        validations={[required, valPassword]}/>
                </div>
                <div className="form-group">
                    <label htmlFor="confPassword">Confirm Password</label>
                    <Input
                        type="text"
                        name="confPassword"
                        id="confPassword"
                        value={person.confPassword}
                        onChange={handleChange}
                        validations={[required]}/>
                </div>
                <div className="form-group">
                    <input type="button" value="Register" onClick={registerForm}/>
                </div>
            </Form>
        </div>
    </div>);
}

export default Register;