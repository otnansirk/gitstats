import type { Theme } from './types';

export const THEMES: Record<string, Theme> = {
  dark: {
    name: 'Dark',
    bgColor: '#0d1117',
    textColor: '#c9d1d9',
    titleColor: '#58a6ff',
    iconColor: '#58a6ff',
    borderColor: '#30363d'
  },
  light: {
    name: 'Light',
    bgColor: '#ffffff',
    textColor: '#24292f',
    titleColor: '#0969da',
    iconColor: '#0969da',
    borderColor: '#d0d7de'
  },
  dracula: {
    name: 'Dracula',
    bgColor: '#282a36',
    textColor: '#f8f8f2',
    titleColor: '#ff79c6',
    iconColor: '#bd93f9',
    borderColor: '#44475a'
  },
  monokai: {
    name: 'Monokai',
    bgColor: '#272822',
    textColor: '#f8f8f2',
    titleColor: '#f92672',
    iconColor: '#a6e22e',
    borderColor: '#3e3d32'
  },
  isometri: {
    name: 'Isometri',
    bgColor: '#161B22',
    textColor: '#D9E0E4',
    titleColor: '#00C896',
    iconColor: '#FF4D6D',
    borderColor: '#2D333B'
  },
  gauge: {
    name: 'Gauge',
    bgColor: '#ffffff',
    textColor: '#334155',
    titleColor: '#334155',
    iconColor: '#0ea5e9',
    borderColor: '#e2e8f0'
  }
};

export const SVGIcons = {
  star: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
  commits: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  prs: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>',
  issues: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
  contributed: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>'
};

export function seededRandom(str: string): () => number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) { hash = str.charCodeAt(i) + ((hash << 5) - hash); }
  return function() { hash = Math.sin(hash) * 10000; return hash - Math.floor(hash); }
}
