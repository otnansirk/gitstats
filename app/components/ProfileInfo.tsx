import React from 'react';
import type { GitHubProfile } from './types';

interface ProfileInfoProps {
  profile: GitHubProfile | null;
  loading: boolean;
  error: string | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, loading, error }) => {
  if (loading) {
    return (
      <div className="mb-4 sm:mb-6 bg-white/[0.02] backdrop-blur-2xl p-4 sm:p-6 rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <h3 className="text-sm font-medium text-slate-400 mb-4">Profile Information</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-white/10 animate-pulse bg-white/5" />
          <div className="flex flex-col gap-2">
            <div className="h-5 w-24 bg-white/5 rounded animate-pulse" />
            <div className="h-4 w-16 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="mb-4 sm:mb-6 bg-white/[0.02] backdrop-blur-2xl p-4 sm:p-6 rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
        <h3 className="text-sm font-medium text-slate-400 mb-4">Profile Information</h3>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-red-500/20 bg-red-500/5 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium text-red-400">Profile not found</span>
            <span className="text-sm text-slate-500">User does not exist or is not available</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 sm:mb-6 bg-white/[0.02] backdrop-blur-2xl p-4 sm:p-6 rounded-2xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
      <h3 className="text-sm font-medium text-slate-400 mb-4">Profile Information</h3>
      <div className="flex items-center gap-4">
        <img
          src={profile.avatar_url}
          alt={`${profile.login}'s avatar`}
          className="w-16 h-16 rounded-full border-2 border-white/10"
        />
        <div className="flex flex-col">
          {profile.name && (
            <span className="text-lg font-semibold text-slate-200">{profile.name}</span>
          )}
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
          >
            @{profile.login}
          </a>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-400 transition-colors mt-1"
          >
            {profile.html_url}
          </a>
        </div>
      </div>
    </div>
  );
};
