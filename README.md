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

### Usage

1. Launch the application and log in using the following default credentials:

- Email: wrollen0320@gmail.com
- Password: password

Alternatively, you can use the credentials from the `user` table created and seeded by the `send-money-api`. Choose an email from the table and use the password `password` for authentication.

2. After logging in, you will be redirected to the dashboard page which consists of:
- Account Balance panel
- Transaction History panel
- Action panel

3. Action Panel:
- Send Money to User: Clicking this will open a form. Fill in the recipient's email and the amount. You can cancel or submit the form. The form will only submit if the required fields are filled.
- Send Money to Bank: Choose a provider, bank, and input the amount. Note that changing the provider will reset the bank selection, as different providers support different banks. You can't select a disabled bank or provider.

4. Error Handling:
- If there's an error from the server, it will be displayed above the buttons.
- If there's no error, a success message will appear, and the transaction history and account balance will update.

5. Transaction History:
- If there's more than one transaction history log, a "Show More" button will appear.
- Clicking the "Show More" button will open a modal with a paginated table of history logs.
