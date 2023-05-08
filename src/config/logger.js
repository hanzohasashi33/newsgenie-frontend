const logger = (action, user, message, level) => {
	fetch("http://localhost:8000/log", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			action: action,
            user: user, 
            message: message,
            level: level
		}),
	})
};

export default logger;
