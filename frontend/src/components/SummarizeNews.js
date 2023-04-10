import Button from "react-bootstrap/Button";

const SummarizeNews = (props) => {
	// creates entity
	// fetch("http://localhost:8000/summary", {
	// 	method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
	// 	body: JSON.stringify({
	// 		newsArticle: "Hi this is prasanna"
	// 	}),
	// })
	// 	.then((response) => response.json())
	// 	.then((response) => {
	// 		console.log(response);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});

	return <Button type="submit">Summarize News Article</Button>;
};

export default SummarizeNews;
