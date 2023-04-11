import React, { useState } from "react";

import Button from "react-bootstrap/Button";

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
				setSummarizedArticle(response[0]);
			})
			.catch((err) => {
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
