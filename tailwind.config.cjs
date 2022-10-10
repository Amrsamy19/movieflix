/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"light-purple": "#7671F0",
			},
			fontFamily: {
				Roboto: ["Roboto", "sans-serif"],
			},
		},
	},
	plugins: [],
};
