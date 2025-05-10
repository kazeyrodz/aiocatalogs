<div align="center"><img src="https://i.imgur.com/79eCVoA.png" alt="AIO Catalogs Logo"></div>
<h1 align="center" id="title">AIOCatalogs</h1>
<div align="center">

![AIOCatalogs Logo](https://img.shields.io/badge/AIOCatalogs-Addon-blue?style=for-the-badge)
![Version](https://img.shields.io/github/v/release/pantelx/aiocatalogs?style=for-the-badge&label=Version)
![Checks](https://img.shields.io/github/check-runs/pantelx/aiocatalogs/main?style=for-the-badge&label=Checks)

[![Discord](https://img.shields.io/badge/Discord-Join%20our%20Community-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/Ma4SnagqwE)
[![Buy Me A Coffee](https://img.shields.io/badge/Support-Buy%20Me%20A%20Coffee-orange?style=for-the-badge)](https://buymeacoffee.com/pantel)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-ea4aaa?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sponsors/pantelx)

</div>

> **Note**
>
> AIOCatalogs is an open-source addon that combines multiple catalog addons into a single one. It offers enhanced performance, user-friendly configuration, and supports various platforms like Stremio, Omni, Vidi, Fusion and more. Developed for maximum flexibility and compatibility.

## 🔗 Quick Links

**Public Instance:** [https://aiocatalogs.jqrw92fchz.workers.dev/configure](https://aiocatalogs.jqrw92fchz.workers.dev/configure) or [https://aio.pantelx.com/configure](https://aio.pantelx.com/configure)

**Discord Server:** [Join our Discord for community discussions and support](https://discord.gg/Ma4SnagqwE)

**Self-Hosting:** [Check out the Self-Hosting Guide](#%EF%B8%8F-self-hosting-guide)

**Support the Project:** [Buy Me A Coffee](https://www.buymeacoffee.com/pantel) or [Become a GitHub Sponsor](https://github.com/sponsors/pantelx)

---

## ✨ Key Features

### 🚀 Performance Optimizations

- Multi-level caching system to minimize API calls
- D1 database integration for persistent storage (Cloudflare only)
- Cloudflare Workers for serverless architecture and global edge network
- Express.js server for local development and Docker deployment

### 🔍 Enhanced Catalog Management

- Combine multiple catalog addons into a single addon
- User-friendly configuration via web interface
- Dynamic loading and caching of catalog data
- Intelligent request routing to the appropriate source addons

### 🌐 Cross-Platform Support

- Seamless integration with various streaming platforms
- Optimized for multi platform compatibility
- Unified API for consistent results

#### ✅ **Fully Supported & Tested:**

- This addon should work on all platforms that support the addon manifest.

<!-- #### ⚠️ **Partially Supported or Untested:**

- Other Stremio-based applications
- Mobile clients with limitations -->

---

## 🛠️ Self-Hosting Guide

For optimal performance and privacy, you can self-host the addon. We offer multiple deployment options:

> **Tip**
>
> Consider adding your own configurations for enhanced functionality

### 🐳 Docker Compose Deployment

Deploy using Docker Compose for a containerized solution:

```bash
# Clone the repository
$ git clone https://github.com/pantelx/aiocatalogs.git && cd aiocatalogs
# Start Docker Compose
$ docker-compose up -d
```

The docker-compose.yml file is configured to use the pre-built image by default, making it the easiest deployment option. To modify the configuration, edit the docker-compose.yml file before running `docker-compose up -d`.

Verify the installation by visiting `http://localhost:8787/` in your browser. To customize the port or other settings, edit the Docker Compose file before starting the container.

> **Note**
>
> The Docker image is automatically built and published to GitHub Container Registry (ghcr.io) for each push to the main branch and for each new version tag.

### 📦 Source Installation

For direct source installation, ensure you have:

- Node.js 20 or higher
- NPM 7 or higher

```bash
# Verify Node.js version
$ node -v
# Verify NPM version
$ npm -v
# Clone and install
$ git clone https://github.com/pantelx/aiocatalogs.git && cd aiocatalogs
$ npm i
# Start in production mode
$ npm run build
$ npm start
```

Access the addon at `http://localhost:8787/`.

### ☁️ Cloud Deployment

#### Cloudflare Worker

Deploy to Cloudflare's global edge network for optimal performance:

```bash
# Clone the repository
$ git clone https://github.com/pantelx/aiocatalogs.git && cd aiocatalogs
# Install dependencies
$ npm i
# Log in to Cloudflare
$ wrangler login
# Create D1 database
$ wrangler d1 create aiocatalogs
# Insert the returned database ID in `wrangler.toml`
# Apply migrations
$ wrangler d1 migrations apply aiocatalogs
# Deploy to Cloudflare
$ npm run deploy:cf
```

---

### 💻 Development Setup

```bash
# Clone the repository
$ git clone https://github.com/pantelx/aiocatalogs.git && cd aiocatalogs
# Install dependencies
$ npm i
# Build the addon
$ npm run build
```

Development modes:

```bash
# Addon development
$ npm run dev
# Cloudflare worker development
$ npm run dev:cf
```

### 📝 Release Process

Bump the version, release and publish to npm:

```bash
$ npm run release
```

---

## ❓ Frequently Asked Questions

### What is AIOCatalogs?

AIOCatalogs is an addon that combines multiple catalog addons into a single addon. It allows you to search and discover content from various sources in a single addon, without having to install multiple addons individually.

### How do I configure the addon server?

You can configure the addon server using environment variables:

1. **Port Configuration**: Change the default port (8787) by setting the `PORT` environment variable
2. **Cloudflare Configuration**: Configure the D1 database in the `wrangler.toml` file

For Docker deployments, the docker-compose.yml file is already configured to use the required environment variables.

### How do I add new catalog addons?

1. Open the addon's web interface at your installation URL
2. Click "Create New Configuration" to create a new user ID
3. Add catalog addons by entering their manifest URLs
4. Install the addon in Stremio using the displayed URL

### Why can't I find specific content?

If you can't find specific content, check the following:

1. Is the source addon correctly configured?
2. Is the source addon currently accessible?
3. Does the source addon offer the desired content at all?

## 💖 Support the Project

Your support helps maintain and improve this project! Please consider:

- [Buy me a coffee](https://www.buymeacoffee.com/pantel)
- [Become a GitHub Sponsor](https://github.com/sponsors/pantelx)
- Join our Discord community for support and updates
- Contribute on GitHub

## 🙏 Credits

Special thanks to:

- All contributors who have contributed through code, testing, and ideas
- The community for their feedback, support, and patience
- Project supporters who have financially supported this initiative

## 📄 License

MIT

> **Note**
>
> This is an independent, fan-made addon. It connects to other source addons but has no direct connection to their operators.
