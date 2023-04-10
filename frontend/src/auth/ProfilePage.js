import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GenreBar from "../components/GenreBar";



const ProfilePage = (props) => {
	const [fetchError, setFetchError] = useState(null);
	const [visits, setVisits] = useState(null);
	const [genreHist, setGenreHist] = useState(null);

	useEffect(() => {
		const fetchVisits = async () => {
			const { data, error } = await supabase
				.from("visits")
				.select(
					`
                id,
                created_at,
                news (id, genre)
            `
				)
				.eq("user_id", props.token.user.id);

			if (error) {
				setFetchError("Could not fetch the news articles");
				setVisits(null);
			}
			if (data) {
				setVisits(data);
				setFetchError(null);
				console.log(data);

				const genreMap = new Map();
				for (let i = 0; i < data.length; i++) {
					if (genreMap.has(data[i].news.genre)) {
						genreMap.set(
							data[i].news.genre,
							genreMap.get(data[i].news.genre) + 1
						);
					} else {
						genreMap.set(data[i].news.genre, 1);
					}
				}
				console.log(
					genreMap,
					Array.from(genreMap.keys()),
					Array.from(genreMap.values())
				);
				setGenreHist(genreMap);
			}
		};

		fetchVisits();
	}, []);

	return (
		<div className="App">
			<div className="App-header">
				<Container>
					<h1>{props.token.user.email}</h1>
                    <h2>History</h2>
					{visits &&
						visits.map((visit) => {
							return (
								<div key={visit.id}>
									<p>
										{visit.news.id} - {visit.news.genre} at{" "}
										{visit.created_at}
									</p>
								</div>
							);
						})}

                    <h2>Graphs</h2>
                    {genreHist && <GenreBar genreHist={genreHist}></GenreBar>}
				</Container>
			</div>
		</div>
	);
};

export default ProfilePage;
