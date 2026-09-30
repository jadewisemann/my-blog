# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Deployment is automated with GitHub Actions. Every push to the `master` branch triggers the workflow at `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages at <https://jadewisemann.github.io/my-blog/>.

To enable this, set the repository's **Settings → Pages → Build and deployment → Source** to **GitHub Actions** (one-time setup). You can also trigger a deployment manually from the Actions tab via **Run workflow** (`workflow_dispatch`).
