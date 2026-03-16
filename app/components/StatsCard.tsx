import { Loader2, AlertCircle } from 'lucide-react';
import type { UserStats, ConfigState } from './types';
import { SVGIcons } from './constants';

interface StatsCardProps {
  stats: UserStats | null;
  loading: boolean;
  error: string | null;
  config: ConfigState;
}

export function StatsCard({ stats, loading, error, config }: StatsCardProps) {
  if (loading) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center bg-white/[0.02] rounded-3xl border border-white/[0.08] shadow-inner">
        <Loader2 className="w-8 h-8 animate-spin text-teal-400 mb-4" />
        <p className="text-sm text-slate-400 font-medium">Crunching numbers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-48 flex flex-col items-center justify-center bg-red-500/10 rounded-3xl border border-red-500/20">
        <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
        <p className="text-sm text-red-400 font-medium text-center px-4">{error}</p>
      </div>
    );
  }

  if (!stats) return null;

  const calculateGrade = (s: UserStats) => {
    const score = s.total_stars * 10 + s.commits * 2 + s.prs * 5;
    if (score > 5000) return { grade: 'S+', percent: 95 };
    if (score > 3000) return { grade: 'S', percent: 90 };
    if (score > 1500) return { grade: 'A+', percent: 85 };
    if (score > 1000) return { grade: 'A', percent: 80 };
    if (score > 500) return { grade: 'A-', percent: 75 };
    if (score > 250) return { grade: 'B+', percent: 65 };
    if (score > 100) return { grade: 'B', percent: 55 };
    return { grade: 'C', percent: 40 };
  };

  const { grade, percent } = calculateGrade(stats);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (percent / 100) * circumference;

  if (config.layout === 'gauge') {
    const width = 400;
    const height = 400;
    const cx = width / 2;
    const cy = 240;
    const gaugeRadius = 130;

    let gaugeTicks = [];
    const numTicks = 60;
    for (let i = 0; i <= numTicks; i++) {
      const p = i / numTicks;
      const hue = (1 - p) * 120;
      const color = `hsl(${hue}, 100%, 50%)`;
      const angle = Math.PI - p * Math.PI;
      const x1 = cx + (gaugeRadius - 25) * Math.cos(angle);
      const y1 = cy - (gaugeRadius - 25) * Math.sin(angle);
      const x2 = cx + gaugeRadius * Math.cos(angle);
      const y2 = cy - gaugeRadius * Math.sin(angle);
      gaugeTicks.push(
        <line key={`tick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      );
    }

    for (let i = 0; i <= 10; i++) {
      const p = i / 10;
      const angle = Math.PI - p * Math.PI;
      const x1 = cx + (gaugeRadius - 45) * Math.cos(angle);
      const y1 = cy - (gaugeRadius - 45) * Math.sin(angle);
      const x2 = cx + (gaugeRadius - 35) * Math.cos(angle);
      const y2 = cy - (gaugeRadius - 35) * Math.sin(angle);
      gaugeTicks.push(
        <line key={`itick-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={config.textColor} strokeOpacity="0.3" strokeWidth="2" />
      );
    }

    const scorePercent = percent / 100;
    const scoreAngle = Math.PI - scorePercent * Math.PI;
    const needleLength = gaugeRadius - 40;
    const nx = cx + needleLength * Math.cos(scoreAngle);
    const ny = cy - needleLength * Math.sin(scoreAngle);

    const is3D = config.theme === 'isometri';
    const offset = is3D ? 8 : 0;
    const rectWidth = width - 1 - offset;
    const rectHeight = height - 1 - offset;

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-sm max-w-[400px] mx-auto"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {is3D && (
          <rect
            x={0.5 + offset}
            y={0.5 + offset}
            rx={config.borderRadius}
            height={rectHeight}
            width={rectWidth}
            fill={config.borderColor}
            stroke="none"
          />
        )}
        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx={config.borderRadius}
          height={rectHeight}
          width={rectWidth}
          fill={config.bgColor}
          stroke={config.hideBorder ? 'none' : config.borderColor}
          strokeOpacity={1}
        />
        
        <text x={cx} y="50" textAnchor="middle" fill={config.titleColor} fontWeight="bold" fontSize="22px">
          GitHub Stats {new Date().getFullYear()}
        </text>
        
        {gaugeTicks}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={config.textColor} strokeWidth="4" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="6" fill={config.textColor} />
        
        <text x={cx} y={cy + 70} textAnchor="middle" fill={config.textColor} fontSize="64px" fontWeight="900">
          {grade}
        </text>
        
        <g transform={`translate(0, ${cy + 120})`}>
          <text x={width / 6} y="0" textAnchor="middle" fill={config.textColor} opacity="0.6" fontSize="14px">Commits</text>
          <text x={width / 6} y="25" textAnchor="middle" fill={config.textColor} fontSize="20px" fontWeight="bold">{stats.commits}</text>

          <text x={width / 2} y="0" textAnchor="middle" fill={config.textColor} opacity="0.6" fontSize="14px">Contributed</text>
          <text x={width / 2} y="25" textAnchor="middle" fill={config.textColor} fontSize="20px" fontWeight="bold">{stats.contributed}</text>

          <text x={width * 5 / 6} y="0" textAnchor="middle" fill={config.textColor} opacity="0.6" fontSize="14px">Star Earn</text>
          <text x={width * 5 / 6} y="25" textAnchor="middle" fill={config.textColor} fontSize="20px" fontWeight="bold">{stats.total_stars}</text>
        </g>
      </svg>
    );
  }

  const width = 495;
  const height = 195;
  const padding = 25;
  const lineHeight = 28;
  const valueX = 220;

  const is3D = config.theme === 'isometri';
  const offset = is3D ? 8 : 0;
  const rectWidth = width - 1 - offset;
  const rectHeight = height - 1 - offset;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-sm max-w-[495px] mx-auto"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {is3D && (
        <rect
          x={0.5 + offset}
          y={0.5 + offset}
          rx={config.borderRadius}
          height={rectHeight}
          width={rectWidth}
          fill={config.borderColor}
          stroke="none"
        />
      )}
      <rect
        data-testid="card-bg"
        x="0.5"
        y="0.5"
        rx={config.borderRadius}
        height={rectHeight}
        width={rectWidth}
        fill={config.bgColor}
        stroke={config.hideBorder ? 'none' : config.borderColor}
        strokeOpacity={1}
      />
      
      <g transform={`translate(${padding}, ${padding + 10})`}>
        <text x="0" y="0" className="header" data-testid="header" fill={config.titleColor} fontWeight="bold" fontSize="18px">
          {stats.name}'s GitHub Stats
        </text>
      </g>

      <g transform={`translate(${padding}, ${padding + 45})`}>
        <g transform={`translate(0, ${lineHeight * 0})`}>
          {config.showIcons && (
            <g color={config.iconColor} dangerouslySetInnerHTML={{ __html: SVGIcons.star }} transform="translate(0, -12)" />
          )}
          <text x={config.showIcons ? 25 : 0} y="0" fill={config.textColor} fontSize="14px" fontWeight="600">Total Stars Earned:</text>
          <text x={valueX} y="0" fill={config.textColor} fontSize="14px" fontWeight="500">{stats.total_stars.toLocaleString()}</text>
        </g>
        <g transform={`translate(0, ${lineHeight * 1})`}>
          {config.showIcons && (
            <g color={config.iconColor} dangerouslySetInnerHTML={{ __html: SVGIcons.commits }} transform="translate(0, -12)" />
          )}
          <text x={config.showIcons ? 25 : 0} y="0" fill={config.textColor} fontSize="14px" fontWeight="600">Total Commits (2024):</text>
          <text x={valueX} y="0" fill={config.textColor} fontSize="14px" fontWeight="500">{stats.commits.toLocaleString()}</text>
        </g>
        <g transform={`translate(0, ${lineHeight * 2})`}>
          {config.showIcons && (
            <g color={config.iconColor} dangerouslySetInnerHTML={{ __html: SVGIcons.prs }} transform="translate(0, -12)" />
          )}
          <text x={config.showIcons ? 25 : 0} y="0" fill={config.textColor} fontSize="14px" fontWeight="600">Total PRs:</text>
          <text x={valueX} y="0" fill={config.textColor} fontSize="14px" fontWeight="500">{stats.prs.toLocaleString()}</text>
        </g>
        <g transform={`translate(0, ${lineHeight * 3})`}>
          {config.showIcons && (
            <g color={config.iconColor} dangerouslySetInnerHTML={{ __html: SVGIcons.issues }} transform="translate(0, -12)" />
          )}
          <text x={config.showIcons ? 25 : 0} y="0" fill={config.textColor} fontSize="14px" fontWeight="600">Total Issues:</text>
          <text x={valueX} y="0" fill={config.textColor} fontSize="14px" fontWeight="500">{stats.issues.toLocaleString()}</text>
        </g>
        <g transform={`translate(0, ${lineHeight * 4})`}>
          {config.showIcons && (
            <g color={config.iconColor} dangerouslySetInnerHTML={{ __html: SVGIcons.contributed }} transform="translate(0, -12)" />
          )}
          <text x={config.showIcons ? 25 : 0} y="0" fill={config.textColor} fontSize="14px" fontWeight="600">Contributed to (last year):</text>
          <text x={valueX} y="0" fill={config.textColor} fontSize="14px" fontWeight="500">{stats.contributed.toLocaleString()}</text>
        </g>
      </g>

      <g transform={`translate(390, 105)`}>
        <circle cx="0" cy="0" r={radius} fill="none" stroke={config.iconColor} strokeWidth="6" strokeOpacity="0.2" />
        <circle 
          cx="0" 
          cy="0" 
          r={radius} 
          fill="none" 
          stroke={config.iconColor} 
          strokeWidth="6" 
          strokeDasharray={circumference} 
          strokeDashoffset={dashoffset} 
          strokeLinecap="round" 
          transform="rotate(-90)" 
        />
        <text x="0" y="10" textAnchor="middle" fill={config.textColor} fontSize="32px" fontWeight="bold">
          {grade}
        </text>
      </g>
    </svg>
  );
}
