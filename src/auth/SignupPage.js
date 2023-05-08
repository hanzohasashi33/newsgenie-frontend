import React, { useState } from "react";
import { Link } from "react-router-dom";

import supabase from "../config/supabaseClient";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignupPage.css";

const SignupPage = () => {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
		password: "",
	});

	// console.log(formData);

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
			const { data, error } = await supabase.auth.signUp({
				email: formData.email,
				password: formData.password,
				options: {
					data: {
						full_name: formData.fullName,
					},
				},
			});
			if (error) throw error;
			// alert("Check your email for verification link");
			// console.log(data);
			if (data) {
				// console.log(data.user.id);
				// console.log(formData.fullName);
				const { data2, error2 } = await supabase
					.from("users")
					.update({ first_name: formData.fullName })
					.eq("id", data.user.id);
				setFormData((prevFormData) => {
					return {
						fullName: "",
						email: "",
						password: "",
					};
				});
			}
		} catch (error) {
			alert(error);
		}
	}

	return (
		<div className="App">
			<div className="App-header login-dark">
				<Form onSubmit={handleSubmit}>
					<h2 className="sr-only">Signup Form</h2>
					<div className="illustration">
						<i className="icon ion-ios-locked-outline"></i>
					</div>

					<Form.Group className="mb-3">
						<Form.Label>Fullname:</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Full Name"
							name="fullName"
							onChange={handleChange}
						></Form.Control>
					</Form.Group>

					<br></br>

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
						Signup
					</Button>

					<br></br>
					<br></br>

					<p>
						Already have an account?<Link to="/login">Login</Link>
					</p>
				</Form>
			</div>
		</div>
	);
};

export default SignupPage;
