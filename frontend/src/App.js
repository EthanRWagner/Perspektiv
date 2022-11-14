import React, {useState, useRef} from "react";
import RegisterPage from "./components/RegisterPage";
import Login from "./components/Login";
import ProfilePage from "./components/ProfilePage"
import EditProfilePage from "./components/EditProfilePage";
import Feed from "./components/Feed";
//import MyApp from "./components/MyApp";
import SearchPage from "./components/SearchPage";
import CreatePostPage from "./components/CreatePostPage";
import SearchBar from "./components/SearchBar";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./css/App.css";
import styled from "styled-components";
import axios from 'axios'; 

const port = 8675;

const HomeButtonLink = styled(Link)`
	display: inline;
	position: absolute;
	font-family: 'Courier New', Courier, monospace;
	color: #ed009c;
	background: none;
	font-size: xx-large;
	left: 15px;
`;

const RegisterLink = styled(Link)`
	display: inline;
	position: relative;
	font-family: 'Courier New', Courier, monospace;
	color: #ed009c;
	background: none;
	font-size: large;
`;

const LoginLink = styled(Link)`
	display: inline;
	position: relative;
	font-family: 'Courier New', Courier, monospace;
	color: #ed009c;
	background: none;
	font-size: large;
	padding-left: 25px;
	margin-top: auto;
  	margin-bottom: auto;
`;

const ProfileLink = styled(Link)`
	display: inline;
	position: relative;
	font-family: 'Courier New', Courier, monospace;
	color: #ed009c;
	background: none;
	font-size: large;
	padding-left: 25px;
	margin-top: auto;
  	margin-bottom: auto;
`;

//<Link to="/<user>feed">Feed</Link>
function App() {
	const [user, setUser] = useState({});
	
	const getUser =  async () => {
        var id = window.sessionStorage.getItem("id");
        try {
            var response = await axios.get(`http://localhost:${port}/users/${id}`)
            setUser(response.data.user);
        }
        catch(er) {
            setUser(undefined);
        }
    }

	const initializedRef = useRef(false);
    
    if (!initializedRef.current) {
      initializedRef.current = true;
      getUser();
    }

	return (
		<div>
			<BrowserRouter basename="/">
			<nav>
				<div>
					<div className="navBar">
						<HomeButtonLink to="/feed">PERSPEKTIV</HomeButtonLink>
						<SearchBar/>
						{user == undefined ? <div className="subNavBar">
							<RegisterLink to="/register">REGISTER</RegisterLink>
							<LoginLink to="/login">LOGIN</LoginLink>
						</div> 
						:
						<div className="subNavBar">
							<RegisterLink to="/feed">FEED</RegisterLink>
							<ProfileLink to="/profile">PROFILE</ProfileLink>
							<LoginLink to={"/login"} onClick={() => {
								window.sessionStorage.removeItem("id");
								setUser(undefined);
							}}>LOGOUT</LoginLink>
						</div>}
					</div>
				</div>
			</nav>
				<Routes>
					<Route
						path="/"
						element={
							<Login />
						}
					/>
					<Route
						path="/register"
						element={
							<RegisterPage />
						}
					/>
					<Route
						path="/login"
						element={
							<Login />
						}
					/>
					<Route
						path="/profile"
						element={
							<ProfilePage />
						}
					/>
					<Route
						path="/editProfile"
						element={
							<EditProfilePage />
						}
					/>
					<Route
						path="/feed"
						element={
							<Feed />
						}
					/>
					<Route
						path="/search"
						element={
							<SearchPage />
						}
					/>
					<Route
						path="/createPost"
						element={
							<CreatePostPage />
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
		
	);
}

export default App;