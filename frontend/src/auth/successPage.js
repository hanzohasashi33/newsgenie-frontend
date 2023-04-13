import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";


import supabase from "../config/supabaseClient";
import NewsList from "../components/NewsList";
import NavBar from "../components/Navbar";

function Success(props) {
	// const [session, setSession] = useState(null);
	const [user, setUser] = useState({});
	const navigate = useNavigate();

	async function signOutUser() {
		// setSession(null);
		const { error } = await supabase.auth.signOut();
		sessionStorage.removeItem("token");
		navigate("/login");
	}

	return (
		<>
			<NavBar></NavBar>

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
