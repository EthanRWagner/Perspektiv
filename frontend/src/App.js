import React from "react";
import RegisterPage from "./RegisterPage";
import MyApp from "./MyApp";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./App.css";
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
							<Link to="/register">Register Here</Link>
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
					</Routes>
				</BrowserRouter>
			</div>
		</div>
		
	);
}

export default App;