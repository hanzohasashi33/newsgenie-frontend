import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotLoggedInPage = () => {

    const navigate = useNavigate();

	return (
		<div className="App">
			<header className="App-header">
				<h1>User is not Logged in</h1>
				<Button onClick={() => navigate("/login")}>
					Go back To login page
				</Button>
			</header>
		</div>
	);
};


export default NotLoggedInPage;
