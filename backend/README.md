# Backend

This is a Deno backend using the Oak framework.

## Development

Run the development server:

```bash
deno task dev
```

The server will start on `http://localhost:3000` with API endpoints available at `/api/*`.

## Production

To run in production mode with static file serving:

1. **Build the frontend** (from the project root):
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

2. **Start the production server**:
   ```bash
   cd backend
   deno task start
   ```

In production mode, the server will:
- Serve API routes at `/api/*`
- Serve static files from `../frontend/dist`
- Handle client-side routing by serving `index.html` for non-API routes

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Set to "production" to enable static file serving

## API Routes

- `GET /api/welcome` - Welcome message endpoint

## Static File Serving

When `NODE_ENV=production`, the backend automatically serves:
- Static assets (CSS, JS, images) from the frontend build
- The main `index.html` file for client-side routing
- Proper fallback handling for Single Page Application (SPA) routing

## Project Structure

```
backend/
├── main.ts           # Application entry point
├── deno.json         # Deno configuration
├── routes/
│   ├── index.ts      # Main router
│   └── api.ts        # API routes
├── .env.example      # Environment variables template
└── README.md         # This file
```