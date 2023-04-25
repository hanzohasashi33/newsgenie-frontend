import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NewsList = (props) => {
	const [fetchError, setFetchError] = useState(null);
	const [news, setNews] = useState(null);

	// console.log("props: user: " + props.user.id);

	useEffect(() => {
		const fetchNews = async () => {
			fetch('http://localhost:8000/get_articles').then(data => {
                return data.json();
            })
            .then(articles => {
                console.log(articles);
                setNews(articles);
            }).catch(err => {
                console.error(err);
            })
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
								<Col
									md={3}
									className="mb-2 wrapper"
									key={newsArticle._id}
								>
									<NewsCard
										className="h-100 card-height d-flex flex-fill"
										key={newsArticle._id}
										newsArticle={newsArticle}
										user={props.user}
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
