import React, {useState, useEffect} from "react";
import { Container } from "react-bootstrap";



const CommentsList = (props) => {
    const [fetchError, setFetchError] = useState(null);
	const [comments, setComments] = useState(null);

    useEffect(() => {
		const fetchComments = async () => {
            console.log(props.article._id);

            fetch("http://localhost:8000/get_comments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                id: props.article._id
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				// console.log(response);
                setComments(response.comments);
                setFetchError(null);
			})
			.catch((err) => {
                console.error(err);   
                setFetchError("Could not fetch the comments");             
			});
		};

		fetchComments();
	}, []);

    return (
        <Container>
            {comments && comments.map((comment) => {
                return (
                    <div key={comment._id}>
                        <p>{comment.comment} by {comment.user.email}</p>
                        <hr></hr>
                    </div>
                )
            })}
        </Container>
    )
}


export default CommentsList;