import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import logger from "../config/logger";


const SummarizeNews = (props) => {
	const [summarizedArticle, setSummarizedArticle] = useState(null);

	const summarizeArticle = () => {
		fetch("http://localhost:8000/summary", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				newsArticle: props.article.description,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				// console.log(response);
                logger("summarize_article", props.token.user.email, "summarized article", "info")
				setSummarizedArticle(response[0]);
			})
			.catch((err) => {
                logger("summarize_article", props.token.user.email, "error summarizing article", "error")
				console.log(err);
			});
	};

	// creates entity

	return (
		<div>
			<Button type="submit" onClick={summarizeArticle}>
				Summarize News Article
			</Button>
            {summarizedArticle && <p>{summarizedArticle}</p>}
		</div>
	);
};

export default SummarizeNews;
