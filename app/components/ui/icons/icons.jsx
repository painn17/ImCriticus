import * as React from "react";
export const Placeholder = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeWidth={1.5}
      d="m11.861 5.5 4.207-2.64c1.99-1.248 4.572.188 4.572 2.543v13.194c0 2.355-2.582 3.79-4.572 2.542L12 18.587"
    />
    <path
      stroke={strokeColor}
      strokeWidth={1.5}
      d="M18.446 9.458 7.93 2.86c-1.99-1.249-4.572.187-4.572 2.542v13.194c0 2.355 2.582 3.79 4.572 2.542l10.515-6.597c1.871-1.174 1.871-3.91 0-5.084Z"
    />
  </svg>
);

export const ArrowRightIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M14.43 5.93 20.5 12l-6.07 6.07M3.5 12h16.83"
    />
  </svg>
);

export const VideoPlayIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22 15V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7M2.52 7.11h18.96M8.52 2.11v4.86M15.48 2.11v4.41"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M9.75 14.45v-1.2c0-1.54 1.09-2.17 2.42-1.4l1.04.6 1.04.6c1.33.77 1.33 2.03 0 2.8l-1.04.6-1.04.6c-1.33.77-2.42.14-2.42-1.4z"
    />
  </svg>
);

export const LinkIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.27 12A5.46 5.46 0 0 1 2 8.5C2 5.48 4.47 3 7.5 3h5C15.52 3 18 5.48 18 8.5S15.53 14 12.5 14H10"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20.73 12A5.46 5.46 0 0 1 22 15.5c0 3.02-2.47 5.5-5.5 5.5h-5C8.48 21 6 18.52 6 15.5S8.47 10 11.5 10H14"
    />
  </svg>
);

export const CloseIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.758 7.757 8.485 8.486M7.758 16.243l8.485-8.486"
    />
  </svg>
);

export const LikeIcon = ({ strokeColor = "var(--primary)" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m7.48 18.35 3.1 2.4c.4.4 1.3.6 1.9.6h3.8c1.2 0 2.5-.9 2.8-2.1l2.4-7.3c.5-1.4-.4-2.6-1.9-2.6h-4c-.6 0-1.1-.5-1-1.2l.5-3.2c.2-.9-.4-1.9-1.3-2.2-.8-.3-1.8.1-2.2.7l-4.1 6.1"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.38 18.35v-9.8c0-1.4.6-1.9 2-1.9h1c1.4 0 2 .5 2 1.9v9.8c0 1.4-.6 1.9-2 1.9h-1c-1.4 0-2-.5-2-1.9"
    />
  </svg>
);

export const AddIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 12h12M12 18V6"
    />
  </svg>
);

export const VideoTickIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M22 9v6c0 .22 0 .44-.02.65A4.46 4.46 0 0 0 18.5 14c-1.06 0-2.04.37-2.81.99A4.45 4.45 0 0 0 14 18.5a4.5 4.5 0 0 0 1.66 3.48c-.21.02-.43.02-.66.02H9c-5 0-7-2-7-7V9c0-5 2-7 7-7h6c5 0 7 2 7 7M2.52 7.11h18.96M8.52 2.11v4.86M15.48 2.11v4.41"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M23 18.5a4.5 4.5 0 0 1-1.54 3.38c-.79.7-1.82 1.12-2.96 1.12-1.07 0-2.06-.38-2.83-1.02h-.01A4.5 4.5 0 0 1 14 18.5c0-1.42.65-2.69 1.69-3.51A4.47 4.47 0 0 1 18.5 14c1.41 0 2.66.64 3.48 1.65.64.77 1.02 1.77 1.02 2.85"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m16.75 18.5 1.11 1.11 2.4-2.22"
    />
  </svg>
);

export const StarIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m13.73 3.51 1.76 3.52c.24.49.88.96 1.42 1.05l3.19.53c2.04.34 2.52 1.82 1.05 3.28l-2.48 2.48c-.42.42-.65 1.23-.52 1.81l.71 3.07c.56 2.43-.73 3.37-2.88 2.1l-2.99-1.77c-.54-.32-1.43-.32-1.98 0l-2.99 1.77c-2.14 1.27-3.44.32-2.88-2.1l.71-3.07c.13-.58-.1-1.39-.52-1.81l-2.48-2.48c-1.46-1.46-.99-2.94 1.05-3.28l3.19-.53c.53-.09 1.17-.56 1.41-1.05l1.76-3.52c.96-1.91 2.52-1.91 3.47 0"
    />
  </svg>
);

export const LogoutIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M17.44 14.62 20 12.06 17.44 9.5M9.76 12.06h10.17M11.76 20c-4.42 0-8-3-8-8s3.58-8 8-8"
    />
  </svg>
);

export const SearchIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19M22 22l-2-2"
    />
  </svg>
);

export const UserIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.14 21.62c-.88.26-1.92.38-3.14.38H9c-1.22 0-2.26-.12-3.14-.38.22-2.6 2.89-4.65 6.14-4.65s5.92 2.05 6.14 4.65"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 2H9C4 2 2 4 2 9v6c0 3.78 1.14 5.85 3.86 6.62.22-2.6 2.89-4.65 6.14-4.65s5.92 2.05 6.14 4.65C20.86 20.85 22 18.78 22 15V9c0-5-2-7-7-7m-3 12.17c-1.98 0-3.58-1.61-3.58-3.59S10.02 7 12 7s3.58 1.6 3.58 3.58-1.6 3.59-3.58 3.59"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.58 10.58c0 1.98-1.6 3.59-3.58 3.59s-3.58-1.61-3.58-3.59S10.02 7 12 7s3.58 1.6 3.58 3.58"
    />
  </svg>
);

export const MailIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M17 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v7c0 3.5-2 5-5 5"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m17 9-3.13 2.5c-1.03.82-2.72.82-3.75 0L7 9"
    />
  </svg>
);

export const KeyIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M16.28 13.61a4.15 4.15 0 0 1-4.18 1.03l-2.59 2.58c-.18.19-.55.31-.82.27l-1.2-.16c-.4-.05-.76-.43-.82-.82l-.16-1.2c-.04-.26.09-.63.27-.82l2.58-2.58c-.44-1.43-.1-3.05 1.03-4.18 1.62-1.62 4.26-1.62 5.89 0 1.62 1.61 1.62 4.25 0 5.88M10.45 16.28l-.85-.86"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.395 10.7h.009"
    />
  </svg>
);

export const EyeIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68S5.18 5.8 2.89 9.4c-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68"
    />
  </svg>
);

export const CrossedEyeIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.53 9.47-5.06 5.06a3.576 3.576 0 1 1 5.06-5.06"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.82 5.77C16.07 4.45 14.07 3.73 12 3.73c-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19.79 1.24 1.71 2.31 2.71 3.17M8.42 19.53c1.14.48 2.35.74 3.58.74 3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-.33-.52-.69-1.01-1.06-1.47"
    />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.51 12.7a3.565 3.565 0 0 1-2.82 2.82M9.47 14.53 2 22M22 2l-7.47 7.47"
    />
  </svg>
);

export const FilterIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M5.4 2.1h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3l-4.3 3.8c-.6.5-1 1.5-1 2.3V19c0 .6-.4 1.4-.9 1.7l-1.4.9c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1l-3.8-4c-.5-.5-.9-1.4-.9-2V4.2c0-1.2.9-2.1 2-2.1M10.93 2.1 6 10"
    />
  </svg>
);

export const TickIcon = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.75 12 2.83 2.83 5.67-5.66"
    />
  </svg>
);

export const LogoIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
    <path
      fill="#4BB7FD"
      d="M9.256 15.763 26.78 4.768c3.317-2.08 7.62.312 7.62 4.237v21.99c0 3.925-4.303 6.318-7.62 4.237L9.256 24.237c-3.12-1.957-3.12-6.517 0-8.474"
    />
    <path
      fill="#7B6EF6"
      d="M30.744 15.763 13.22 4.768C9.903 2.688 5.6 5.08 5.6 9.005v21.99c0 3.925 4.303 6.318 7.62 4.237l17.524-10.995c3.12-1.957 3.12-6.517 0-8.474"
    />
  </svg>
);

export const ThankYouIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={120} height={120} {...props}>
    <path
      fill="url(#a)"
      d="M99.3 40.458c0 .75 0 1.5-.05 2.2-7.65-2.85-16.65-1.1-22.65 4.3-4.05-3.65-9.3-5.7-14.9-5.7-12.3 0-22.3 10.05-22.3 22.45 0 14.15 7.1 24.5 13.9 31.2-.55-.05-1-.15-1.4-.3-12.95-4.45-41.9-22.85-41.9-54.15 0-13.8 11.1-24.95 24.8-24.95 8.15 0 15.35 3.9 19.85 9.95 4.55-6.05 11.75-9.95 19.85-9.95 13.7 0 24.8 11.15 24.8 24.95"
    />
    <path
      fill="url(#b)"
      d="M90 47.95c-5.35 0-10.2 2.6-13.2 6.6-3-4-7.8-6.6-13.2-6.6-9.1 0-16.5 7.4-16.5 16.6 0 3.55.55 6.799 1.55 9.799 4.7 14.85 19.15 23.7 26.3 26.151 1 .349 2.65.349 3.7 0 7.15-2.45 21.6-11.301 26.3-26.151 1-3.05 1.55-6.3 1.55-9.8 0-9.2-7.4-16.6-16.5-16.6"
    />
    <defs>
      <linearGradient
        id="a"
        x1={54.65}
        x2={54.65}
        y1={15.508}
        y2={94.908}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF33F7" />
        <stop offset={0.503} stopColor="#B66DFF" />
        <stop offset={1} stopColor="#7B6EF6" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={76.8}
        x2={76.8}
        y1={47.949}
        y2={100.762}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF33F7" />
        <stop offset={0.503} stopColor="#B66DFF" />
        <stop offset={1} stopColor="#7B6EF6" />
      </linearGradient>
    </defs>
  </svg>
);

export const Burger = ({ strokeColor = "#8e95A9", fill = "none" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={22} fill={fill}>
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M2 2h20M2 11h20M2 20h20"
    />
  </svg>
);
