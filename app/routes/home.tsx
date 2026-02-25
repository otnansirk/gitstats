import React, { useState, useEffect } from 'react';
import { 
  Navigation,
  Hero,
  ThemePresets,
  Customization,
  StatsCard,
  EmbedSnippets,
  Footer,
  THEMES,
  seededRandom,
  type UserStats,
  type ConfigState,
  type CopiedStates,
  type GitHubUser,
  type GitHubRepo
} from '../components';

export default function App() {
  const [username, setUsername] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [config, setConfig] = useState<ConfigState>({
    theme: 'dark',
    showIcons: true,
    borderRadius: 8,
    bgColor: THEMES.dark.bgColor,
    textColor: THEMES.dark.textColor,
    titleColor: THEMES.dark.titleColor,
    iconColor: THEMES.dark.iconColor,
    borderColor: THEMES.dark.borderColor,
    hideBorder: false
  });

  const [copiedStates, setCopiedStates] = useState<CopiedStates>({
    url: false,
    md: false,
    html: false
  });

  const fetchStats = async (user: string): Promise<void> => {
    if (!user) return;
    setLoading(true);
    setError(null);
    
    try {
      const userRes = await fetch(`https://api.github.com/users/${user}`);
      
      if (userRes.status === 404) {
        throw new Error("User not found");
      }
      if (userRes.status === 403) {
        throw new Error("GitHub API rate limit exceeded. Please try again later.");
      }
      if (!userRes.ok) {
        throw new Error("Failed to fetch user data");
      }
      
      const userData: GitHubUser = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${user}/repos?per_page=100`);
      let totalStars = 0;
      
      if (reposRes.ok) {
        const reposData: GitHubRepo[] = await reposRes.json();
        totalStars = reposData.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);
      }

      const rand = seededRandom(userData.login);
      console.log(userData, "OOOO", rand());
      
      setStats({
        name: userData.name || userData.login,
        login: userData.login,
        followers: userData.followers,
        public_repos: userData.public_repos,
        total_stars: totalStars,
        commits: Math.floor(rand() * 1000) + 50,
        prs: Math.floor(rand() * 200) + 10,
        issues: Math.floor(rand() * 50),
        contributed: Math.floor(rand() * 20),
      });

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(username);
  }, [username]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      setUsername(searchInput.trim());
    }
  };

  const handleThemeChange = (themeKey: keyof typeof THEMES): void => {
    const theme = THEMES[themeKey];
    setConfig(prev => ({
      ...prev,
      theme: themeKey,
      bgColor: theme.bgColor,
      textColor: theme.textColor,
      titleColor: theme.titleColor,
      iconColor: theme.iconColor,
      borderColor: theme.borderColor
    }));
  };

  const handleColorChange = (key: keyof ConfigState, value: string): void => {
    setConfig(prev => ({
      ...prev,
      theme: 'custom',
      [key]: value
    }));
  };

  const copyToClipboard = async (text: string, type: keyof CopiedStates): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [type]: false }));
      }, 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopiedStates(prev => ({ ...prev, [type]: true }));
        setTimeout(() => {
          setCopiedStates(prev => ({ ...prev, [type]: false }));
        }, 2000);
      } catch (e) {
        console.error("Clipboard copy failed");
      }
      document.body.removeChild(textArea);
    }
  };

  const baseUrl = "https://gitstats-api.krisnantobiyuh.workers.dev/api";
  const queryParams = new URLSearchParams({
    username: username,
    theme: config.theme,
    show_icons: config.showIcons.toString(),
    radius: config.borderRadius.toString(),
    ...(config.theme === 'custom' && {
      bg_color: config.bgColor.replace('#', ''),
      text_color: config.textColor.replace('#', ''),
      title_color: config.titleColor.replace('#', ''),
      icon_color: config.iconColor.replace('#', '')
    }),
    ...(config.hideBorder && { hide_border: 'true' })
  }).toString();

  const embedUrl = `${baseUrl}?${queryParams}`;
  const markdownEmbed = `[![${username}'s GitHub Stats](${embedUrl})](https://github.com/${username})`;
  const htmlEmbed = `<a href="https://github.com/${username}">\n  <img src="${embedUrl}" alt="${username}'s GitHub Stats" />\n</a>`;

  return (
    <div className="min-h-screen bg-[#040814] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#111827] via-[#040814] to-[#02040A] text-slate-200 font-sans selection:bg-teal-500/30">
      
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <Hero 
          username={username}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          handleSearch={handleSearch}
          stats={stats}
          loading={loading}
          error={error}
          config={config}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 relative z-10">
          
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <ThemePresets config={config} handleThemeChange={handleThemeChange} />
            <Customization config={config} setConfig={setConfig} handleColorChange={handleColorChange} />
          </div>

          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            
            <div className="hidden lg:flex bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex flex-col items-center justify-center min-h-[280px] sm:min-h-[350px] relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] bg-teal-500/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>
              <div className="w-full max-w-[400px] sm:max-w-[495px] relative z-10 transition-transform hover:scale-[1.02] duration-500">
                <StatsCard stats={stats} loading={loading} error={error} config={config} />
              </div>
            </div>

            <EmbedSnippets 
              embedUrl={embedUrl}
              markdownEmbed={markdownEmbed}
              htmlEmbed={htmlEmbed}
              copiedStates={copiedStates}
              copyToClipboard={copyToClipboard}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
