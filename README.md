# PeopleHub — HR Portal

A complete React 18 + Vite + TypeScript HR portal with four HR workflows and a floating Azure OpenAI assistant. The frontend uses plain CSS modules and local JSON mock data. The backend can run locally with Express or serverlessly as a Netlify Function.

## File tree

```text
.
├── .env.example
├── .gitignore
├── README.md
├── netlify.toml
├── package.json
├── backend
│   ├── package.json
│   ├── tsconfig.json
│   └── src
│       ├── chat.ts
│       └── server.ts
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   └── src
│       ├── App.tsx
│       ├── main.tsx
│       ├── components
│       │   ├── ChatWidget.module.css
│       │   ├── ChatWidget.tsx
│       │   ├── Layout.module.css
│       │   └── Layout.tsx
│       ├── data
│       │   ├── announcements.json
│       │   ├── employees.json
│       │   ├── leaveRequests.json
│       │   └── policies.json
│       ├── pages
│       │   ├── Dashboard.tsx
│       │   ├── Employees.tsx
│       │   ├── Leave.tsx
│       │   ├── Pages.module.css
│       │   └── Policies.tsx
│       └── styles
│           └── global.css
└── netlify
    └── functions
        └── chat.ts
```

## Local run

Prerequisites: Node.js 18 or newer and npm.

1. Copy `.env.example` to `.env` at the project root.
2. Set the three Azure values in `.env`:

```env
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=gpt-4o
```

3. Install dependencies:

```bash
npm install
npm run install:all
```

4. Start the Express API and Vite app together:

```bash
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to Express at `http://localhost:3001`. If the Azure variables are missing, the chat returns a canned demo response.

For a production frontend build:

```bash
npm run build
```

To start only the backend:

```bash
npm run start
```

## GitHub setup

1. Create a new empty repository on GitHub, for example `peoplehub-hr-portal`.
2. From this project directory, run:

```bash
git init
git add .
git commit -m "Build PeopleHub HR portal"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/peoplehub-hr-portal.git
git push -u origin main
```

The `.gitignore` excludes `node_modules`, `.env`, and build output. Never commit the real Azure API key.

## Netlify deployment

1. Push the project to GitHub using the steps above.
2. In Netlify, choose **Add new project** and **Import an existing project**, then select the GitHub repository.
3. Netlify reads `netlify.toml`: it installs the frontend dependencies, runs the Vite build, publishes `frontend/dist`, and loads functions from `netlify/functions`.
4. In Netlify, open **Project configuration → Environment variables** and add:
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_API_KEY`
   - `AZURE_OPENAI_DEPLOYMENT`
5. Deploy the site. The `/api/chat` redirect invokes `netlify/functions/chat`, so the API key stays server-side.

The function is also available directly at `/.netlify/functions/chat`. Netlify automatically supplies the function runtime and the configured environment variables.

## Precision controls to verify first

1. Header title is exactly `PeopleHub — HR Portal`.
2. Chat launcher is exactly `Ask HR`, and the first assistant message is exactly `Hi, I'm your HR assistant. Ask me about leave, payroll, or policies.`
3. The portal has exactly four sidebar pages: Dashboard, Leave, Employees, and Policies.
4. CSS contains the required brand values: `#1f3a5f`, `#2e8b76`, `#f5f7fa`, and `#1a1a1a`.
5. `/api/chat` accepts `{ message, history }`, and missing Azure variables trigger the demo fallback.
6. Netlify environment variables are configured under **Project configuration → Environment variables**, never committed to GitHub.
