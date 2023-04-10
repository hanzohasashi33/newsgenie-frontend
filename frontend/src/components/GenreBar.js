import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./GenreBar.css";


ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: true,
			text: "Chart.js Bar Chart",
		},
	},
};

const GenreBar = (props) => {
	const labels = Array.from(props.genreHist.keys());
	const probData = {
		labels: labels,
		datasets: [
			{
				label: "List of Genres Visited",
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				data: Array.from(props.genreHist.values()),
			},
		],
	};

	return <div className="genre-bar"><Bar data={probData} /></div>;
};

export default GenreBar;
