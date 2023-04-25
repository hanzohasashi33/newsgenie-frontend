import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";




const PostComment = (props) => {
	const [comment, setComment] = useState("");
	const [formError, setFormError] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!comment) {
			setFormError("please fill in all the fields correctly");
			alert("Enter the comments properly");
			return;
		}

		// console.log(comment);
		setComment("");
		setFormError(null);

        // console.log(props.article.id, props.token.user.id);
        const articleId = props.article._id;
        const userId = props.token.user.id;
        const userEmail = props.token.user.email;


        fetch("http://localhost:8000/create_comment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                user: {id: userId, email: userEmail},
                comment: comment,
                article_id: articleId,
                created_at: new Date()
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
                setFormError(null);
                window.location.reload();
			})
			.catch((err) => {
                console.error(err);   
                setFormError("Please fill in all the fields correctly");             
			});
	};

	return (
		<Container>
			<h1>Add New Comment</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Row>
                        <Col md={4}></Col>
						<Col md={4} className="auto">
							<Form.Label htmlFor="comment">Comment:</Form.Label>
							<Form.Control
								type="text"
								id="comment"
								value={comment}
								placeholder="Enter comment"
								onChange={(e) => setComment(e.target.value)}
							></Form.Control>
						</Col>
					</Row>
				</Form.Group>

				<Button variant="primary" className="primary mb-5" type="submit">
					Add Comment
				</Button>
				{formError && <p>{formError}</p>}
			</Form>
		</Container>
	);
};

export default PostComment;
