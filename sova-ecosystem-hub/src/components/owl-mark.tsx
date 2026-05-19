interface Props {
  className?: string;
}

export function OwlMark({ className }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 6c-7 0-13 5.4-13 12.5v8C11 36 16.8 42 24 42s13-6 13-15.5v-8C37 11.4 31 6 24 6Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="18.5" cy="20" r="3.5" fill="currentColor" />
      <circle cx="29.5" cy="20" r="3.5" fill="currentColor" />
      <circle cx="18.5" cy="20" r="1.2" fill="var(--background)" />
      <circle cx="29.5" cy="20" r="1.2" fill="var(--background)" />
      <path
        d="M22 26.5l2 2 2-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 10l4 4M37 10l-4 4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
