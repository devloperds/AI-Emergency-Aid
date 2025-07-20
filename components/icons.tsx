import React from 'react';

interface IconProps {
  className?: string;
}

export const BatteryIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.67 4H14V2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4.33C3.6 4 3 4.6 3 5.33v15.33C3 21.4 3.6 22 4.33 22h11.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
  </svg>
);

export const WifiIcon: React.FC<IconProps> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
  </svg>
);
