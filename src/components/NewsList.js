import React, { useState, useEffect } from "react";

import supabase from "../config/supabaseClient";
import NewsCard from "./NewsCard";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const NewsList = (props) => {
	const [fetchError, setFetchError] = useState(null);
	const [news, setNews] = useState(null);

	console.log("props: user: " + props.user.id);

	useEffect(() => {
		const fetchNews = async () => {
			const { data, error } = await supabase.from("news").select();

			if (error) {
				setFetchError("Could not fetch the news articles");
				setNews(null);
			}
			if (data) {
				setNews(data);
				setFetchError(null);
			}
		};

		fetchNews();
	}, []);

	return (
		<div className="page home">
			{fetchError && <p>{fetchError}</p>}
			{news && (
				<div className="news">
					<div className="news-grid">
						<Row>
							{news.map((newsArticle) => (
								<Col md={3} className="mb-2" key={newsArticle.id}>
									<NewsCard className="h-100 card-height"
										key={newsArticle.id}
										newsArticle={newsArticle}
									></NewsCard>
								</Col>
							))}
						</Row>
					</div>
				</div>
			)}
		</div>
	);
};

export default NewsList;
