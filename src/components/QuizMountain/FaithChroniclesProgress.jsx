import React, { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation.js';

const FaithChroniclesProgress = ({ 
  chapter = 1, 
  chapter8Unlocked = false, 
  status = "progress" 
}) => {
  const { t } = useTranslation();
  const getLambPosition = () => {
    const positions = [
      { x: 180, y: 570 }, { x: 140, y: 550 }, { x: 180, y: 530 }, { x: 220, y: 510 },
      { x: 250, y: 490 }, { x: 230, y: 450 }, { x: 202, y: 390 }, { x: 202, y: 250 }
    ];
    if (status === "defeat") return { x: 202, y: 570 };
    if (status === "victory" && chapter8Unlocked) return positions[7];
    return positions[Math.min(chapter - 1, 6)];
  };

  const position = getLambPosition();
  const lambAnimation = status === "defeat" ? "defeat" : "normal";

  const DefsModule = () => (
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e8f5f3"/>
        <stop offset="100%" stopColor="#d0ede8"/>
      </linearGradient>
      
      <linearGradient id="mountain" x1="30%" y1="0%" x2="70%" y2="100%">
        <stop offset="0%" stopColor="#ffffff"/>
        <stop offset="15%" stopColor="#f0f8f6"/>
        <stop offset="40%" stopColor="#5a8a7a"/>
        <stop offset="70%" stopColor="#4a736a"/>
        <stop offset="100%" stopColor="#3d5f58"/>
      </linearGradient>
      
      <linearGradient id="golden" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f4d03f" stopOpacity="0.8"/>
        <stop offset="50%" stopColor="#e67e22" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#d35400" stopOpacity="0.7"/>
      </linearGradient>
      
      <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#a8bc3e"/>
        <stop offset="50%" stopColor="#8fa832"/>
        <stop offset="100%" stopColor="#7a9428"/>
      </linearGradient>
      
      <linearGradient id="path" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#d4d4d4" stopOpacity="0.6"/>
      </linearGradient>
      
      <filter id="glow">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>
  );

  const BackgroundModule = () => (
    <g id="background">
      <rect width="405" height="720" fill="url(#sky)"/>
      <polygon points="0,420 80,320 160,370 240,290 320,350 405,310 405,720 0,720" fill="#b8d4ce" opacity="0.6"/>
      <polygon points="0,450 100,350 200,390 300,330 405,370 405,720 0,720" fill="#9fc2b8" opacity="0.7"/>
    </g>
  );

  const CloudBaseModule = () => (
    <g id="cloudBase">
      <g fill="#ffffff" opacity="0.9">
        <circle cx="202" cy="580" r="80"/>
        <circle cx="150" cy="590" r="60"/>
        <circle cx="254" cy="590" r="60"/>
        <circle cx="120" cy="600" r="45"/>
        <circle cx="284" cy="600" r="45"/>
        <circle cx="180" cy="610" r="35"/>
        <circle cx="224" cy="610" r="35"/>
        <circle cx="202" cy="620" r="50"/>
      </g>
      
      <g fill="#ffffff" opacity="0.85">
        <circle cx="100" cy="600" r="70"/>
        <circle cx="60" cy="610" r="55"/>
        <circle cx="140" cy="610" r="50"/>
        <circle cx="40" cy="620" r="40"/>
        <circle cx="120" cy="630" r="45"/>
        <circle cx="80" cy="640" r="35"/>
        <circle cx="100" cy="650" r="30"/>
      </g>
      
      <g fill="#ffffff" opacity="0.85">
        <circle cx="304" cy="600" r="70"/>
        <circle cx="344" cy="610" r="55"/>
        <circle cx="264" cy="610" r="50"/>
        <circle cx="364" cy="620" r="40"/>
        <circle cx="284" cy="630" r="45"/>
        <circle cx="324" cy="640" r="35"/>
        <circle cx="304" cy="650" r="30"/>
      </g>
      
      <g fill="#f0f0f0" opacity="0.7">
        <circle cx="50" cy="620" r="60"/>
        <circle cx="20" cy="630" r="45"/>
        <circle cx="80" cy="635" r="40"/>
        <circle cx="354" cy="620" r="60"/>
        <circle cx="384" cy="630" r="45"/>
        <circle cx="324" cy="635" r="40"/>
      </g>
      
      <g fill="#f8f9fa" opacity="0.7">
        <circle cx="202" cy="590" r="70"/>
        <circle cx="160" cy="600" r="50"/>
        <circle cx="244" cy="600" r="50"/>
        <circle cx="130" cy="610" r="35"/>
        <circle cx="274" cy="610" r="35"/>
        <circle cx="202" cy="625" r="40"/>
        <circle cx="180" cy="635" r="30"/>
        <circle cx="224" cy="635" r="30"/>
        <circle cx="202" cy="645" r="35"/>
      </g>
      
      <g fill="#e8e8e8" opacity="0.5">
        <ellipse cx="202" cy="660" rx="180" ry="40"/>
        <ellipse cx="100" cy="670" rx="120" ry="30"/>
        <ellipse cx="304" cy="670" rx="120" ry="30"/>
        <ellipse cx="202" cy="680" rx="200" ry="35"/>
      </g>
      
      <animateTransform attributeName="transform" type="scale" 
                     values="1,1; 1.02,0.98; 1,1; 0.98,1.02; 1,1" 
                     dur="15s" repeatCount="indefinite"/>
    </g>
  );

  const MountainModule = () => (
    <g id="mountain">
      <polygon points="50,600 75,450 202,250 330,400 355,600" fill="url(#mountain)"/>
      
      <path d="M 30,600 Q 50,580 70,550 Q 90,520 110,490 Q 130,460 150,440 Q 170,430 180,425 Q 190,430 210,440 Q 230,460 250,490 Q 270,520 290,550 Q 310,580 330,600 Z" 
            fill="#5a8a7a" opacity="0.8"/>
      
      <polygon points="150,420 202,250 250,400 220,440 180,460" fill="url(#golden)"/>
      <polygon points="80,470 120,420 160,450 130,500" fill="url(#golden)" opacity="0.6"/>
      <polygon points="280,420 310,390 340,480 310,520" fill="url(#golden)" opacity="0.7"/>
      
      <polygon points="180,280 202,250 224,280 214,300 190,300" fill="#ffffff" opacity="0.9"/>
      <polygon points="170,300 202,250 234,300 224,320 180,320" fill="#f8f9fa" opacity="0.7"/>
      
      <polygon points="202,250 330,400 355,600 325,580 300,390 202,250" fill="#2c463e" opacity="0.3"/>
      <polygon points="50,600 75,450 202,250 180,260 90,440 70,580" fill="#1a2e28" opacity="0.2"/>
    </g>
  );

  const GroundModule = () => (
    <g id="ground">
      <path d="M 5,585 Q 40,560 70,565 Q 100,568 130,570 Q 160,572 180,565 Q 202,560 224,565 Q 244,570 274,568 Q 304,566 334,565 Q 364,560 400,585 Q 364,610 334,605 Q 304,602 274,600 Q 244,602 224,605 Q 202,610 180,605 Q 160,602 130,600 Q 100,602 70,605 Q 40,610 5,585 Z" 
            fill="url(#ground)"/>
    </g>
  );

  const TreesModule = () => (
    <g id="trees" fill="#2d4a3a" opacity="0.9">
      <polygon points="80,550 85,490 90,550"/>
      <polygon points="110,560 115,510 120,560"/>
      <polygon points="290,560 295,520 300,560"/>
      <polygon points="320,555 325,525 330,555"/>
      <polygon points="180,570 183,550 186,570"/>
      <polygon points="220,565 223,545 226,565"/>
    </g>
  );

  const PathModule = () => (
    <g id="path">
      <path d="M 80,570 Q 120,550 160,530 Q 202,510 244,490 Q 280,470 260,430 Q 240,390 202,370 Q 164,350 144,310 Q 124,280 164,260 Q 185,255 202,250" 
            stroke="url(#path)" strokeWidth="2" fill="none" strokeDasharray="8,4" opacity="0.8"/>
    </g>
  );

  const QuizPointsModule = () => (
    <g id="quiz-points">
      <circle cx="80" cy="570" r="8" fill="#3498db" stroke="#fff" strokeWidth="2">
        <animate attributeName="r" values="8;12;8;12;8;12;8" dur="6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="140" cy="550" r="6" fill={chapter >= 2 ? "#3498db" : "#95a5a6"} stroke="#fff" strokeWidth="1"/>
      <circle cx="202" cy="530" r="6" fill={chapter >= 3 ? "#3498db" : "#95a5a6"} stroke="#fff" strokeWidth="1"/>
      <circle cx="264" cy="510" r="6" fill={chapter >= 4 ? "#3498db" : "#95a5a6"} stroke="#fff" strokeWidth="1"/>
      <circle cx="280" cy="470" r="6" fill={chapter >= 5 ? "#3498db" : "#95a5a6"} stroke="#fff" strokeWidth="1"/>
      <circle cx="255" cy="430" r="6" fill={chapter >= 6 ? "#3498db" : "#95a5a6"} stroke="#fff" strokeWidth="1"/>
      <circle cx="202" cy="390" r="6" fill={chapter >= 7 ? "#3498db" : "#95a5a6"} stroke="#fff" strokeWidth="1"/>
      <circle cx="149" cy="350" r="6" fill="#95a5a6" stroke="#fff" strokeWidth="1" opacity="0.7"/>
      <circle cx="180" cy="310" r="6" fill="#95a5a6" stroke="#fff" strokeWidth="1" opacity="0.7"/>
      
      {chapter8Unlocked && (
        <circle cx="202" cy="250" r="12" fill="#f1c40f" stroke="#fff" strokeWidth="4" filter="url(#glow)">
          <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite"/>
        </circle>
      )}
    </g>
  );

  const DefaiteModule = () => (
    <g id="defaite-module">
      <g transform="translate(320, 400)">
        <rect x="-2" y="25" width="4" height="30" fill="#8B4513"/>
        <rect x="-15" y="50" width="30" height="8" fill="#8B4513"/>
        <circle r="25" fill="#ffffff" stroke="#000" strokeWidth="2"/>
        <circle r="20" fill="#ff4444"/>
        <circle r="15" fill="#ffffff"/>
        <circle r="10" fill="#ff4444"/>
        <circle r="5" fill="#ffffff"/>
        <circle r="2" fill="#ff4444"/>
      </g>

      <g>
        <line x1="-12" y1="0" x2="28" y2="0" stroke="#8B4513" strokeWidth="4" strokeLinecap="round"/>
        <polygon points="40,0 28,-6 28,6" fill="#C0C0C0" stroke="#999" strokeWidth="1"/>
        <g transform="translate(-12,0)">
          <polygon points="0,-4 -12,-6 -10,0 -12,6 0,4" fill="#8B4513" stroke="#654321" strokeWidth="0.5"/>
        </g>
        
        <g opacity="0.6">
          <line x1="-80" y1="-3" x2="-40" y2="-2" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
          <line x1="-70" y1="0" x2="-30" y2="1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="-85" y1="3" x2="-45" y2="2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <line x1="-75" y1="-1" x2="-35" y2="0" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
        </g>
        
        <animateTransform attributeName="transform" type="translate"
          values="50,350; 150,380; 250,410; 350,440; 450,470" dur="3s" repeatCount="indefinite"/>
      </g>

      <g opacity="0.7">
        <g>
          <line x1="180" y1="300" x2="175" y2="350" stroke="#87CEEB" strokeWidth="1.5" strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="translate"
            values="0,0; -5,100; -10,200; -15,300; -20,400" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.8;0" dur="1.5s" repeatCount="indefinite"/>
        </g>
        <g>
          <line x1="220" y1="320" x2="215" y2="370" stroke="#87CEEB" strokeWidth="1" strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="translate"
            values="0,0; 10,80; 20,160; 30,240; 40,320" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.7;0" dur="1.8s" repeatCount="indefinite"/>
        </g>
        <g>
          <line x1="200" y1="280" x2="195" y2="330" stroke="#87CEEB" strokeWidth="1.2" strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="translate"
            values="0,0; 2,120; 4,240; 6,360; 8,480" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.6;0" dur="2s" repeatCount="indefinite"/>
        </g>
        <g>
          <line x1="160" y1="310" x2="155" y2="360" stroke="#87CEEB" strokeWidth="1" strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="translate"
            values="0,0; -8,90; -16,180; -24,270; -32,360" dur="1.7s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.5;0" dur="1.7s" repeatCount="indefinite"/>
        </g>
        <g>
          <line x1="240" y1="295" x2="235" y2="345" stroke="#87CEEB" strokeWidth="1.3" strokeLinecap="round"/>
          <animateTransform attributeName="transform" type="translate"
            values="0,0; 12,110; 24,220; 36,330; 48,440" dur="1.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.4;0" dur="1.6s" repeatCount="indefinite"/>
        </g>
      </g>

      <g transform="translate(202, 150)">
        <rect x="-60" y="-15" width="120" height="30" fill="#ffffff" 
              stroke="#cccccc" strokeWidth="1" rx="8" opacity="0.9"/>
        <text x="0" y="0" textAnchor="middle" fill="#666666" fontSize="14">
          Hahhhh...
        </text>
      </g>
    </g>
  );

  const JeanClaudeModule = () => (
    <g id="lamb" transform={`translate(${position.x}, ${position.y}) ${
      status === "defeat" ? "rotate(180) scale(2)" : 
      lambAnimation === "looking" ? "scale(1.65)" : "scale(1.5)"
    }`}>
      <circle r="12" fill="#fff" stroke="#d0d0d0"/>
      <circle cx="-8" cy="-4" r="3" fill="#fff" stroke="#d0d0d0" strokeWidth="0.5"/>
      <circle cx="8" cy="-4" r="3" fill="#fff" stroke="#d0d0d0" strokeWidth="0.5"/>
      <circle cx="-6" cy="6" r="2.5" fill="#fff" stroke="#d0d0d0" strokeWidth="0.5"/>
      <circle cx="6" cy="6" r="2.5" fill="#fff" stroke="#d0d0d0" strokeWidth="0.5"/>
      
      <circle cy="3" r="5" fill="#8B4513"/>
      
      <g transform="rotate(30)">
        <ellipse cx="-5" cy="0" rx="1.8" ry="3" fill="#8B4513"/>
        <ellipse cx="-5" cy="0" rx="0.8" ry="1.5" fill="#ffb3ba"/>
      </g>
      <g transform="rotate(-30)">
        <ellipse cx="5" cy="0" rx="1.8" ry="3" fill="#8B4513"/>
        <ellipse cx="5" cy="0" rx="0.8" ry="1.5" fill="#ffb3ba"/>
      </g>
      
      <circle cx="-1.5" cy={lambAnimation === "looking" ? "1" : "2"} r="1" fill="#000"/>
      <circle cx="1.5" cy={lambAnimation === "looking" ? "1" : "2"} r="1" fill="#000"/>
      <circle cx="-1.2" cy={lambAnimation === "looking" ? "0.7" : "1.7"} r="0.4" fill="#fff"/>
      <circle cx="1.8" cy={lambAnimation === "looking" ? "0.7" : "1.7"} r="0.4" fill="#fff"/>
      
      <ellipse cy="5" rx="0.8" ry="0.5" fill="#ffb3ba"/>
      
      {/* Point d'interrogation au-dessus de la tête au chapitre 1 */}
      {status === "progress" && chapter === 1 && (
        <text x="0" y="-18" textAnchor="middle" fill="#4a90e2" fontSize="16" fontWeight="bold">
          ?
          <animate attributeName="opacity" values="0;0;0;1;1;1;0;0;0;0" dur="12s" repeatCount="indefinite"/>
        </text>
      )}
      
      {status === "victory" && (
        <g>
          <ellipse cx="0" cy="-15" rx="8" ry="2" fill="none" stroke="#FFD700" strokeWidth="1.5" opacity="0.8">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite"/>
          </ellipse>
          
          <g>
            <text x="12" y="-8" fill="#FFD700" fontSize="8">✦</text>
            <animateTransform attributeName="transform" type="rotate" 
                           values="0 0 0; 360 0 0" dur="8s" repeatCount="indefinite"/>
          </g>
          <g>
            <text x="-12" y="-8" fill="#FFFF99" fontSize="6">✧</text>
            <animateTransform attributeName="transform" type="rotate" 
                           values="120 0 0; 480 0 0" dur="8s" repeatCount="indefinite"/>
          </g>
          <g>
            <text x="0" y="-18" fill="#FFD700" fontSize="7">✦</text>
            <animateTransform attributeName="transform" type="rotate" 
                           values="240 0 0; 600 0 0" dur="8s" repeatCount="indefinite"/>
          </g>
        </g>
      )}
      
      <circle cx="-4" cy="11" r="2" fill="#8B4513"/>
      <circle cx="4" cy="11" r="2" fill="#8B4513"/>
      <ellipse cx="-4" cy="12" rx="1.5" ry="0.8" fill="#2F4F4F"/>
      <ellipse cx="4" cy="12" rx="1.5" ry="0.8" fill="#2F4F4F"/>
      
      {/* Animation complète - avance, pause avec ?, revient, sautille */}
      {status === "progress" && chapter === 1 && (
        <animateTransform attributeName="transform" 
                       type="translate"
                       values="0,0; 0,0; -70,0; -70,0; -70,0; -70,0; 0,0; 0,0; 0,-2; 0,0" 
                       dur="12s" 
                       repeatCount="indefinite" 
                       additive="sum"/>
      )}
      
      {/* Sautillement normal pour les autres chapitres */}
      {status !== "defeat" && !(status === "progress" && chapter === 1) && (
        <animateTransform attributeName="transform" 
                       type="translate"
                       values="0,0; 0,-2; 0,0; 0,-1; 0,0" 
                       dur="4s" 
                       repeatCount="indefinite" 
                       additive="sum"/>
      )}
      
      {status === "defeat" && (
        <animateTransform attributeName="transform" 
                       type="rotate"
                       values="0; -8; 5; -3; 0" 
                       dur="2.5s" 
                       repeatCount="indefinite" 
                       additive="sum"/>
      )}
    </g>
  );

  const SunModule = () => (
    <g id="sun" transform="translate(330, 100)">
      <g stroke="#FFD700" strokeWidth="3" strokeLinecap="round" opacity="0.7">
        <line y1="-50" y2="-70"/>
        <line y1="50" y2="70"/>
        <line x1="-50" x2="-70"/>
        <line x1="50" x2="70"/>
        <line x1="-35" y1="-35" x2="-50" y2="-50"/>
        <line x1="35" y1="-35" x2="50" y2="-50"/>
        <line x1="-35" y1="35" x2="-50" y2="50"/>
        <line x1="35" y1="35" x2="50" y2="50"/>
        <animateTransform attributeName="transform" type="rotate" 
                       values="0; 360" dur="60s" repeatCount="indefinite"/>
      </g>
      
      <circle r="25" fill="#FFD700">
        <animate attributeName="r" values="25;28;25" dur="6s" repeatCount="indefinite"/>
      </circle>
      <circle r="15" fill="#FFFF99" opacity="0.8">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="-3" cy="-3" r="4" fill="#fff" opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.6;0.9" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>
  );

  const FloatingCloudsModule = () => (
    <g id="floating-clouds" fill="#ffffff">
      <g>
        <circle cx="60" cy="620" r="20"/>
        <circle cx="45" cy="630" r="16"/>
        <circle cx="75" cy="630" r="14"/>
        <circle cx="60" cy="640" r="12"/>
        <animateTransform attributeName="transform" type="translate" 
                       values="0,0; -5,2; 0,0; 3,-1; 0,0" 
                       dur="8s" repeatCount="indefinite"/>
      </g>
      
      <g>
        <circle cx="344" cy="620" r="20"/>
        <circle cx="359" cy="630" r="16"/>
        <circle cx="329" cy="630" r="14"/>
        <circle cx="344" cy="640" r="12"/>
        <animateTransform attributeName="transform" type="translate" 
                       values="0,0; 5,-2; 0,0; -3,1; 0,0" 
                       dur="10s" repeatCount="indefinite"/>
      </g>
      
      <g>
        <circle cx="15" cy="585" r="18"/>
        <circle cx="5" cy="590" r="14"/>
        <circle cx="25" cy="590" r="16"/>
      </g>
      
      <g>
        <circle cx="390" cy="585" r="18"/>
        <circle cx="400" cy="590" r="14"/>
        <circle cx="380" cy="590" r="16"/>
      </g>
      
      <g fill="#ffffff">
        <g>
          <circle cx="150" cy="520" r="10"/>
          <circle cx="144" cy="526" r="8"/>
          <circle cx="156" cy="526" r="7"/>
          <animateTransform attributeName="transform" type="translate" 
                         values="0,0; 2,-1; 0,0; -1,1; 0,0" 
                         dur="6s" repeatCount="indefinite"/>
        </g>
        
        <g>
          <circle cx="260" cy="545" r="12"/>
          <circle cx="252" cy="552" r="9"/>
          <circle cx="268" cy="553" r="10"/>
          <animateTransform attributeName="transform" type="translate" 
                         values="0,0; -2,1; 0,0; 1,-1; 0,0" 
                         dur="8s" repeatCount="indefinite"/>
        </g>
      </g>
      <g fill="#ffffff" opacity="0.3">
        <circle cx="120" cy="555" r="12"/>
        <circle cx="130" cy="558" r="8"/>
        <circle cx="280" cy="555" r="12"/>
        <circle cx="270" cy="558" r="8"/>
        <circle cx="80" cy="560" r="15"/>
        <circle cx="90" cy="565" r="10"/>
        <circle cx="320" cy="560" r="15"/>
        <circle cx="310" cy="565" r="10"/>
        <circle cx="160" cy="550" r="10"/>
        <circle cx="170" cy="555" r="6"/>
        <circle cx="240" cy="550" r="10"/>
        <circle cx="230" cy="555" r="6"/>
        <circle cx="45" cy="580" r="10"/>
        <circle cx="55" cy="584" r="7"/>
        <circle cx="360" cy="580" r="10"/>
        <circle cx="350" cy="584" r="7"/>
      </g>
    </g>
  );

  const SkyCloudsModule = () => (
    <g id="sky-clouds">
      <g opacity="0.8">
        <circle r="25" fill="#fff"/>
        <circle cx="20" cy="-5" r="30" fill="#fff"/>
        <circle cx="45" cy="0" r="20" fill="#fff"/>
        <circle cx="35" cy="15" r="18" fill="#fff"/>
        <circle cx="10" cy="12" r="22" fill="#fff"/>
        <circle cx="-15" cy="8" r="15" fill="#fff"/>
        <animateTransform attributeName="transform" type="translate" 
                       values="-80,120; 480,110" dur="45s" repeatCount="indefinite"/>
      </g>
      
      <g opacity="0.6">
        <circle r="12" fill="#fff"/>
        <circle cx="10" cy="-2" r="14" fill="#fff"/>
        <circle cx="18" cy="1" r="10" fill="#fff"/>
        <circle cx="12" cy="8" r="8" fill="#fff"/>
        <animateTransform attributeName="transform" type="translate" 
                       values="-50,90; 450,85" dur="60s" repeatCount="indefinite"/>
      </g>
    </g>
  );

  const BirdsModule = () => (
    <g id="birds">
      <g>
        <path d="M -8,-2 L 0,0 L 8,-2" stroke="#2c3e50" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="translate" 
                       values="320,180; 350,220; 340,300; 280,350; 200,340; 150,280; 160,200; 220,150; 320,180" 
                       dur="25s" repeatCount="indefinite"/>
      </g>
      
      <g opacity="0.8">
        <path d="M -4,-1 L 0,0 L 4,-1" stroke="#34495e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M -7,-1 L -3,0 L 1,-1" stroke="#34495e" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <path d="M 3,-1 L 7,0 L 11,-1" stroke="#34495e" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        <animateTransform attributeName="transform" type="translate" 
                       values="50,150; 150,120; 250,130; 350,140; 380,160; 350,180; 250,170; 150,160; 50,150" 
                       dur="30s" repeatCount="indefinite"/>
      </g>
    </g>
  );

  return (
    <div className="w-full h-full bg-gradient-to-b from-blue-100 to-green-100 overflow-hidden">
      <svg width="405" height="720" viewBox="0 0 405 720" className="w-full h-full">
        <DefsModule />
        <BackgroundModule />
        <CloudBaseModule />
        <MountainModule />
        <GroundModule />
        <TreesModule />
        <PathModule />
        <QuizPointsModule />
        <FloatingCloudsModule />
        {status === "defeat" && <DefaiteModule />}
        <JeanClaudeModule />
        <SunModule />
        <SkyCloudsModule />
        <BirdsModule />
      </svg>
      
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {t('mountain.chapter')} {chapter}/7 {chapter8Unlocked ? `+ ${t('mountain.secret')}` : ""}
          </span>
          <span className="text-sm text-gray-500">
            {status === "victory" ? t('mountain.status.victory') : 
             status === "defeat" ? t('mountain.status.defeat') : 
             t('mountain.status.inProgress')}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(chapter / 7) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FaithChroniclesProgress;