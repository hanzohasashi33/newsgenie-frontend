import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = (props) => {
	const [fetchError, setFetchError] = useState(null);
	const [visits, setVisits] = useState(null);

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
				// console.log(data);
			}
		};

		fetchVisits();
	}, []);

	return (
		<div className="App">
			<div className="App-header">
				<Container>
					<h1>{props.token.user.email}</h1>
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
				</Container>
			</div>
		</div>
	);
};

export default ProfilePage;
