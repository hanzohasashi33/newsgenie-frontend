import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";


import supabase from "../config/supabaseClient";
import NewsList from "../components/NewsList";
import NavBar from "../components/Navbar";
import logger from "../config/logger";

function Success(props) {
	// const [session, setSession] = useState(null);
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	async function signOutUser() {
		// setSession(null);
        const logoutUser = props.token.user.email;
        
		const { error } = await supabase.auth.signOut();
        console.log(logoutUser);
        if(error) {
            logger("logout", logoutUser, "error logging out", "error");
        } else {
            console.log(logoutUser);
            logger("logout", logoutUser, "logged out", "info");
        }
		sessionStorage.removeItem("token");
		navigate("/login");
	}

	return (
		<>
			<NavBar usermail={props.token.user.email}></NavBar>

			<div className="App">
				<header className="App-header">
					<Container>
						<br></br>
						<NewsList user={props.token.user}></NewsList>
					</Container>
				</header>
			</div>
		</>
	);
}

export default Success;
