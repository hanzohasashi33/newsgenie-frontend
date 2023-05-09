import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import supabase from "../config/supabaseClient";


import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import logger from "../config/logger";

const NavBar = (props) => {
	const navigate = useNavigate();

	async function signOutUser() {
		// setSession(null);
		const { error } = await supabase.auth.signOut();
        if(error) {
            logger("logout", props.usermail, "error logging out", "error");
        } else {
            logger("logout", props.usermail, "logging out", "info");
        }
		sessionStorage.removeItem("token");
		navigate("/login");
	}

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">NewsGenie</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="/create">Write Article</Nav.Link>
						<Nav.Link href="#rankings">Rankings</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link href="/profile">Profile</Nav.Link>
						<Nav.Link to={"/login"} onClick={signOutUser}>
							Sign Out
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBar;
