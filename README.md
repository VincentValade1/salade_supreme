# Salade Suprême

Official website for the Salade Suprême creative collective. The site presents the collective's projects, services, members, events, residencies, and contact information through a responsive React application.

## Features

- Responsive pages for the collective, projects, services, members, and contact form.
- Project and residency pages backed by local JSON content.
- Capharnaum venue page with:
	- opening countdown;
	- activities and opening hours;
	- interactive event calendar with event details and booking links;
	- OpenStreetMap embed and Google Maps links for directions;
	- nearby public transport information.
- YouTube embeds for selected project and residency content.
- Social links and accessible navigation components.
- Static production output suitable for Netlify or Nginx hosting.

## Tech Stack

- React 18
- Create React App / `react-scripts`
- React Router
- React Icons
- EmailJS for the contact form
- React YouTube for video embeds
- OpenStreetMap for the Capharnaum location map
- Docker and Nginx for containerized production serving

## Requirements

- Node.js 22 or a compatible modern Node.js release
- npm
- Docker and Docker Compose, only if using the container workflow

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd salade_supreme
npm install
```

Start the development server:

```bash
npm start
```

The application is available at [http://localhost:3000](http://localhost:3000). Create React App reloads the page when source files change.

## Environment Variables

The contact form uses EmailJS. For local development, create a `.env.local` file in the project root:

```env
REACT_APP_YOUR_SERVICE_ID=your_emailjs_service_id
REACT_APP_YOUR_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_YOUR_PUBLIC_KEY=your_emailjs_public_key
```

These values are read by `src/pages/Contact.jsx`. Do not commit `.env.local` or production credentials. The Docker configuration falls back to dummy values when these variables are not supplied.

## Available Commands

| Command | Description |
| --- | --- |
| `npm start` | Run the development server on port 3000. |
| `npm test` | Run the Jest and Testing Library test suite in watch mode. |
| `npm run build` | Create an optimized production build in `build/`. |
| `npm run deploy` | Publish the `build/` directory using `gh-pages`. |
| `npm run eject` | Eject from Create React App. This is irreversible and normally unnecessary. |

## Docker

Run the development container with hot reload:

```bash
docker compose up --build app-dev
```

Open [http://localhost:3000](http://localhost:3000).

Build and run the production image:

```bash
docker compose up --build app-prod
```

The production container serves the compiled application through Nginx on port 80. To provide EmailJS values during the production build:

```bash
REACT_APP_YOUR_SERVICE_ID=... \\
REACT_APP_YOUR_TEMPLATE_ID=... \\
REACT_APP_YOUR_PUBLIC_KEY=... \\
docker compose up --build app-prod
```

## Deployment

### Netlify

The repository includes `netlify.toml` with the following build settings:

- Build command: `npm run build`
- Publish directory: `build/`
- SPA fallback: all routes serve `index.html`

Set the three EmailJS environment variables in the Netlify project settings before deploying the contact form.

### GitHub Pages

Build the site and publish the output with:

```bash
npm run build
npm run deploy
```

Configure the repository's GitHub Pages source to use the branch created by `gh-pages`. Because the app uses client-side routing, hosting configuration must preserve the SPA fallback behavior or provide a suitable `404.html` redirect strategy.

## Project Structure

```text
public/              Static assets and web app metadata
src/
	components/        Shared UI components
	datas/             JSON content for pages and Capharnaum events
	pages/             Route-level page components
	router/            React Router configuration
	styles/            Component and page stylesheets
	App.js             Application entry component
	index.js           React DOM entry point
Dockerfile           Development and production container stages

netlify.toml         Netlify build and SPA routing configuration
nginx.conf           Production Nginx configuration
RULES.md             Image/banner dimension guidelines
```

## Content Updates

Most page content is stored in `src/datas/`. The Capharnaum page is assembled from:

- `src/datas/capharnaumPage.json`: venue information, activities, opening hours, coordinates, and opening date.
- `src/datas/capharnaumPlanning.json`: calendar months and activities.
- `src/datas/capharnaumIntervenants.json`: workshop and event speakers.

When changing the Capharnaum location, keep the latitude and longitude in sync with the OpenStreetMap and Google Maps links.

## Main Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/projets` | Projects index |
| `/lieux/capharnaum` | Capharnaum venue |
| `/residences/babayaga` | Babayaga residency |
| `/membres` | Members |
| `/services` | Services |
| `/contact` | Contact form |

Additional project routes are defined in `src/router/Router.jsx`; unknown routes display the 404 page.

## Validation

Before opening a pull request, run:

```bash
npm run build
```

The production build is the quickest way to catch invalid imports, JSX errors, and deployment-time configuration issues.

## External Services and Attribution

- Email delivery is provided by EmailJS.
- Videos are embedded from YouTube.
- The Capharnaum map uses OpenStreetMap data. Map data and tiles remain subject to the [OpenStreetMap Foundation attribution requirements](https://www.openstreetmap.org/copyright).
