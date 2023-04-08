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
        pathname: "/article/" + newsArticle.id, 
        state: {user}
      };

    

	return (
		<Card style={{ width: "18rem" }} className="card-background">
			<Card.Body>
				<Card.Title>{newsArticle.headline}</Card.Title> 
                <Badge bg="secondary">{newsArticle.genre}</Badge>
				<Card.Text>
					{newsArticle.description.substr(0,33)} .....
				</Card.Text>
				<Button variant="primary">
                    <Link to={{pathname: articlePath.pathname, state:{user}}}>
                        <i className="material-icons">Read article</i>
                    </Link>
                </Button>
                
			</Card.Body>
		</Card>
	);
};


export default NewsCard;
