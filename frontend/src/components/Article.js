import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Badge } from "react-bootstrap";
import NavBar from "./Navbar";
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
		fetch("http://localhost:8000/get_article", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                id: id
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				const articletemp = response.article;
                setArticle(articletemp);
			})
			.catch((err) => {
                console.error(err);                
			});
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
							<h2>by {article.user.email}</h2>
							<h3>Rating: {article.rating}</h3>
							<Badge className="mb-5" bg="secondary">
								{article.genre}
							</Badge>
							<p className="mb-5">{article.description}</p>
							<SummarizeNews article={article} token={props.token}></SummarizeNews>
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
