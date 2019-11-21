# Travelogue

![Screenshot of Travelogue Landing Page](Planning/Screenshots/travelogue_login.png)

## About Travelogue

As a child of parents from two different countries, I was no stranger to travel from an early age. By the time I was 19, my passport had stamps from Turkey, South Korea, France, Switzerland, Ireland, and the UK.

For the past three months, as I completed a remote software engineering bootcamp, I was tied to my home, my room, and my desk with its double monitors. And yet, even though you could usually find me in a very narrow geographic radius, I was on a journey that broadened my horizons in so many ways.

Leaving your old job and career to pursue something new is a vulnerable and hopeful act, just like travel. So when it came time to pick my capstone project, I decided to blend these two ideas and create a software application about travel.

[Travelogue](https://esin87.github.io/travelogue/) is a place for users to tell their travel stories. Whether you're a cosmopolitan or a first-time traveler, no matter where the journey takes you, this is a place to record what happened, who you met, where you stayed, what you ate. If it made an impact on your travels, you'll want to remember the highlights of your journey.

Travelogue allows users to create travel diary entries that include the entry title, a photo URL, place name (to populate a Google Map), and notes on the experience.

## Travelogue User Stories

-   **What does the Travelogue user want?** The Travelogue user wants a place to document and remember the details of their journeys, whether for the purposes of future visits, social sharing and recommendations, or just to preserve the memory.
-   **How will the application satisfy the user?** The Travelogue user will be satisfied if they can keep a travel diary that records their journeys, with entries detailing specific aspects of an experience, including dates, notes, maps, and pictures. The user will also want to be able to read, update, and delete travel diary entries.

## Wireframing & Planning

![Screenshot of home page wireframe](Planning/TRAVELOGUE_WIREFRAMES/User_Home.png)

![Screenshot of Travelogue Home page](Planning/Screenshots/travelogue_home.png)

I used Balsamiq to create wire frames for the main page views. As a backwards-planner, I find it essential to have the end goal concretely in mind before beginning a project. To-do lists are one of my other great loves, and my [Trello board](https://trello.com/b/jcfMg5Mh/travelogue) helped keep me organized throughout this process.

![Screenshot of req-res cycles](Planning/Travelogue_Planning_Slides/Travelogue_Planning_Slides.014.jpeg)

Additionally, this was my first time building an application with a React frontend and a Django backend, so I took some time to think about how the two pieces would be communicating with each other. My planning directory is available in this repo for any further insights into my planning process.

## Technical Specifications

This git repo hosts the backend for my Travelogue application. The frontend was built with React and deployed via GitHub Pages, and the backend is built with a Django REST framework using a PostgreSQL database, deployed via Heroku. I chose React, a frontend JSX framework, because it creates a single-page application with dynamic client-side component rendering, creating a seamless user experience and cutting down on server wait time.

Special features include a Google Maps component that calls both the Google Maps and the Google Geocode APIs in the Entry Detail view as shown below.

![Screenshot of Entry Detail page](Planning/Screenshots/travelogue_entrydetail.png)

Users who log in or sign up have full CRUD access to their entries with basic form validation in place for the edit and create views.

![Screenshot of create page](Planning/Screenshots/travelogue_create.png)

## Code Sample

A frontend code snippet I'm proud of is figuring out how to reverse-geocode to render a Google Map using the Google Maps JS API, Google Geocode API, and the Google-Map-React npm. I didn't want the user to have to find the geographic coordinates associated with their entry, so I reverse-looked up the coordinates from the address location provided, then plugged those coordinates into the center property of the Google Map component to render that location. Thank you to the creators of the Google-Map-React [package](https://github.com/google-map-react/google-map-react), which made this process so much easier! (N.b., this feature is currently disabled due an API key security issue.)

```javascript
	componentDidMount() {
		if (this.state.placeName) {
			const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.placeName}&key=${this.devKey}`;
			Axios.get(url)
				.then(response => {
					this.setState({
						coordinates: response.data.results[0].geometry.location
					});
				})
				.catch(err => console.error(err));
		}
	}

	render() {
		return (
			<div id="google-map" style={{ height: '200px', width: '100%' }}>
				{this.state.coordinates && (
					<GoogleMapReact
						bootstrapURLKeys={{
							key: this.devKey
						}}
						center={this.state.coordinates}
						zoom={14}
						yesIWantToUseGoogleMapApiInternals
						size={{
							width: '100%',
							height: '100'
						}}></GoogleMapReact>
				)}
			</div>
		);
	}
```

## Features

Travelogue is currently at the Silver Level:

-   **Bronze/Minimum Viable Product:**

    -   [x] Backend built with Django and deployed via Heroku
    -   [x] Frontend built with React and deployed via GitHub Pages
    -   [x] Homepage with clickable array of entries
    -   [x] Create, read, update, and delete functionality on entries

-   **Silver:**

    -   [x] Interactive map showcasing entry location through Google Maps API and Google Geocode APIs (this feature is currently disabled due to an API key issue)
    -   [x] User Model with JWT Authentication on the backend for all data create, update and destroy routes, integrated into the frontend
    -   [x] Form validation in React for create/edit functions
    -   [ ] Mobile responsive design

*   **Gold:**

    -   [ ] Search entries by title and/or keywords
    -   [ ] User image file uploads (instead of URL)
    -   [ ] Social O-Auth with social share feature

-   **Platinum:**
    -   [ ] Users can see, like and comment on other user's entries

## Installation Instructions

If you are interested in downloading the code for either stack:

-   **Frontend:** Run npm install in the project directory via CLI to download required dependencies such as React-Router and Google-Map-React. Then npm run start will start the application on localhost:3000.

-   **Backend:** Run pipenv install in the virtual environment of the project directory CLI to download required dependencies such as Django, Django-Rest-Framework and JWT-Authentication. Then running python3 manage.py runserver will start a local version of the backend on port 8000.

## Unsolved Problems and Future Directions

My biggest unsolved problem is that refreshing my React frontend sometimes breaks the application. I also had to use some hacks to get the user home page to replace the landing login/signup page, and I would refactor the component hierarchy to make it less hack-y and more React-y. Additionally sometimes the JWT expires but does not fully log out the user. The page gets stuck on the home page, and the user has to manually take the "/home" path out of the URL to be able to reach the sign in page again.

In terms of future directions: I plan to build out the app further, improving the authentication process, then prioritizing mobile responsiveness and social responsiveness, to allow users to create entries on the go and share their stories with their communities.

## Useful Resources & Gratitude

I got to learn a lot of new technologies in the course of this project, but the good news is I didn't have to learn it alone because of the countless tutorials, blog posts, and Stack Overflow questions freely available on the Internet. Thank you to all the developers who blogged about their experiences learning new technologies and helped pave the way for those coming after them.

A couple great tutorials stood out: Thanks to Dakota Lillie over at Medium for posting a great [tutorial](https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a) on JWT Authentication with Django and React. Thank you also to Eleanor Stribling for the best Django to Heroku with PostgreSQL [blog post](https://medium.com/agatha-codes/9-straightforward-steps-for-deploying-your-django-app-with-heroku-82b952652fb4), which saved me from hours of debugging.

Thank you to my wonderful instructors and classmates at General Assembly. It's been an incredible ride, and this is just the beginning. &hearts;

Please drop an issue if you have any feedback or suggestions!
