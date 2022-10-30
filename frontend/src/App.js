import React from "react";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import MyApp from "./components/MyApp";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./css/App.css";

//<button onClick={navigateToRegister}>Register</button>
function App() {
	// const navigate = useNavigate();
	// const navigateToRegister = () => {
	// 	navigate('/register');
	// };
	return (
		<div>
			<div>
				<BrowserRouter basename="/">
				<nav>
					<ul>
						<li>
							<Link to="/">PERSPEKTIV</Link>
						</li>
						<li>
							<Link to="/register">Register Here</Link>
						</li>
						<li>
							<Link to="/login">Login Here</Link>
						</li>
					</ul>
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
					</Routes>
				</BrowserRouter>
			</div>
		</div>
		
	);
}

export default App;