import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import supabase from "../config/supabaseClient";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginPage.css";

const Login = ({ setToken }) => {
	let navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	function handleChange(event) {
		setFormData((prevFormData) => {
			return {
				...prevFormData,
				[event.target.name]: event.target.value,
			};
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: formData.email,
				password: formData.password,
			});

			if (error) throw error;
			console.log(data);
			setToken(data);
			navigate("/");

			//   alert('Check your email for verification link')
		} catch (error) {
			alert(error);
		}
	}

	return (
		<div className="App">
			<div className="App-header login-dark">
				<Form onSubmit={handleSubmit}>
					<h2 className="sr-only">Login Form</h2>
					<div className="illustration">
						<i className="icon ion-ios-locked-outline"></i>
					</div>
					<Form.Group className="mb-3">
						<Form.Label>Email:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Email"
							name="email"
							onChange={handleChange}
						></Form.Control>
					</Form.Group>

					<br></br>

					<Form.Group className="mb-3">
						<Form.Label>Password: </Form.Label>
						<Form.Control
							placeholder="Enter password"
							name="password"
							type="password"
							// value={formData.password}
							onChange={handleChange}
						></Form.Control>
					</Form.Group>

					<Button variant="primary" className="primary" type="submit">
						Login
					</Button>
					<p>
						Don't have an account? <Link to="/signup">Sign Up</Link>
					</p>
				</Form>
			</div>
		</div>
	);
};

export default Login;
