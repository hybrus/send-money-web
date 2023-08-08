Send Money Web
==============

This is a React web application for the Send Money application, which allows users to send money to other users or banks using different providers. The frontend communicates with the Laravel backend through a RESTful API.

### Installation

1. Clone the repository to your local machine:

   `git clone https://github.com/hybrus/send-money-web.git`  `cd send-money-web`
3. Install the project dependencies:

   `npm install`

### Configuration

1. Copy the `.env.example` file to `.env`:

   `cp .env.example .env`
3. Open the `.env` file in a text editor and set the `REACT_APP_API_BASE_URL` variable to the URL of your Laravel backend API. For example:

   `REACT_APP_API_BASE_URL=http://localhost:8000/api`

   Make sure to replace `http://localhost:8000/api` with the actual URL of your Laravel app's API.

### Running the App

To run the React app, use the following command:

`npm start`

This will start the development server and open the app in your default web browser.
