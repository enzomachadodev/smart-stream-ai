# Smart Stream AI

A full-stack application designed to transform audio streams into interactive question-and-answer sessions. Users can create rooms, upload audio, and the system leverages AI to generate questions and insights from the content.

## Key Features

- **Room Management**: Create and list isolated rooms for different audio sessions.
- **Audio Upload**: Upload audio files (e.g., MP3, WAV) to a specific room.
- **AI-Powered Q&A**: Automatically generates questions based on the uploaded audio content using Google Gemini.
- **Interactive Interface**: View and interact with the generated questions for each room.
- **Vector-Based Similarity**: Utilizes `pgvector` for potential future features like semantic search or finding similar questions.

## Technologies Used

**Backend**
- **Language**: TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL with `pgvector`
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Containerization**: Docker

**Frontend**
- **Language**: TypeScript
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & shadcn/ui
- **Data Fetching**: TanStack Query
- **Routing**: React Router

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v20.x or higher recommended)
- [pnpm](https://pnpm.io/installation)
- [Docker](https://www.docker.com/get-started) & Docker Compose

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd smart-stream-ai
    ```

2.  **Install backend dependencies:**
    ```bash
    cd server
    pnpm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../web
    pnpm install
    ```

4.  **Configure environment variables:**
    In the `server` directory, copy the example environment file and update it with your configuration (especially your Google Gemini API key).
    ```bash
    cd ../server
    cp .env.example .env
    ```
    > **Note**: You need to fill in the `GEMINI_API_KEY` in the `.env` file.

5.  **Start the database:**
    Make sure Docker is running, then start the PostgreSQL container from the `server` directory.
    ```bash
    docker-compose up -d
    ```

6.  **Run database migrations:**
    Apply the initial database schema.
    ```bash
    pnpm run db:migrate
    ```

## Running the Application

You need to run the backend and frontend servers in separate terminal windows.

1.  **Start the backend server:**
    From the `server` directory:
    ```bash
    pnpm run dev
    ```
    The server will be running on `http://localhost:3333` (or the port specified in your `.env` file).

2.  **Start the frontend application:**
    From the `web` directory:
    ```bash
    pnpm run dev
    ```
    The application will be available at `http://localhost:5173`.
