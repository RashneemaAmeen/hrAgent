# PeopleHub – HR Portal with AI Assistant

PeopleHub is a modern HR self-service portal featuring an AI-powered HR assistant. Employees can view important HR information, manage leave requests, search the employee directory, read company policies, and ask HR-related questions.

## Live Website

https://hragent123.netlify.app/

## Features

* HR dashboard with leave balance, pending requests, next payday, and announcements
* Leave request submission and tracking
* Searchable employee directory
* Expandable HR policies section
* AI-powered “Ask HR” chat assistant
* Responsive design for desktop and mobile devices
* Secure server-side Azure OpenAI integration

## Technologies Used

* React 18
* Vite
* TypeScript
* React Router
* CSS Modules
* Node.js
* Express
* Azure OpenAI
* Netlify Functions
* Netlify
* GitHub

## How the HR Assistant Works

The employee enters a question in the “Ask HR” chat window.

The frontend sends the question to the `/api/chat` endpoint. During local development, this endpoint is handled by the Express backend. On the deployed website, it is handled by a Netlify Function.

The backend securely connects to Azure OpenAI and returns the generated answer to the chat window.

The Azure API key is stored only in the backend environment variables and is never exposed in the browser.

## HR Portal Sections

### Dashboard

Displays important HR information, including:

* Leave balance
* Pending requests
* Next payday
* Recent company announcements

### Leave

Allows employees to:

* View previous leave requests
* Check leave request status
* Submit a new leave request

### Employees

Provides a searchable employee directory containing:

* Employee name
* Job role
* Department
* Email address

### Policies

Displays company HR policies in an expandable accordion format.

### Ask HR Assistant

The AI assistant answers common questions related to:

* Leave
* Payroll
* Employee benefits
* Workplace policies
* General HR procedures

## Environment Variables

The following environment variables are required:

```env
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=your-deployment-name
```

Never upload the real `.env` file or API key to GitHub.

## Running the Project Locally

### Start the backend

```bash
cd backend
npm install
npm start
```

### Start the frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

## Netlify Deployment

The project is deployed using Netlify.

The Azure OpenAI credentials must be added under:

```text
Netlify → Project configuration → Environment variables
```

Add the following variables:

```text
AZURE_OPENAI_ENDPOINT
AZURE_OPENAI_API_KEY
AZURE_OPENAI_DEPLOYMENT
```

After adding or changing the variables, select:

```text
Deploys → Trigger deploy → Clear cache and deploy site
```

## Security

* Azure credentials are never stored in frontend code.
* The `.env` file is excluded from GitHub.
* Azure OpenAI is called only through the backend or Netlify Function.
* Secrets should never use the `VITE_` prefix because Vite variables can be exposed to the browser.

## Important Note

This project uses sample HR information for demonstration purposes. It is not connected to a real employee database.

AI-generated answers may sometimes be incomplete or inaccurate. Employees should always confirm important information with an authorized HR representative.

## Future Improvements

* Employee login and authentication
* Role-based access for employees, managers, and HR administrators
* Integration with a real HR database
* Manager leave-approval workflow
* Email notifications
* Employee profile management
* HR document uploads
* AI answers grounded in official company policy documents
* Chat history and analytics



