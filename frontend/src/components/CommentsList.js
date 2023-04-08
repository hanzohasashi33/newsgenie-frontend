import React, {useState, useEffect} from "react";

import supabase from "../config/supabaseClient";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";



const CommentsList = (props) => {
    const [fetchError, setFetchError] = useState(null);
	const [comments, setComments] = useState(null);

    useEffect(() => {
		const fetchComments = async () => {
            console.log(props.article.id);
			const { data, error } = await supabase.from("comments").select().eq("article_id", props.article.id);

			if (error) {   
				setFetchError("Could not fetch the news articles");
				setComments(null);
			}
			if (data) {
				setComments(data);
				setFetchError(null);
                console.log(data);
			}
		};

		fetchComments();
	}, []);

    return (
        <Container>
            {comments && comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <p>{comment.comment} by {comment.author_id}</p>
                        <hr></hr>
                    </div>
                )
            })}
        </Container>
    )
}


export default CommentsList;