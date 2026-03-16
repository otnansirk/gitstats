import type { Stats, GradeResult } from './types';

export interface ThemeConfig {
  bgColor: string;
  textColor: string;
  titleColor: string;
  iconColor: string;
  borderColor: string;
}

export interface RenderConfig extends ThemeConfig {
  showIcons: boolean;
  borderRadius: number;
  hideBorder: boolean;
  themeName?: string;
  layout: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  dark: {
    bgColor: '#0d1117',
    textColor: '#c9d1d9',
    titleColor: '#58a6ff',
    iconColor: '#58a6ff',
    borderColor: '#30363d',
  },
  light: {
    bgColor: '#ffffff',
    textColor: '#24292f',
    titleColor: '#0969da',
    iconColor: '#0969da',
    borderColor: '#d0d7de',
  },
  dracula: {
    bgColor: '#282a36',
    textColor: '#f8f8f2',
    titleColor: '#ff79c6',
    iconColor: '#bd93f9',
    borderColor: '#44475a',
  },
  monokai: {
    bgColor: '#272822',
    textColor: '#f8f8f2',
    titleColor: '#f92672',
    iconColor: '#a6e22e',
    borderColor: '#3e3d32',
  },
  isometri: {
    bgColor: '#161B22',
    textColor: '#D9E0E4',
    titleColor: '#00C896',
    iconColor: '#FF4D6D',
    borderColor: '#2D333B',
  },
  gauge: {
    bgColor: '#ffffff',
    textColor: '#334155',
    titleColor: '#334155',
    iconColor: '#0ea5e9',
    borderColor: '#e2e8f0',
  },
};

const SVGIcons = {
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  commits:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  prs: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>',
  issues:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
  contributed:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
};

function parseTheme(searchParams: URLSearchParams): RenderConfig {
  const defaultTheme = THEMES.dark;
  const config: RenderConfig = {
    ...defaultTheme,
    showIcons: true,
    borderRadius: 8,
    hideBorder: false,
    layout: 'classic',
  };

  const themeKey = searchParams.get('theme');
  if (themeKey && THEMES[themeKey]) {
    Object.assign(config, THEMES[themeKey]);
    config.themeName = themeKey;
  } else {
    const customColors = [
      'bg_color',
      'text_color',
      'title_color',
      'icon_color',
      'border_color',
    ];
    const colorMap: (keyof ThemeConfig)[] = [
      'bgColor',
      'textColor',
      'titleColor',
      'iconColor',
      'borderColor',
    ];

    customColors.forEach((param, i) => {
      const value = searchParams.get(param);
      if (value) {
        config[colorMap[i]] = '#' + value;
      }
    });
  }

  config.showIcons = searchParams.get('show_icons') !== 'false';
  config.hideBorder = searchParams.get('hide_border') === 'true';
  config.layout = searchParams.get('layout') || 'classic';
  if (searchParams.has('radius')) {
    config.borderRadius = parseInt(searchParams.get('radius')!) || 0;
  }

  return config;
}

export function buildSVG(
  stats: Stats,
  grade: GradeResult,
  searchParams: URLSearchParams,
): string {
  const config = parseTheme(searchParams);

  if (config.layout === 'gauge') {
    const width = 400;
    const height = 400;
    const cx = width / 2;
    const cy = 240;
    const radius = 130;

    let gaugeTicks = '';
    const numTicks = 60;
    for (let i = 0; i <= numTicks; i++) {
      const percent = i / numTicks;
      const hue = (1 - percent) * 120;
      const color = `hsl(${hue}, 100%, 50%)`;
      const angle = Math.PI - percent * Math.PI;
      const x1 = cx + (radius - 25) * Math.cos(angle);
      const y1 = cy - (radius - 25) * Math.sin(angle);
      const x2 = cx + radius * Math.cos(angle);
      const y2 = cy - radius * Math.sin(angle);
      gaugeTicks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" />\n`;
    }

    for (let i = 0; i <= 10; i++) {
      const percent = i / 10;
      const angle = Math.PI - percent * Math.PI;
      const x1 = cx + (radius - 45) * Math.cos(angle);
      const y1 = cy - (radius - 45) * Math.sin(angle);
      const x2 = cx + (radius - 35) * Math.cos(angle);
      const y2 = cy - (radius - 35) * Math.sin(angle);
      gaugeTicks += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${config.textColor}" stroke-opacity="0.3" stroke-width="2" />\n`;
    }

    const scorePercent = grade.percent / 100;
    const scoreAngle = Math.PI - scorePercent * Math.PI;
    const needleLength = radius - 40;
    const nx = cx + needleLength * Math.cos(scoreAngle);
    const ny = cy - needleLength * Math.sin(scoreAngle);

    const is3D = config.themeName === 'isometri';
    const offset = is3D ? 8 : 0;
    const rectWidth = width - 1 - offset;
    const rectHeight = height - 1 - offset;

    return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, -apple-system, sans-serif;">
  ${is3D ? `<rect x="${0.5 + offset}" y="${0.5 + offset}" rx="${config.borderRadius}" height="${rectHeight}" width="${rectWidth}" fill="${config.borderColor}" stroke="none" />` : ''}
  <rect x="0.5" y="0.5" rx="${config.borderRadius}" height="${rectHeight}" width="${rectWidth}" fill="${config.bgColor}" stroke="${config.hideBorder ? 'none' : config.borderColor}" stroke-opacity="1" />
  
  <text x="${cx}" y="50" text-anchor="middle" fill="${config.titleColor}" font-weight="bold" font-size="22px">GitHub Stats ${new Date().getFullYear()}</text>
  
  ${gaugeTicks}
  <line x1="${cx}" y1="${cy}" x2="${nx}" y2="${ny}" stroke="${config.textColor}" stroke-width="4" stroke-linecap="round" />
  <circle cx="${cx}" cy="${cy}" r="6" fill="${config.textColor}" />
  
  <text x="${cx}" y="${cy + 70}" text-anchor="middle" fill="${config.textColor}" font-size="64px" font-weight="900">${grade.grade}</text>
  
  <g transform="translate(0, ${cy + 120})">
    <text x="${width / 6}" y="0" text-anchor="middle" fill="${config.textColor}" opacity="0.6" font-size="14px">Commits</text>
    <text x="${width / 6}" y="25" text-anchor="middle" fill="${config.textColor}" font-size="20px" font-weight="bold">${stats.total_commits}</text>

    <text x="${width / 2}" y="0" text-anchor="middle" fill="${config.textColor}" opacity="0.6" font-size="14px">Contributed</text>
    <text x="${width / 2}" y="25" text-anchor="middle" fill="${config.textColor}" font-size="20px" font-weight="bold">${stats.total_contributed}</text>

    <text x="${width * 5 / 6}" y="0" text-anchor="middle" fill="${config.textColor}" opacity="0.6" font-size="14px">Star Earn</text>
    <text x="${width * 5 / 6}" y="25" text-anchor="middle" fill="${config.textColor}" font-size="20px" font-weight="bold">${stats.total_stars}</text>
  </g>
</svg>`;
  }

  const width = 495;
  const height = 200;
  const padding = 25;
  const lineHeight = 28;
  const valueX = 260;

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (grade.percent / 100) * circumference;

  const is3D = config.themeName === 'isometri';
  const offset = is3D ? 8 : 0;
  const rectWidth = width - 1 - offset;
  const rectHeight = height - 1 - offset;

  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" style="font-family: system-ui, -apple-system, sans-serif;">
  ${is3D ? `<rect x="${0.5 + offset}" y="${0.5 + offset}" rx="${config.borderRadius}" height="${rectHeight}" width="${rectWidth}" fill="${config.borderColor}" stroke="none" />` : ''}
  <rect x="0.5" y="0.5" rx="${config.borderRadius}" height="${rectHeight}" width="${rectWidth}" fill="${config.bgColor}" stroke="${config.hideBorder ? 'none' : config.borderColor}" stroke-opacity="1" />
  <g transform="translate(${padding}, ${padding + 10})">
    <text x="0" y="0" fill="${config.titleColor}" font-weight="bold" font-size="18px">${stats.name}'s GitHub Stats</text>
  </g>
  <g transform="translate(${padding}, ${padding + 45})">
    <g transform="translate(0, ${lineHeight * 0})">
      ${config.showIcons ? `<g color="${config.iconColor}" transform="translate(0, -12)">${SVGIcons.star}</g>` : ''}
      <text x="${config.showIcons ? 25 : 0}" y="0" fill="${config.textColor}" font-size="14px" font-weight="600">Total Stars Earned:</text>
      <text x="${valueX}" y="0" fill="${config.textColor}" font-size="14px" font-weight="500">${stats.total_stars.toLocaleString()}</text>
    </g>
    <g transform="translate(0, ${lineHeight * 1})">
      ${config.showIcons ? `<g color="${config.iconColor}" transform="translate(0, -12)">${SVGIcons.commits}</g>` : ''}
      <text x="${config.showIcons ? 25 : 0}" y="0" fill="${config.textColor}" font-size="14px" font-weight="600">Total Commits (${new Date().getFullYear()}):</text>
      <text x="${valueX}" y="0" fill="${config.textColor}" font-size="14px" font-weight="500">${stats.total_commits.toLocaleString()}</text>
    </g>
    <g transform="translate(0, ${lineHeight * 2})">
      ${config.showIcons ? `<g color="${config.iconColor}" transform="translate(0, -12)">${SVGIcons.prs}</g>` : ''}
      <text x="${config.showIcons ? 25 : 0}" y="0" fill="${config.textColor}" font-size="14px" font-weight="600">Total PRs:</text>
      <text x="${valueX}" y="0" fill="${config.textColor}" font-size="14px" font-weight="500">${stats.total_pr.toLocaleString()}</text>
    </g>
    <g transform="translate(0, ${lineHeight * 3})">
      ${config.showIcons ? `<g color="${config.iconColor}" transform="translate(0, -12)">${SVGIcons.issues}</g>` : ''}
      <text x="${config.showIcons ? 25 : 0}" y="0" fill="${config.textColor}" font-size="14px" font-weight="600">Total Issues:</text>
      <text x="${valueX}" y="0" fill="${config.textColor}" font-size="14px" font-weight="500">${stats.total_issues.toLocaleString()}</text>
    </g>
    <g transform="translate(0, ${lineHeight * 4})">
      ${config.showIcons ? `<g color="${config.iconColor}" transform="translate(0, -12)">${SVGIcons.contributed}</g>` : ''}
      <text x="${config.showIcons ? 25 : 0}" y="0" fill="${config.textColor}" font-size="14px" font-weight="600">Contributed to (last year):</text>
      <text x="${valueX}" y="0" fill="${config.textColor}" font-size="14px" font-weight="500">${stats.total_contributed.toLocaleString()}</text>
    </g>
  </g>
  <g transform="translate(390, 105)">
    <circle cx="0" cy="0" r="${radius}" fill="none" stroke="${config.iconColor}" stroke-width="6" stroke-opacity="0.2" />
    <circle cx="0" cy="0" r="${radius}" fill="none" stroke="${config.iconColor}" stroke-width="6" stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}" stroke-linecap="round" transform="rotate(-90)" />
    <text x="0" y="10" text-anchor="middle" fill="${config.textColor}" font-size="32px" font-weight="bold">${grade.grade}</text>
  </g>
</svg>`;
}

export { parseTheme };
