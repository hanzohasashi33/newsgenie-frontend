import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Badge } from "react-bootstrap";
import NavBar from "./Navbar";

import supabase from "../config/supabaseClient";
import adminAuthClient from "../config/supabaseAdminAuth";
import PostComment from "./PostComment";
import CommentsList from "./CommentsList";
import SummarizeNews from "./SummarizeNews";

const Article = (props) => {
	const [article, setArticle] = useState(null);
	const [articleUser, setArticleUser] = useState(null);

	const { id } = useParams();
	// console.log(id, props);
	const navigate = useNavigate();

	const fetchArticle = async () => {
		const { data, error } = await supabase
			.from("news")
			.select(
				`
            id,
            created_at,
            headline,
            genre,
            description,
            rating,
            users (id, email, first_name)
        `
			)
			.eq("id", id)
			.single();

		if (error) {
			console.log(error);
			navigate("/", { replace: true });
		}

		if (data) {
			setArticle(data);
			// console.log(data);

			// const {userData, error} = await adminAuthClient.getUserById(article.user);
			// console.log(userData);
		}
	};

	useEffect(() => {
		fetchArticle();
	}, [id, navigate]);

	return (
		<>
            <NavBar></NavBar>
			<div className="App">
				<div className="App-header">
                    
					{article && (
						<Container>
                            <br></br>
							<h1>{article.headline}</h1>
							<h2>by {article.users.first_name}</h2>
							<h3>Rating: {article.rating}</h3>
							<Badge className="mb-5" bg="secondary">
								{article.genre}
							</Badge>
							<p className="mb-5">{article.description}</p>
							<SummarizeNews article={article}></SummarizeNews>
							<PostComment
								article={article}
								token={props.token}
							></PostComment>
							<CommentsList article={article}></CommentsList>
						</Container>
					)}
				</div>
			</div>
		</>
	);
};

export default Article;
