export default function AbstractBackground() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.18) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 1600"  
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >

        <path
          d="M100 450 C 350 150, 550 650, 850 350 S 1100 100, 1150 350"
          stroke="url(#grad1)"
          strokeWidth="2"
          fill="none"
        />

        <circle cx="520" cy="320" r="6" fill="#7C3AED" />
        <circle cx="520" cy="320" r="18" fill="#7C3AED" opacity="0.15" />

        <rect
          x="600"
          y="280"
          width="18"
          height="18"
          fill="#A78BFA"
          transform="rotate(45 609 289)"
        />

        <rect x="900" y="200" width="6" height="120" rx="3" fill="#8B5CF6" />
        <path
          d="M120 1050 
             C 320 750, 520 1350, 760 1050 
             S 1050 780, 1150 980"
          stroke="url(#grad2)"
          strokeWidth="2"
          fill="none"
        />

        <circle cx="480" cy="940" r="6" fill="#6366F1" />
        <circle cx="480" cy="940" r="20" fill="#6366F1" opacity="0.14" />

        <circle cx="720" cy="1080" r="5" fill="#8B5CF6" />
        <circle cx="720" cy="1080" r="16" fill="#8B5CF6" opacity="0.12" />

 
        <rect
          x="560"
          y="980"
          width="20"
          height="20"
          fill="#A78BFA"
          transform="rotate(45 570 990)"
        />
        <rect
          x="590"
          y="1010"
          width="14"
          height="14"
          fill="#7C3AED"
          transform="rotate(45 597 1017)"
        />

        <rect x="960" y="900" width="6" height="180" rx="3" fill="#8B5CF6" />


        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="1200" y2="0">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#A78BFA" />
          </linearGradient>

          <linearGradient id="grad2" x1="0" y1="0" x2="1200" y2="0">
            <stop stopColor="#34D399" />
            <stop offset="1" stopColor="#818CF8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
