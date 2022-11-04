import React from "react";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Feed from "./components/Feed";
import MyApp from "./components/MyApp";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./css/App.css";
import styled from "styled-components";

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

//<Link to="/<user>feed">Feed</Link>
function App() {
	return (
		<div>
			<BrowserRouter basename="/">
			<nav>
				<div>
					<div className="navBar">
						<HomeButtonLink to="/">PERSPEKTIV</HomeButtonLink>
						<div className="subNavBar">
							<RegisterLink to="/register">REGISTER</RegisterLink>
							<LoginLink to="/login">LOGIN</LoginLink>
						</div>
					</div>
				</div>
			</nav>
				<Routes>
					<Route
						path="/"
						element={
							<MyApp />
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
							<LoginPage />
						}
					/>
					<Route
						path="/<user>feed"
						element={
							<Feed />
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
		
	);
}

export default App;