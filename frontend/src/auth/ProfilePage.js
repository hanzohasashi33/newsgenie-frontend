import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GenreBar from "../components/GenreBar";
import NavBar from "../components/Navbar";


const ProfilePage = (props) => {
	const [fetchError, setFetchError] = useState(null);
	const [visits, setVisits] = useState(null);
	const [genreHist, setGenreHist] = useState(null);

	useEffect(() => {
		const fetchVisits = async () => {

            fetch("http://localhost:8000/get_visits", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                userId: props.token.user.id
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				// console.log(response);

                data = data.visits;

                setVisits(data);
				setFetchError(null);
				// console.log(data);

            

				const genreMap = new Map();
				for (let i = 0; i < data.length; i++) {
					if (genreMap.has(data[i].article.newsArticle.genre)) {
						genreMap.set(
							data[i].article.newsArticle.genre,
							genreMap.get(data[i].article.newsArticle.genre) + 1
						);
					} else {
						genreMap.set(data[i].article.newsArticle.genre, 1);
					}
				}
				console.log(
					genreMap,
					Array.from(genreMap.keys()),
					Array.from(genreMap.values())
				);
				setGenreHist(genreMap);
			})
			.catch((err) => {
                console.error(err);   
                setFetchError("Could not fetch the news articles");
				setVisits(null);             
			});
		};

		fetchVisits();
	}, []);

	return (
		<>
            <NavBar></NavBar>
			<div className="App">
				<div className="App-header">
					<Container>
						<h1>{props.token.user.email}</h1>
						<h2>History</h2>
						{visits &&
							visits.map((visit) => {
								return (
									<div key={visit._id}>
										<p>
											{visit.article.newsArticle._id} - {visit.article.newsArticle.genre}{" "}
											at {visit.created_at}
										</p>
									</div>
								);
							})}

						<h2>Graphs</h2>
						{genreHist && (
							<GenreBar genreHist={genreHist}></GenreBar>
						)}
					</Container>
				</div>
			</div>
		</>
	);
};

export default ProfilePage;
