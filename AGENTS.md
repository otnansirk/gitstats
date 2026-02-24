# GitStats Embed - Agent Documentation

## Project Overview
GitStats Embed is a dynamic GitHub statistics card generator built with React Router and TypeScript. It allows users to create customizable embeddable cards showing GitHub user statistics with live preview and multiple export formats.

## Available Agent Skills

The project includes a sophisticated agent skills system for development assistance:

### Core Development Skills
- **typescript** - TypeScript code style and optimization guidelines
- **react** - React component development guide using @lobehub/ui components
- **testing** - Testing guide using Vitest for .test.ts/.test.tsx files
- **debug** - Debug package usage guide for logging implementation

### Architecture & State Management
- **zustand** - Zustand state management for store development
- **store-data-structures** - List vs Detail data structure patterns for LobeHub
- **data-fetching** - Service layer + Zustand Store + SWR architecture

### Internationalization & Operations
- **i18n** - Internationalization guide using react-i18next
- **version-release** - Version release workflows (Minor/Patch releases)
- **recent-data** - Recent data management for topics, resources, pages

### Agent Discovery
- **find-skills** - Helps discover and install agent skills for extending capabilities

## Development Workflow

### Running the Project
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linting
npm run typecheck # Run TypeScript type checking
```

### Agent System Features
- Skills are locked in `.agents/skills-lock.json`
- Each skill provides domain-specific workflows and guidelines
- Skills inject detailed instructions and reference templates into conversations
- System automatically matches tasks to appropriate specialized agents

## Theme Design System

### Visual Theme
- **Background**: Dark navy gradient
- **Cards**: Frosted glass with blur effect
- **Corners**: Large rounded corners
- **Borders**: Subtle border glow
- **Shadows**: Soft shadow layering
- **Accent Colors**: Orange, purple, teal
- **Icons**: Minimal icons inside soft gradient circles
- **Layout**: Clean grid layout with good spacing

### Component Patterns
- Use @lobehub/ui components when available
- Follow React component conventions from the react skill
- Implement responsive design patterns
- Use TypeScript for type safety throughout

## Architecture Patterns
- **SSR-Enabled**: Server-side rendering for better performance
- **Service Layer**: Clean API abstraction with proper error handling
- **State Management**: Zustand stores for application state
- **Data Fetching**: SWR pattern for API data management
- **Testing**: Vitest with comprehensive coverage
- **Internationalization**: i18next for multi-language support