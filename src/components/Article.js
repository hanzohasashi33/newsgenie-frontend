import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Badge } from "react-bootstrap";

import supabase from "../config/supabaseClient";
import adminAuthClient from "../config/supabaseAdminAuth";

const Article = (props) => {
	const [article, setArticle] = useState(null);
    const [articleUser, setArticleUser] = useState(null)

	const { id } = useParams();
	console.log(id, props);
	const navigate = useNavigate();
    

    const fetchArticle = async () => {
        const { data, error } = await supabase
            .from("news")
            .select()
            .eq("id", id)
            .single();

        if (error) {
            console.log(error);
            navigate("/", { replace: true });
        }

        if (data) {
            setArticle(data);
            console.log(data);

            const {userData, error} = await adminAuthClient.getUserById(article.user);
            console.log(userData);
        }
    };


	useEffect(() => {
		fetchArticle();
	}, [id, navigate]);

	

	return (
		<div className="App">
			<div className="App-header">
				{article && (
					<Container>
						<h1>{article.headline}</h1>
						<h2>by {article.user}</h2>
                        <h3>Rating: {article.rating}</h3>
                        <Badge className="mb-5" bg="secondary">{article.genre}</Badge>
						<p>{article.description}</p>
					</Container>
				)}
			</div>
		</div>
	);
};

export default Article;
