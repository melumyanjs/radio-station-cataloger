const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Сервис радиостанций',
			version: '1.0.0',
			description: 'API сервиса сбора и анализа данных о радиостанциях',
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT}`,
			},
		],
	},
	apis: ['./routes/*.js'],
};

module.exports = options
