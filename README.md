# Bon Voyage

Bon Voyage is a beginner-friendly full-stack travel discovery website. It helps travellers explore destinations, hotels, restaurants and sightseeing places, search the catalogue, and share travel reviews.

## Stack
- HTML5, CSS3, Vanilla JavaScript
- Node.js + Express.js
- Supabase PostgreSQL
- Git/GitHub

## Structure
```text
bon-voyage/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/
│   ├── server.js
│   ├── supabase.js
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   └── .gitignore
├── database/schema.sql
├── .gitignore
└── README.md
```

## Prerequisites
Install Node.js LTS, Git and VS Code.

## Supabase setup
1. Create a Supabase project.
2. Open SQL Editor.
3. Paste `database/schema.sql` and run it.
4. In Supabase project settings, copy the project URL and server-side service role key.
5. Put them in `backend/.env`.
6. Never put the service-role key in frontend code or GitHub.

## Install
Open a terminal in `bon-voyage/backend`:
```bash
npm install
```

## Run
From `backend`:
```bash
npm start
```
Open `http://localhost:3000`.

Health check:
`GET /api/health`

## API
- `GET /api/health` — server health check.
- `GET /api/places` — list places.
- `GET /api/places?search=goa` — search places.
- `POST /api/reviews` — create a review. Body: `{name,title,content,rating}`.

## Testing
1. Open the home page.
2. Confirm sample places load.
3. Search for `Hyderabad`.
4. Submit a valid review.
5. Submit an invalid rating and confirm validation.
6. Open `/api/health`.
7. Test on mobile width using browser developer tools.

## Troubleshooting
- `Missing Supabase environment variables`: check `backend/.env`.
- `relation "places" does not exist`: run `database/schema.sql`.
- Port busy: change `PORT` in `.env`.
- Page not loading: confirm `npm start` is running and visit `http://localhost:3000`.

## GitHub
From the root:
```bash
git init
git status
git add .
git status
git commit -m "Build project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
Before pushing, verify `.env` and `node_modules` are ignored. If a secret was ever committed, rotate it immediately.

## Security
The Supabase service-role key is used only by the server. Backend validation is applied to review submissions. This MVP does not include user accounts or private user dashboards, so authentication is intentionally excluded.

## Future improvements
User authentication, user profiles, image uploads, destination detail pages, favourites, trip planning, and admin moderation can be added later.
