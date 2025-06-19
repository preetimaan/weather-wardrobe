# Weather Wardrobe

A weather-based outfit recommendation application that helps users choose appropriate clothing based on current weather conditions.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Yarn
- Docker

## Features

- Weather-based outfit recommendations
- Responsive design
- Modern UI with Tailwind CSS
- TypeScript for type safety

## Prerequisites

- Node.js (v20.19.2 or higher)
- Yarn
- Docker (optional)

## Getting Started

### Local Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/weather-wardrobe.git
cd weather-wardrobe
```

2. Install dependencies
```bash
yarn install
```

3. Start the development server
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Docker Development

1. Build and start the development container
```bash
docker compose up dev
```

2. Access the application at `http://localhost:5173`

### Docker Production Preview

1. Build and start the production preview
```bash
docker compose up preview
```

2. Access the application at `http://localhost:4173`

## Development

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn clean` - Clean yarn cache
- `yarn upgrade` - Interactive upgrade of dependencies

## Docker Commands

- `docker compose up dev` - Start development environment
- `docker compose up preview` - Start production preview
- `docker compose down` - Stop all containers
- `docker compose logs -f` - View logs
- `docker compose build` - Rebuild containers

## Project Structure

```
weather-wardrobe/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles with Tailwind
│   └── assets/          # Static assets
├── public/              # Public assets
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker services
├── .dockerignore        # Docker ignore rules
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Dependencies and scripts
```

## Deployment

This application is configured for deployment on Netlify. The build process creates optimized static files that can be served by any static hosting service.

### Netlify Deployment

1. Connect your repository to Netlify
2. Set build command: `yarn build`
3. Set publish directory: `dist`
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT