# GitHub Stats Worker

A Cloudflare Worker that generates SVG stat cards for GitHub users.

## Author

[github.com/otnansirk](https://github.com/otnansirk)

## Setup

1. Install dependencies:

```bash
cd workers/github-stats
npm install
```

2. Set the GitHub token:

```bash
wrangler secret put GITHUB_TOKEN
```

Enter your GitHub Personal Access Token with `read:user` and `repo` scopes.

## Development

```bash
npm run dev
```

## Deployment

```bash
npm run deploy
```

Or with explicit token unset:

```bash
(unset CF_API_TOKEN && unset CLOUDFLARE_API_TOKEN && wrangler deploy)
```

## Usage

### SVG Endpoint (default)

```
https://github-stats.<your-account>.workers.dev/?username=your-username
```

### JSON Endpoint

```
https://github-stats.<your-account>.workers.dev/api/json?username=your-username
```

## Query Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| `username` | GitHub username | Required |
| `theme` | Theme: `dark`, `light`, `dracula`, `monokai` | `dark` |
| `show_icons` | Show icons | `true` |
| `hide_border` | Hide border | `false` |
| `radius` | Border radius | `8` |
| `bg_color` | Custom background color (hex without #) | Theme default |
| `text_color` | Custom text color | Theme default |
| `title_color` | Custom title color | Theme default |
| `icon_color` | Custom icon color | Theme default |
| `border_color` | Custom border color | Theme default |

## Examples

```
# Dark theme (default)
?username=otnansirk&theme=dark

# Light theme
?username=otnansirk&theme=light

# Custom colors
?username=otnansirk&bg_color=1a1b26&text_color=a9b1d6&title_color=7aa2f7&icon_color=7aa2f7&border_color=414868

# Hide border
?username=otnansirk&hide_border=true&radius=0
```
