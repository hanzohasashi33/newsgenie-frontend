import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from "./auth/loginPage";
import Success from "./auth/successPage";
import Article from "./components/Article";

import Create from "./components/createNews";
import NotLoggedInPage from "./auth/NotLoggedInPage";

function App() {
	const [token, setToken] = useState(false);

	if (token) {
		sessionStorage.setItem("token", JSON.stringify(token));
	}

	useEffect(() => {
		if (sessionStorage.getItem("token")) {
			let data = JSON.parse(sessionStorage.getItem("token"));
			setToken(data);
		}
	}, []);

	return (
		<Router>
			<Routes>
				{token ? <Route path="/" element={<Success token={token} />}></Route> : <Route path="/error" element={<NotLoggedInPage></NotLoggedInPage>}></Route>}
				<Route path="/login" element={<Login setToken={setToken} />}></Route>
				<Route path="/create" element={<Create></Create>}></Route>
				<Route path="/article/:id" element={<Article></Article>}></Route>
			</Routes>
		</Router>
	);
}

export default App;
