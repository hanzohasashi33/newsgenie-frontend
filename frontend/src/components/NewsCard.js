import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import "./NewsCard.css";




const NewsCard = (props) => {


    const newsArticle = props.newsArticle;
    const user = props.user;


    const articlePath = { 
        pathname: "/article/" + newsArticle._id, 
        state: {user}
    };

    const handleVisit = async (e) => {
        console.log(e);
        fetch("http://localhost:8000/post_visit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
                user: {id: user.id, email: user.email},
                article: {newsArticle},
                created_at: new Date()
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
			})
			.catch((err) => {
                console.error(err);                
			});
    }

    

	return (
		<Card style={{ width: "18rem" }} className={`card-background ${props.className}`}>
			<Card.Body>
				<Card.Title>{newsArticle.headline}</Card.Title> 
                <Badge bg="secondary">{newsArticle.genre}</Badge>
				<Card.Text>
					{newsArticle.description.substr(0,33)} .....
				</Card.Text>
				<Button type="submit" onClick={handleVisit} variant="primary">
                    <Link to={{pathname: articlePath.pathname, state:{user}}}>
                        <i className="material-icons">Read article</i>
                    </Link>
                </Button>
                
			</Card.Body>
		</Card>
	);
};


export default NewsCard;
