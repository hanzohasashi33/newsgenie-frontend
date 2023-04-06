import React, { useState, useEffect } from "react";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import supabase from "../config/supabaseClient";
import NewsList from "../components/NewsList";
import NotLoggedInPage from "./NotLoggedInPage";

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
		<div className="App">
			<header className="App-header">
				<h1>NewsGenie</h1>
				<Button
					type="submit"
					className="mb-1"
					onClick={() => signOutUser()}
				>
					signOut
				</Button>
				<Button
					type="submit"
					className="mb-2"
					onClick={() => navigate("/create")}
				>
					Create news article!
				</Button>
				<NewsList user={props.token.user}></NewsList>
			</header>
		</div>
	);
}

export default Success;
