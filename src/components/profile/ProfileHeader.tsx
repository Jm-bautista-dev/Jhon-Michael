import { Calendar, Mail, MapPin, Trophy } from 'lucide-react'
import type { Profile } from '../../types'
import { ThemeToggle } from '../layout/ThemeToggle'

interface ProfileHeaderProps {
  profile: Profile
  onContactClick?: () => void
}

export function ProfileHeader({ profile, onContactClick }: ProfileHeaderProps) {
  return (
    <header className="w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        {/* Avatar image container with clean fallback border */}
        <div className="relative shrink-0 mx-auto md:mx-0">
          <div className="rounded-lg w-40 h-40 object-cover overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-border/80">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // If user hasn't dropped their image yet, we display a premium initial fallback portrait placeholder
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face'
              }}
            />
          </div>
        </div>

        {/* Text Details & Header actions */}
        <div className="flex-1 min-w-0 text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-between gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold truncate tracking-tight text-foreground">
                {profile.name}
              </h1>
              {/* Verified Blue Checkmark SVG */}
              <svg
                viewBox="0 0 22 22"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-shrink-0"
                aria-label="Verified user"
              >
                <path
                  d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                  fill="#1d9bf0"
                />
              </svg>
            </div>
            {/* Theme toggle switch aligns right */}
            <div className="shrink-0">
              <ThemeToggle />
            </div>
          </div>

          {/* Location info */}
          <p className="text-xs md:text-sm text-muted flex items-center justify-center md:justify-start gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-muted" />
            <span>{profile.location}</span>
          </p>

          {/* Core Tagline / Subtitle */}
          <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-between gap-3 pt-1">
            <p className="text-xs md:text-sm font-medium tracking-tight text-foreground/80">
              {profile.title.split('\\').map((part, index, arr) => (
                <span key={index}>
                  {part.trim()}
                  {index < arr.length - 1 && <span className="text-muted/65 mx-1">\</span>}
                </span>
              ))}
            </p>

            {/* Gradient Highlight Badge Banner */}
            <div className="relative inline-flex self-center md:self-auto shrink-0 hackathon-badge rounded-lg shadow-sm" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)'
            }}>
              <a
                href="https://makidesuoperation.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center px-4 text-[10px] font-semibold text-white transition-all duration-300 gap-1.5 whitespace-nowrap"
              >
                <Trophy className="w-3.5 h-3.5 shrink-0" />
                <span>{profile.highlightBadge}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA booking / contacting links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
        {/* Schedule a Call */}
        <a
          href={profile.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-muted gap-1.5"
        >
          <Calendar className="w-4 h-4" />
          <span>Schedule a Call</span>
        </a>

        {/* Send Email */}
        <button
          type="button"
          onClick={onContactClick}
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-muted gap-1.5 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Send Email</span>
        </button>

        {/* Read my Blog */}
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-muted gap-1.5"
        >
          {/* Blog Book SVG */}
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14"
            />
          </svg>
          <span>Read my blog</span>
        </a>
      </div>
    </header>
  )
}
