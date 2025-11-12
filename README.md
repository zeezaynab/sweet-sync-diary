# Our Diary ♡

A beautiful two-person digital diary built with React, TypeScript, and Lovable Cloud.

## Features

- 📸 Instagram-style photo carousel with your precious memories
- 💌 Shared diary with realtime updates
- 🎨 Pastel pink aesthetic design
- ⚡ Instant synchronization across devices
- 💕 Simple and intimate interface for two people

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Lovable Cloud (Supabase)
- **Database**: PostgreSQL with Realtime subscriptions
- **Fonts**: Poppins & Baloo 2

## Getting Started

### Prerequisites

- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`

## How It Works

### Database Schema

The app uses a simple PostgreSQL database with two participants:

- **Enum**: `participant_handle` with values 'zainab' and 'rayyan'
- **Table**: `notes` with columns:
  - `id` (UUID, primary key)
  - `sender` (participant_handle)
  - `message` (text)
  - `created_at` (timestamp)

### Realtime Updates

The diary uses Lovable Cloud's realtime features to instantly sync new notes across all open sessions. When someone adds a note, it appears immediately for both users without needing to refresh.

### Testing Realtime

1. Open the app in two browser tabs
2. Add a note in one tab
3. Watch it appear instantly in the other tab ✨

## Design

The app features a warm pastel pink color scheme perfect for a personal diary:

- Background: Soft pink (#FFE6EA)
- Zainab's notes: Light pink (#F8C8DC) - right-aligned with slight rotation
- Rayyan's notes: Rose pink (#E978A1) - left-aligned with slight rotation
- Typography: Poppins for body text, Baloo 2 for playful accents

Each note card has:
- A subtle tape strip at the top for a scrapbook feel
- Slight rotation (-1° or +1°) for a handwritten aesthetic
- Soft shadows for depth
- Rounded corners (25px) for a friendly look

## Project Structure

```
/src
  /components
    HelloPage.tsx      # Photo carousel with "hi ♡" button
    DiaryPage.tsx      # Shared notes view with realtime updates
    NoteCard.tsx       # Individual note display component
  /components/ui       # shadcn/ui components
  /integrations        # Lovable Cloud integration (auto-generated)
  /assets              # Images and static files
  App.tsx              # Main app with simple state-based navigation
  index.css            # Design system and Tailwind config
```

## Deployment

Deploy your app instantly:

1. Click the **Publish** button in Lovable
2. Your app will be live at a lovable.app subdomain
3. You can connect a custom domain in Settings > Domains

## Lovable Cloud

This project uses Lovable Cloud for backend functionality:

- **Database**: PostgreSQL with realtime subscriptions
- **No Auth**: Designed as a private diary for two specific people
- **Auto-sync**: Changes deploy automatically

Access your backend data and settings through the Cloud tab in Lovable.

## Development

- **Frontend changes**: Require clicking "Update" in the publish dialog
- **Backend changes**: Deploy automatically and immediately

## Contributing

This is a personal diary project for Zainab & Rayyan. 💕

## Learn More

- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable Cloud Features](https://docs.lovable.dev/features/cloud)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
