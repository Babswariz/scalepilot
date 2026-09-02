type BrandLogoProps = {
  className?: string
  textClassName?: string
  iconClassName?: string
}

export default function BrandLogo({
  className = '',
  textClassName = 'text-sm font-semibold tracking-[0.24em] text-slate-100',
  iconClassName = 'h-9 w-9',
}: BrandLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className={iconClassName}
        role="img"
      >
        <defs>
          <linearGradient id="scalepilot-brand-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#5BA8FF" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="12" fill="url(#scalepilot-brand-gradient)" />
        <path
          d="M28.4 11.5c-1.7-2.1-4.4-3.3-7.5-3.3-4.5 0-7.9 2.5-7.9 6.3 0 2.6 1.4 4.3 4.6 5.2l3.2.8c2.4.6 3.3 1.6 3.3 3.1 0 2.2-1.8 3.4-4.4 3.4-2.5 0-4.5-1.1-5.5-3.4l-2.9 1.7c1.9 3.7 5.1 5.2 8.9 5.2 5.4 0 9.4-3.3 9.4-8.2 0-3.4-2-5.2-5.2-6.1l-3.1-.8c-2-.5-2.9-1.2-2.9-2.7 0-1.8 1.8-2.9 4-2.9 2.3 0 3.8.8 5.2 2.8l2.9-1.7Zm-2.8 2.8c-1-1.3-2.2-1.9-4-1.9-2.7 0-4 1.2-4 3 0 1.4.8 2.1 3.1 2.8l2.3.7c2.4.7 3.7 1.9 3.7 4 0 2.8-2.1 4.6-5.6 4.6-2.2 0-4.6-1-6.1-3.2l2.1-1.6c1.1 1.4 2.3 2 3.9 2 2.2 0 3.4-.9 3.4-2.4 0-1.5-.8-2.2-3.3-2.9l-2.5-.7c-2.1-.6-3.4-1.8-3.4-3.8 0-2.5 2.2-4.1 5.3-4.1 2.1 0 3.9.9 5.1 2.7l-2.2 1.8Z"
          fill="white"
        />
      </svg>
      <span className={textClassName}>SCALEPILOT</span>
    </div>
  )
}
