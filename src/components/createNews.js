import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./Navbar";


const Create = (props) => {
	const [headline, setHeadline] = useState("");
	const [description, setDescription] = useState("");
	const [genre, setGenre] = useState("");
	const [formError, setFormError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!headline || !description || !genre) {
			setFormError("please fill in all the fields correctly");
			return;
		}

		// console.log(headline, description, genre);
		setHeadline("");
		setDescription("");
		setGenre("");
		setFormError(null);

		const rating = 0;
		const userId = props.token.user.id;
		const userEmail = props.token.user.email;

        fetch("http://localhost:8000/create_article", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                user: {id: userId, email: userEmail},
                headline: headline,
                description: description,
                genre: genre, 
                rating: 0
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
                console.error(err);                
			});
	};

	return (
		<>
			<NavBar usermail={props.token.user.email}></NavBar>
			<div className="App">
				<div className="App-header">
					<>
						<h1>Create new news article</h1>
						<span className="mb-5"></span>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="headline">
									Headline:
								</Form.Label>
								<Form.Control
									size="lg"
									type="text"
									id="headline"
									value={headline}
									placeholder="Enter headline"
									onChange={(e) =>
										setHeadline(e.target.value)
									}
								></Form.Control>
							</Form.Group>

							<br></br>

							<Form.Group className="mb-3">
								<Form.Label htmlFor="description">
									News Article:
								</Form.Label>
								<Form.Control
									as="textarea"
									id="description"
									placeholder="Enter article description"
									size="lg"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								></Form.Control>
							</Form.Group>

							<br></br>

							<Form.Group className="mb-3">
								<Form.Label htmlFor="genre">Genre:</Form.Label>
								<Form.Control
									type="text"
									id="genre"
									placeholder="Enter genre"
									value={genre}
									onChange={(e) => setGenre(e.target.value)}
								></Form.Control>
							</Form.Group>

							<br></br>

							<Button
								variant="primary"
								className="primary"
								type="submit"
							>
								Add news article
							</Button>
							{formError && <p>{formError}</p>}
						</Form>
					</>
				</div>
			</div>
		</>
	);
};

export default Create;
