# GitStats Embed

Dynamic GitHub statistics cards for your README. Generate customizable, instantly updating cards showing stars, commits, PRs, issues, and more.

[![Open in Gitstats](./public/btn.svg)](https://gitstats.kirimna.com)

## Features

- **Live Preview** - See your stats card update in real-time as you customize
- **Theme Presets** - Choose from Dark, Light, Dracula, or Monokai
- **Full Customization** - Customize background, title, text, and icon colors
- **Border Radius Control** - Adjust card corner roundness (0-30px)
- **Toggle Options** - Show/hide icons and borders
- **Multiple Export Formats** - Copy as Markdown, HTML, or direct URL
- **Responsive Design** - Works beautifully on desktop and mobile

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Usage

1. Enter a GitHub username in the search field
2. Customize the card using theme presets or manual color pickers
3. Copy the generated embed code
4. Add it to your README.md

### Example Embed

```markdown
[![your-username's GitHub Stats](https://gitstats-api.krisnantobiyuh.workers.dev/api?username=your-username&theme=dark)](https://github.com/your-username)
```

## Building for Production

```bash
npm run build
```

## Tech Stack

- React Router (SSR)
- TypeScript
- TailwindCSS
- GitHub REST API

---

Built with ❤️ using React Router
