export const FireIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={active ? '#f97316' : 'none'}
    stroke={active ? '#f97316' : '#9ca3af'}
    strokeWidth={active ? '0' : '2'}
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Current Score"
  >
    <path d="M12 1c-1.5 2-4.5 5-4.5 8 0 1.5.5 2.5 1.5 3.5-.5-2.5 1.5-4.5 2-6 2.5 2 4.5 4.5 4.5 7.5 0 3.5-2.5 6-5.5 6S4.5 17.5 4.5 14c0-2.5 1.5-5 2.5-6.5C5.5 9 3 11.5 3 14c0 5 4 9 9 9s9-4 9-9c0-5-5-9-9-13z" />
  </svg>
);

export const TrophyIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={active ? '#eab308' : 'none'}
    stroke={active ? '#eab308' : '#9ca3af'}
    strokeWidth={active ? '0' : '2'}
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Best Score"
  >
    <path d="M6 2a2 2 0 0 0-2 2v4a8 8 0 0 0 7.3 7.97V19H8.5a1 1 0 0 0 0 2h7a1 1 0 0 0 0-2h-2.8v-3.03A8 8 0 0 0 20 8V4a2 2 0 0 0-2-2H6zm12 6a6 6 0 0 1-12 0V4h12v4z" />
  </svg>
);
