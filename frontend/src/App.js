import React from "react";
<<<<<<< HEAD
import RegisterPage from "./components/RegisterPage";
import MyApp from "./components/MyApp";
=======
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import MyApp from "./MyApp";
>>>>>>> d2c6080078b8ae39b61c1bc2351b82043585ae23
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import "./css/App.css";

//<button onClick={navigateToRegister}>Register</button>
function App() {
<<<<<<< HEAD
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
                        </ul>
                    </nav>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <MyApp/>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <RegisterPage/>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>

    );
=======
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
>>>>>>> d2c6080078b8ae39b61c1bc2351b82043585ae23
}

export default App;