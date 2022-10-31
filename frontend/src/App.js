import React from "react";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import Feed from "./components/Feed";
import MyApp from "./components/MyApp";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./css/App.css";

function App() {
	return (
		<div>
			<div>
				<BrowserRouter basename="/">
				<nav>
					<div className="dropdown">
							<Link to="/">PERSPEKTIV</Link>
						<div className="dropdown-content">
							<ul className="no-bullets">
								<li>
									<Link to="/register">Register</Link>
								</li>
								<li>
									<Link to="/login">Login</Link>
								</li>
								<li>
									<Link to="/<user>feed">Feed</Link>
								</li>
							</ul>
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
		</div>
		
	);
}

export default App;