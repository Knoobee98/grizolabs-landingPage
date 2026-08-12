import React from 'react';

export const HeroIllustration: React.FC = () => {
  return (
    <div className="w-full max-w-md lg:max-w-lg mx-auto relative flex items-center justify-center">
      {/* SVG Cartoon Vector Scene (Border/Box-free) */}
      <svg
        viewBox="0 0 520 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-xs"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="laptopGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="emeraldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="warmGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Background Elements - Floor & Tech Grid Line */}
        <ellipse cx="260" cy="315" rx="220" ry="18" fill="#EAEAE6" opacity="0.7" />
        <path d="M 60 288 H 460" stroke="#D8D8D4" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* 1. CENTRAL LAPTOP DASHBOARD (Pure UI Visual Shapes) */}
        <g filter="url(#shadow)">
          {/* Laptop Screen Body */}
          <rect x="135" y="60" width="250" height="170" rx="12" fill="url(#laptopGrad)" stroke="#334155" strokeWidth="2" />
          
          {/* Screen Header Bar */}
          <rect x="135" y="60" width="250" height="24" rx="12" fill="#334155" />
          <circle cx="152" cy="72" r="4" fill="#EF4444" />
          <circle cx="164" cy="72" r="4" fill="#F59E0B" />
          <circle cx="176" cy="72" r="4" fill="#10B981" />
          {/* Mock URL bar shape */}
          <rect x="200" y="67" width="120" height="10" rx="5" fill="#1E293B" />

          {/* Dashboard Content Display */}
          <rect x="145" y="92" width="230" height="128" rx="6" fill="#020617" />
          
          {/* Stats Graphic Blocks */}
          <rect x="153" y="100" width="65" height="40" rx="4" fill="#1E293B" stroke="#334155" />
          <rect x="160" y="108" width="30" height="4" rx="2" fill="#64748B" />
          <rect x="160" y="118" width="48" height="8" rx="2" fill="#10B981" />

          <rect x="227" y="100" width="65" height="40" rx="4" fill="#1E293B" stroke="#334155" />
          <rect x="234" y="108" width="30" height="4" rx="2" fill="#64748B" />
          <rect x="234" y="118" width="40" height="8" rx="2" fill="#38BDF8" />

          <rect x="301" y="100" width="65" height="40" rx="4" fill="#1E293B" stroke="#334155" />
          <rect x="308" y="108" width="30" height="4" rx="2" fill="#64748B" />
          <rect x="308" y="118" width="36" height="8" rx="2" fill="#F59E0B" />

          {/* Sales Chart Wave */}
          <path d="M 155 198 Q 175 160, 195 180 T 235 150 T 275 170 T 315 140 T 365 160" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
          <path d="M 155 198 Q 175 160, 195 180 T 235 150 T 275 170 T 315 140 T 365 160 V 212 H 155 Z" fill="url(#emeraldGrad)" opacity="0.18" />

          {/* Laptop Base */}
          <path d="M 105 230 H 415 L 431 245 C 431 247, 425 249, 415 249 H 105 C 95 249, 89 247, 89 245 Z" fill="#64748B" />
          <rect x="230" y="230" width="60" height="5" rx="2.5" fill="#475569" />
        </g>

        {/* 2. CARTOON CHARACTER 1: DEVELOPER / ARCHITECT (Left Side) */}
        <g id="cartoon-developer" filter="url(#shadow)">
          {/* Hair */}
          <path d="M 45 155 C 40 130, 70 120, 80 135 C 90 125, 105 140, 100 160 Z" fill="#1E293B" />
          {/* Head */}
          <circle cx="70" cy="160" r="22" fill="#FDBA74" />
          {/* Glasses */}
          <rect x="57" y="154" width="12" height="10" rx="2" fill="none" stroke="#0F172A" strokeWidth="2" />
          <rect x="71" y="154" width="12" height="10" rx="2" fill="none" stroke="#0F172A" strokeWidth="2" />
          <line x1="69" y1="159" x2="71" y2="159" stroke="#0F172A" strokeWidth="2" />
          {/* Smile */}
          <path d="M 63 170 Q 70 176, 77 170" fill="none" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          {/* Body */}
          <path d="M 40 260 C 40 200, 100 200, 100 260 Z" fill="#047857" />
          <path d="M 63 182 L 70 210 L 77 182 Z" fill="#FFFFFF" />
          {/* Arm Pointing */}
          <path d="M 85 210 Q 115 200, 140 210" fill="none" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" />
        </g>

        {/* 3. CARTOON CHARACTER 2: STORE / CAFE OWNER (Right Side) */}
        <g id="cartoon-owner" filter="url(#shadow)">
          {/* Hair / Hijab */}
          <path d="M 425 145 C 420 125, 465 125, 460 145 C 470 150, 465 180, 455 185 C 425 185, 420 160, 425 145 Z" fill="#D97706" />
          {/* Head */}
          <circle cx="442" cy="160" r="21" fill="#FED7AA" />
          {/* Eyes & Smile */}
          <circle cx="434" cy="158" r="2.5" fill="#451A03" />
          <circle cx="448" cy="158" r="2.5" fill="#451A03" />
          <path d="M 435 168 Q 441 175, 447 168" fill="none" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          {/* Body / Clothes */}
          <path d="M 412 260 C 412 200, 472 200, 472 260 Z" fill="#1E293B" />
          <path d="M 428 205 H 456 V 260 H 428 Z" fill="#B45309" />
          {/* Holding Smartphone */}
          <rect x="380" y="190" width="24" height="42" rx="5" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="383" y="195" width="18" height="30" rx="3" fill="#0284C7" />
          {/* Checkmark in phone */}
          <path d="M 388 210 L 391 213 L 396 207" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arm holding phone */}
          <path d="M 425 215 Q 402 215, 392 208" fill="none" stroke="#FED7AA" strokeWidth="9" strokeLinecap="round" />
        </g>

        {/* 4. FLOATING CARTOON GRAPHIC BADGES (Icons Only, No Text) */}
        
        {/* WhatsApp / Chat Bubble Badge (Top Right) */}
        <g id="badge-chat" filter="url(#shadow)">
          <rect x="385" y="20" width="80" height="44" rx="22" fill="#10B981" />
          <circle cx="410" cy="42" r="12" fill="#FFFFFF" />
          {/* Chat/Check Icon */}
          <path d="M 405 40 C 405 40, 407 38, 409 40 C 411 42, 412 43, 411 45 C 410 47, 406 49, 404 47 C 402 45, 404 42, 405 40 Z" fill="#10B981" />
          <circle cx="438" cy="42" r="6" fill="#D1FAE5" />
          <path d="M 435 42 L 437 44 L 441 40" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Shopping Cart / POS Badge (Top Left) */}
        <g id="badge-pos" filter="url(#shadow)">
          <rect x="25" y="25" width="75" height="44" rx="14" fill="#FFFFFF" stroke="#E2E2DF" strokeWidth="1.5" />
          <rect x="35" y="33" width="28" height="28" rx="8" fill="#F59E0B" />
          {/* Cart Icon Lines */}
          <circle cx="49" cy="47" r="10" fill="#F59E0B" />
          <path d="M 43 43 H 55 L 53 49 H 45 Z" fill="#FFFFFF" />
          <circle cx="46" cy="52" r="1.5" fill="#78350F" />
          <circle cx="52" cy="52" r="1.5" fill="#78350F" />
          <circle cx="78" cy="47" r="8" fill="#FEF3C7" />
          <path d="M 75 47 L 77 49 L 81 45" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Lightning / Fast Deployment Badge (Bottom Center) */}
        <g id="badge-lightning" filter="url(#shadow)">
          <rect x="210" y="262" width="100" height="34" rx="17" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
          <circle cx="230" cy="279" r="10" fill="#ECFDF5" />
          <path d="M 231 272 L 225 280 H 230 L 228 286 L 235 278 H 230 Z" fill="#10B981" />
          {/* Signal Bars */}
          <rect x="255" y="281" width="4" height="6" rx="1" fill="#10B981" />
          <rect x="263" y="278" width="4" height="9" rx="1" fill="#10B981" />
          <rect x="271" y="275" width="4" height="12" rx="1" fill="#10B981" />
          <rect x="279" y="272" width="4" height="15" rx="1" fill="#34D399" />
        </g>
      </svg>
    </div>
  );
};
