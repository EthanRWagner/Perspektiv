import React, {useState} from 'react';
import PropTypes from "prop-types";

function Register(props) {
    const [person, setPerson] = useState(
        {
            fullName: "",
            email: "",
            username: "",
            password: "",
            confPassword: "",
        }
    );

//gets rid of an eslint error
Register.propTypes = {
    handleSubmit: PropTypes.any.isRequired
}

function handleChange(event) {
    const { name, value } = event.target;
    if (name === "fullName")
        setPerson(
            {fullName: value, email: person['email'], username: person['username'], password: person['password'], confPassword: person['confPassword']}
        );
    else if (name === "email")
        setPerson(
            {fullName: person['fullName'], email: value, username: person['username'], password: person['password'], confPassword: person['confPassword']}
        );
    else if (name === "username")
        setPerson(
            {fullName: person['fullName'], email: person['email'], username: value, password: person['password'], confPassword: person['confPassword']}
        );
    else if (name === "password")
        setPerson(
            {fullName: person['fullName'], email: person['email'], username: person['username'], password: value, confPassword: person['confPassword']}
        );
    else
        setPerson(
            {fullName: person['fullName'], email: person['email'], username: person['username'], password: person['password'], confPassword: value}
        );
  }

function registerForm() {
    if (person['password'] === person['confPassword']){
        props.handleSubmit(person);
        setPerson({fullName: '', email: '', username: '', password: '', confPassword: ''});
    }
    else {
        throw "Password confirmation invalid: Resubmit registration."
    }
}

    return (
        <form>
            <label htmlFor="fullName">Full Name</label>
            <input
                type="text"
                name="fullName"
                id="fullName"
                value={person.fullName}
                onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                name="email"
                id="email"
                value={person.email}
                onChange={handleChange} />
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                value={person.username}
                onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input
                type="text"
                name="password"
                id="password"
                value={person.password}
                onChange={handleChange} />
            <label htmlFor="confPassword">Confirm Password</label>
            <input
                type="text"
                name="confPassword"
                id="confPassword"
                value={person.confPassword}
                onChange={handleChange} />
            <input type="button" value="Register" onClick={registerForm} />
        </form>
    );
}
export default Register;