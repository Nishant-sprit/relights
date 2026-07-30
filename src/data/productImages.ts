// High-resolution SVG Data URIs representing the 8 official Relights Gen 3 Smart Staircase Motion Controller Kit photos

const encodeSVG = (svgString: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

// 1. Complete Kit Package Bundle (Controller + 2 PIR Sensors + Wiring Harnesses + Power Leads)
export const PHOTO_1_FULL_KIT = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="100%" height="100%">
  <rect width="1000" height="1000" fill="#f8fafc"/>
  
  <!-- Red and Blue Power Lead Wires -->
  <path d="M 120 850 Q 150 600 200 120" stroke="#ef4444" stroke-width="24" fill="none" stroke-linecap="round"/>
  <path d="M 180 850 Q 220 620 270 120" stroke="#3b82f6" stroke-width="24" fill="none" stroke-linecap="round"/>
  <!-- Exposed copper tips -->
  <line x1="200" y1="120" x2="185" y2="80" stroke="#d97706" stroke-width="20" stroke-linecap="round"/>
  <line x1="270" y1="120" x2="255" y2="80" stroke="#d97706" stroke-width="20" stroke-linecap="round"/>

  <!-- Round Silver PIR Motion Sensors (2 Units) -->
  <g transform="translate(210, 200)">
    <circle cx="0" cy="0" r="48" fill="#e2e8f0" stroke="#94a3b8" stroke-width="6"/>
    <circle cx="0" cy="0" r="32" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
    <circle cx="0" cy="0" r="22" fill="#ffffff" opacity="0.9"/>
    <!-- Mesh pattern -->
    <circle cx="0" cy="0" r="14" fill="#94a3b8" opacity="0.4"/>
  </g>
  <g transform="translate(300, 210)">
    <circle cx="0" cy="0" r="48" fill="#e2e8f0" stroke="#94a3b8" stroke-width="6"/>
    <circle cx="0" cy="0" r="32" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
    <circle cx="0" cy="0" r="22" fill="#ffffff" opacity="0.9"/>
    <circle cx="0" cy="0" r="14" fill="#94a3b8" opacity="0.4"/>
  </g>

  <!-- Sensor Cable Harnesses -->
  <path d="M 210 248 Q 230 400 350 620" stroke="#e2e8f0" stroke-width="16" fill="none"/>
  <path d="M 300 258 Q 320 420 400 630" stroke="#e2e8f0" stroke-width="16" fill="none"/>

  <!-- Large White Cable Bundles (2 Bundled Coils) -->
  <g transform="translate(380, 200)">
    <rect x="0" y="0" width="120" height="420" rx="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="8"/>
    <!-- Wire wraps -->
    <path d="M 10 60 L 110 60 M 10 100 L 110 100 M 10 140 L 110 140 M 10 180 L 110 180 M 10 220 L 110 220 M 10 260 L 110 260 M 10 300 L 110 300 M 10 340 L 110 340 M 10 380 L 110 380" stroke="#94a3b8" stroke-width="5"/>
    <rect x="-10" y="190" width="140" height="40" fill="#0f172a" rx="8"/>
  </g>
  <g transform="translate(520, 200)">
    <rect x="0" y="0" width="120" height="420" rx="40" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="8"/>
    <!-- Wire wraps -->
    <path d="M 10 60 L 110 60 M 10 100 L 110 100 M 10 140 L 110 140 M 10 180 L 110 180 M 10 220 L 110 220 M 10 260 L 110 260 M 10 300 L 110 300 M 10 340 L 110 340 M 10 380 L 110 380" stroke="#94a3b8" stroke-width="5"/>
    <rect x="-10" y="190" width="140" height="40" fill="#0f172a" rx="8"/>
  </g>

  <!-- Controller Box Unit (Vertical orientation in kit view) -->
  <g transform="translate(670, 160)">
    <rect x="0" y="0" width="240" height="620" rx="20" fill="#ffffff" stroke="#cbd5e1" stroke-width="8"/>
    <!-- Green and Orange Terminal Strips -->
    <rect x="-30" y="60" width="30" height="240" fill="#22c55e" rx="4"/>
    <rect x="-30" y="320" width="30" height="240" fill="#f97316" rx="4"/>
    <rect x="240" y="60" width="30" height="240" fill="#22c55e" rx="4"/>
    <rect x="240" y="320" width="30" height="240" fill="#f97316" rx="4"/>

    <!-- Controller Markings -->
    <text x="120" y="120" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#334155">MODEL: V2-STEP-1002</text>
    <text x="120" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748b">POWER: SINGLE STEP &lt;= 18W</text>
    <text x="120" y="170" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#64748b">INPUT: DC12V/DC24V</text>
    <text x="120" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="#0f172a">LED STAIR SENSOR CONTROLLER</text>
    
    <rect x="170" y="240" width="40" height="24" fill="#0284c7" rx="4"/>
    <text x="120" y="256" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#475569">SPEED INDICATOR</text>
    <circle cx="120" cy="300" r="10" fill="#334155"/>
    <text x="120" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#0f172a">STEP</text>
  </g>

  <!-- Banner overlay -->
  <rect x="0" y="900" width="1000" height="100" fill="#0f172a"/>
  <text x="500" y="960" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="#ffffff">Relights Gen 3 Complete 32-Step Controller Kit</text>
</svg>
`);

// 2. Direct Top-Down View of Controller Box (V2-STEP-1002 Specs & Ports)
export const PHOTO_2_CONTROLLER_TOP = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="100%" height="100%">
  <rect width="1000" height="600" fill="#f8fafc"/>

  <!-- Controller Main Chassis -->
  <rect x="80" y="140" width="840" height="320" rx="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="8"/>
  <rect x="40" y="200" width="40" height="200" fill="#ffffff" stroke="#cbd5e1" stroke-width="6" rx="8"/>
  <circle cx="60" cy="300" r="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="6"/>
  <rect x="920" y="200" width="40" height="200" fill="#ffffff" stroke="#cbd5e1" stroke-width="6" rx="8"/>
  <circle cx="940" cy="300" r="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="6"/>

  <!-- Top Terminal Blocks (Green & Orange 1 to 32) -->
  <g transform="translate(160, 90)">
    <rect x="0" y="0" width="160" height="50" fill="#22c55e" rx="4"/>
    <rect x="165" y="0" width="160" height="50" fill="#f97316" rx="4"/>
    <rect x="330" y="0" width="160" height="50" fill="#22c55e" rx="4"/>
    <rect x="495" y="0" width="160" height="50" fill="#f97316" rx="4"/>
    <text x="340" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#ffffff">A SENSOR INTERFACE (17 - 32)</text>
  </g>

  <!-- Bottom Terminal Blocks (Green & Orange 1 to 16) -->
  <g transform="translate(160, 460)">
    <rect x="0" y="0" width="160" height="50" fill="#22c55e" rx="4"/>
    <rect x="165" y="0" width="160" height="50" fill="#f97316" rx="4"/>
    <rect x="330" y="0" width="160" height="50" fill="#22c55e" rx="4"/>
    <rect x="495" y="0" width="160" height="50" fill="#f97316" rx="4"/>
    <text x="340" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#ffffff">B SENSOR INTERFACE (1 - 16)</text>
  </g>

  <!-- Left Input Block -->
  <rect x="90" y="220" width="60" height="160" fill="#1e293b" rx="6"/>
  <text x="120" y="290" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#ffffff" transform="rotate(-90 120 290)">INPUT DC12/24V</text>

  <!-- Center Label & Specs -->
  <text x="420" y="210" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#0f172a">MODEL : V2-STEP-1002</text>
  <text x="420" y="245" font-family="Arial, sans-serif" font-weight="bold" font-size="15" fill="#475569">POWER : SINGLE STEP &lt;= 18W  TOTAL POWER &lt;= 500W</text>
  <text x="420" y="275" font-family="Arial, sans-serif" font-weight="bold" font-size="15" fill="#475569">INPUT : DC12V/DC24V  OUTPUT: DC12V/DC24V</text>
  <text x="420" y="320" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#0284c7">LED STAIR SENSOR CONTROLLER</text>

  <!-- Speed Indicator Display & Buttons -->
  <rect x="640" y="350" width="100" height="36" fill="#0284c7" rx="6"/>
  <text x="690" y="374" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="12" fill="#ffffff">SPEED LIGHT</text>

  <g transform="translate(780, 290)">
    <circle cx="0" cy="0" r="12" fill="#1e293b"/>
    <circle cx="0" cy="40" r="12" fill="#1e293b"/>
    <circle cx="0" cy="80" r="12" fill="#1e293b"/>
    <text x="30" y="45" font-family="Arial, sans-serif" font-weight="extrabold" font-size="16" fill="#0f172a">STEP</text>
  </g>
</svg>
`);

// 3. Real Staircase Application View (32 Channel Sense Light Strip with Warm Glow)
export const PHOTO_3_STAIRCASE_LIGHT = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" width="100%" height="100%">
  <defs>
    <linearGradient id="stairGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff7ed"/>
      <stop offset="50%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
    <filter id="glowBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Marble Wall & Floor Background -->
  <rect width="1000" height="800" fill="#1e293b"/>
  <path d="M 0 0 L 1000 0 L 1000 800 L 0 800 Z" fill="#0f172a"/>

  <!-- Stair Treads with 32 Channel Warm LED Illumination -->
  <g filter="url(#glowBlur)">
    <!-- Stair Step 1 -->
    <path d="M 150 720 L 850 720 L 880 750 L 120 750 Z" fill="#ffedd5"/>
    <line x1="150" y1="720" x2="850" y2="720" stroke="#f97316" stroke-width="12"/>

    <!-- Stair Step 2 -->
    <path d="M 180 640 L 820 640 L 850 670 L 150 670 Z" fill="#ffedd5"/>
    <line x1="180" y1="640" x2="820" y2="640" stroke="#fb923c" stroke-width="12"/>

    <!-- Stair Step 3 -->
    <path d="M 210 560 L 790 560 L 820 590 L 180 590 Z" fill="#ffedd5"/>
    <line x1="210" y1="560" x2="790" y2="560" stroke="#fb923c" stroke-width="12"/>

    <!-- Stair Step 4 -->
    <path d="M 240 480 L 760 480 L 790 510 L 210 510 Z" fill="#ffedd5"/>
    <line x1="240" y1="480" x2="760" y2="480" stroke="#fdba74" stroke-width="12"/>

    <!-- Stair Step 5 -->
    <path d="M 270 400 L 730 400 L 760 430 L 240 430 Z" fill="#ffedd5"/>
    <line x1="270" y1="400" x2="730" y2="400" stroke="#fdba74" stroke-width="12"/>

    <!-- Stair Step 6 -->
    <path d="M 300 320 L 700 320 L 730 350 L 270 350 Z" fill="#ffedd5"/>
    <line x1="300" y1="320" x2="700" y2="320" stroke="#fed7aa" stroke-width="12"/>

    <!-- Stair Step 7 -->
    <path d="M 330 240 L 670 240 L 700 270 L 300 270 Z" fill="#ffedd5"/>
    <line x1="330" y1="240" x2="670" y2="240" stroke="#fed7aa" stroke-width="12"/>
  </g>

  <!-- Person walking silhouette (Sneakers & legs walking up) -->
  <g transform="translate(280, 220)">
    <path d="M 120 280 Q 140 180 180 40 L 220 50 Q 180 200 160 300 Z" fill="#e2e8f0" opacity="0.9"/>
    <path d="M 180 340 Q 220 220 280 80 L 320 90 Q 240 240 220 360 Z" fill="#cbd5e1" opacity="0.9"/>
    <!-- Sneakers -->
    <rect x="110" y="280" width="80" height="35" rx="12" fill="#ffffff"/>
    <rect x="180" y="350" width="85" height="35" rx="12" fill="#ffffff"/>
    <path d="M 110 300 L 190 300" stroke="#eab308" stroke-width="8"/>
    <path d="M 180 370 L 265 370" stroke="#eab308" stroke-width="8"/>
  </g>

  <!-- Header Banner -->
  <rect x="0" y="0" width="1000" height="110" fill="#ffffff"/>
  <text x="50" y="70" font-family="Arial, sans-serif" font-weight="900" font-size="44" fill="#ea580c" letter-spacing="2">32 CHANNEL SENSE LIGHT STRIP</text>
</svg>
`);

// 4. Close-Up Front View of Controller Interface
export const PHOTO_4_FRONT_CLOSEUP = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" width="100%" height="100%">
  <rect width="1000" height="800" fill="#f1f5f9"/>

  <!-- Perspective White Controller Body -->
  <path d="M 150 200 L 850 200 L 850 600 L 150 600 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="8"/>
  
  <!-- Orange and Green Side Terminals -->
  <rect x="80" y="220" width="70" height="180" fill="#22c55e" rx="8"/>
  <rect x="80" y="410" width="70" height="170" fill="#f97316" rx="8"/>
  <rect x="850" y="220" width="70" height="180" fill="#22c55e" rx="8"/>
  <rect x="850" y="410" width="70" height="170" fill="#f97316" rx="8"/>

  <!-- Front Interface Socket Block -->
  <rect x="250" y="460" width="500" height="120" fill="#1e293b" rx="12"/>
  <rect x="280" y="490" width="80" height="60" fill="#0f172a" rx="6"/>
  <rect x="640" y="490" width="80" height="60" fill="#0f172a" rx="6"/>

  <circle cx="500" cy="500" r="16" fill="#334155"/>
  <text x="500" y="545" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="#ffffff">STEP</text>

  <!-- Terminal Labeling on Chassis -->
  <text x="500" y="260" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="18" fill="#64748b">INPUT DC12V / 24V</text>
  <text x="500" y="310" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="26" fill="#0284c7">32 STEP SENSOR CONTROLLER</text>
  <text x="500" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#64748b">SPEED INDICATOR DISPLAY</text>
  
  <rect x="440" y="370" width="120" height="40" fill="#0284c7" rx="6"/>

  <text x="210" y="580" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#0f172a">A SENSOR INTERFACE</text>
  <text x="650" y="580" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="#0f172a">B SENSOR INTERFACE</text>
</svg>
`);

// 5. Technical Wiring & Port Annotations Diagram
export const PHOTO_5_WIRING_DIAGRAM = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" width="100%" height="100%">
  <rect width="1000" height="800" fill="#ffffff"/>

  <!-- Controller Box Center -->
  <rect x="200" y="250" width="600" height="260" rx="12" fill="#f8fafc" stroke="#94a3b8" stroke-width="4"/>
  <rect x="280" y="270" width="120" height="40" fill="#22c55e"/>
  <rect x="400" y="270" width="120" height="40" fill="#f97316"/>
  <rect x="520" y="270" width="120" height="40" fill="#22c55e"/>
  <rect x="640" y="270" width="120" height="40" fill="#f97316"/>

  <rect x="280" y="450" width="120" height="40" fill="#22c55e"/>
  <rect x="400" y="450" width="120" height="40" fill="#f97316"/>
  <rect x="520" y="450" width="120" height="40" fill="#22c55e"/>
  <rect x="640" y="450" width="120" height="40" fill="#f97316"/>

  <!-- Annotations & Pointers -->
  <!-- 1. The input DC12/24V -->
  <line x1="80" y1="370" x2="190" y2="370" stroke="#000" stroke-width="3" marker-end="url(#arrow)"/>
  <text x="70" y="360" font-family="Arial, sans-serif" font-weight="extrabold" font-size="22" fill="#0f172a">The input</text>
  <text x="70" y="410" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#0284c7">DC12/24V</text>
  <text x="70" y="540" font-family="Arial, sans-serif" font-size="18" fill="#475569">transformer</text>
  <text x="70" y="700" font-family="Arial, sans-serif" font-size="18" fill="#475569">The 220v power supply</text>

  <!-- Top Annotations -->
  <text x="310" y="200" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#0f172a">The cathode (-)</text>
  <line x1="340" y1="210" x2="340" y2="260" stroke="#000" stroke-width="2"/>

  <text x="560" y="200" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#0f172a">The anode (+)</text>
  <line x1="590" y1="210" x2="590" y2="260" stroke="#000" stroke-width="2"/>

  <!-- Right Annotations -->
  <text x="820" y="280" font-family="Arial, sans-serif" font-weight="extrabold" font-size="22" fill="#0f172a">A Sensing port</text>
  <line x1="810" y1="280" x2="760" y2="290" stroke="#000" stroke-width="2"/>

  <text x="820" y="530" font-family="Arial, sans-serif" font-weight="extrabold" font-size="22" fill="#0f172a">B Sensing port</text>
  <line x1="810" y1="530" x2="760" y2="470" stroke="#000" stroke-width="2"/>

  <!-- Bottom Annotations -->
  <text x="310" y="580" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#0f172a">The cathode (-)</text>
  <line x1="340" y1="570" x2="340" y2="500" stroke="#000" stroke-width="2"/>

  <text x="560" y="580" font-family="Arial, sans-serif" font-weight="bold" font-size="20" fill="#0f172a">The anode (+)</text>
  <line x1="590" y1="570" x2="590" y2="500" stroke="#000" stroke-width="2"/>
</svg>
`);

// 6. Product Parameters Spec Sheet Card
export const PHOTO_6_PRODUCT_PARAMETERS = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="100%" height="100%">
  <rect width="1000" height="700" fill="#ffffff"/>
  
  <text x="40" y="80" font-family="Arial, sans-serif" font-weight="900" font-size="44" fill="#1e3a8a">Product parameter</text>
  <line x1="40" y1="110" x2="960" y2="110" stroke="#1e3a8a" stroke-width="4"/>

  <!-- Left Illustration -->
  <g transform="translate(60, 160)">
    <!-- Controller unit -->
    <rect x="0" y="100" width="400" height="150" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
    <rect x="20" y="110" width="360" height="20" fill="#22c55e"/>
    <rect x="20" y="220" width="360" height="20" fill="#f97316"/>

    <!-- Sensors -->
    <circle cx="280" cy="30" r="24" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>
    <circle cx="340" cy="30" r="24" fill="#cbd5e1" stroke="#64748b" stroke-width="4"/>

    <!-- Wire harness bundle -->
    <rect x="80" y="290" width="240" height="100" rx="30" fill="#f1f5f9" stroke="#94a3b8" stroke-width="4"/>
  </g>

  <!-- Right Specs List -->
  <g transform="translate(540, 180)">
    <text x="0" y="30" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e293b">Productname: <tspan font-weight="normal">LED Stair Induction Controller</tspan></text>
    <text x="0" y="80" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e293b">Inputvoltage: <tspan font-weight="normal">DC12V/24V</tspan></text>
    <text x="0" y="130" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e293b">Outputvoltage: <tspan font-weight="normal">DC12V24V</tspan></text>
    <text x="0" y="180" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e293b">OutputPower: <tspan font-weight="normal">350W Max</tspan></text>
    <text x="0" y="230" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e293b">Port 32 inductors: <tspan font-weight="normal">2 AB</tspan></text>
    <text x="0" y="280" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e293b">Productsize: <tspan font-weight="normal">LENGTH-185MM</tspan></text>
    <text x="0" y="330" font-family="Arial, sans-serif" font-weight="bold" font-size="24" fill="#1e293b">WIDTH-78MM <tspan font-weight="normal">Height-25MM</tspan></text>
  </g>
</svg>
`);

// 7. Speed & Brightness Setting Instructions Card
export const PHOTO_7_SPEED_SETTINGS = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="100%" height="100%">
  <rect width="1000" height="700" fill="#ffffff"/>

  <!-- Instructions Heading Text -->
  <text x="40" y="60" font-family="Arial, sans-serif" font-weight="bold" font-size="26" fill="#0f172a">Switch short press once adjustable LED speed, a</text>
  <text x="40" y="100" font-family="Arial, sans-serif" font-weight="bold" font-size="26" fill="#0f172a">total of four steps. Speed adjustment was 100% 75%</text>
  <text x="40" y="140" font-family="Arial, sans-serif" font-weight="bold" font-size="26" fill="#0f172a">50% 25% the darker the red light, the faster the</text>
  <text x="40" y="180" font-family="Arial, sans-serif" font-weight="bold" font-size="26" fill="#0f172a">speed, the brighter the red light, the slower the</text>
  <text x="40" y="220" font-family="Arial, sans-serif" font-weight="bold" font-size="26" fill="#0f172a">speed.</text>

  <!-- Controller Diagram with Zoom Lens on Setting Button -->
  <g transform="translate(100, 300)">
    <rect x="0" y="0" width="600" height="240" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="6"/>
    <text x="200" y="140" font-family="Arial, sans-serif" font-weight="bold" font-size="36" fill="#64748b">setting</text>
    
    <circle cx="500" cy="120" r="14" fill="#1e293b"/>
    <circle cx="540" cy="120" r="14" fill="#1e293b"/>
    <circle cx="580" cy="120" r="14" fill="#1e293b"/>
  </g>

  <!-- Zoom Circle on Setting Button -->
  <g transform="translate(750, 320)">
    <circle cx="0" cy="0" r="110" fill="#ffffff" stroke="#e11d48" stroke-width="8"/>
    <circle cx="-40" cy="0" r="20" fill="#1e293b"/>
    <circle cx="0" cy="0" r="20" fill="#1e293b"/>
    <circle cx="40" cy="0" r="20" fill="#1e293b"/>
    <text x="0" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="28" fill="#475569">setting</text>
  </g>
</svg>
`);

// 8. Full Staircase Installation & Wiring Schematic Diagram
export const PHOTO_8_INSTALLATION_SCHEMATIC = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800" width="100%" height="100%">
  <rect width="1000" height="800" fill="#ffffff"/>

  <!-- Architectural Staircase Profile -->
  <path d="M 400 120 L 800 120 L 800 700 L 400 700 Z" fill="#f1f5f9"/>
  <!-- Stair steps -->
  <path d="M 400 650 L 450 650 L 450 600 L 500 600 L 500 550 L 550 550 L 550 500 L 600 500 L 600 450 L 650 450 L 650 400 L 700 400 L 700 350 L 750 350 L 750 300 L 800 300" stroke="#cbd5e1" stroke-width="12" fill="none"/>

  <!-- Left Hardware Components -->
  <!-- 220V Outlet -->
  <rect x="50" y="620" width="80" height="50" fill="#e2e8f0" stroke="#000" stroke-width="2"/>
  <text x="90" y="690" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#000">Power outlet</text>
  <text x="90" y="605" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#000">220v</text>

  <!-- Transformer -->
  <rect x="50" y="480" width="90" height="60" fill="#cbd5e1" stroke="#000" stroke-width="2"/>
  <text x="95" y="565" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#000">transformer</text>

  <!-- Controller Box -->
  <rect x="50" y="260" width="220" height="120" rx="8" fill="#ffffff" stroke="#000" stroke-width="3"/>
  <text x="160" y="330" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="16" fill="#000">LED stair controller</text>

  <!-- Sensors A & B -->
  <circle cx="420" cy="670" r="14" fill="#3b82f6"/>
  <text x="390" y="675" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#ef4444">A</text>

  <circle cx="780" cy="270" r="14" fill="#3b82f6"/>
  <text x="810" y="275" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="#ef4444">B</text>

  <!-- Wiring connections from Controller to steps -->
  <path d="M 270 280 L 450 600" stroke="#3b82f6" stroke-width="3" fill="none"/>
  <path d="M 270 290 L 500 550" stroke="#3b82f6" stroke-width="3" fill="none"/>
  <path d="M 270 300 L 550 500" stroke="#3b82f6" stroke-width="3" fill="none"/>
  <path d="M 270 310 L 600 450" stroke="#d97706" stroke-width="3" fill="none"/>
  <path d="M 270 320 L 650 400" stroke="#d97706" stroke-width="3" fill="none"/>
  <path d="M 270 330 L 700 350" stroke="#d97706" stroke-width="3" fill="none"/>
  <path d="M 270 340 L 750 300" stroke="#d97706" stroke-width="3" fill="none"/>
</svg>
`);

// 3W Concealed Motion Sensor Wall Step Light Photos
export const PHOTO_WALL_LIGHT_FRONT = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="100%" height="100%">
  <rect width="1000" height="1000" fill="#f1f5f9"/>
  <!-- Ambient background wall shadow -->
  <radialGradient id="wallGlow" cx="50%" cy="65%" r="45%">
    <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.9"/>
    <stop offset="50%" stop-color="#fde68a" stop-opacity="0.4"/>
    <stop offset="100%" stop-color="#f1f5f9" stop-opacity="0"/>
  </radialGradient>
  <rect width="1000" height="1000" fill="url(#wallGlow)"/>

  <!-- Light fixture casting warm downward glow -->
  <polygon points="320,530 680,530 880,950 120,950" fill="#fde047" opacity="0.35"/>
  <polygon points="360,530 640,530 820,920 180,920" fill="#fbbf24" opacity="0.4"/>

  <!-- Black Die-Cast Aluminium Wall Step Light Body -->
  <g transform="translate(250, 150)">
    <!-- Outer Black Anodized Aluminium Frame -->
    <rect x="0" y="0" width="500" height="500" rx="32" fill="#1e293b" stroke="#0f172a" stroke-width="16"/>
    <rect x="16" y="16" width="468" height="468" rx="24" fill="#090d16" stroke="#334155" stroke-width="6"/>

    <!-- Inner Recessed Bezel -->
    <rect x="60" y="60" width="380" height="380" rx="16" fill="#182232" stroke="#020617" stroke-width="8"/>

    <!-- PIR Motion Sensor Dome Assembly at Top Center -->
    <circle cx="250" cy="130" r="36" fill="#e2e8f0" stroke="#94a3b8" stroke-width="6"/>
    <circle cx="250" cy="130" r="26" fill="#ffffff"/>
    <!-- Fresnel Lens Facets -->
    <circle cx="250" cy="130" r="16" fill="#cbd5e1" opacity="0.7"/>
    <circle cx="250" cy="130" r="8" fill="#94a3b8"/>

    <!-- Downward Louvered Light Recess Chamber -->
    <rect x="100" y="210" width="300" height="200" rx="12" fill="#0b0f19" stroke="#1e293b" stroke-width="6"/>

    <!-- Louver Angled Fins -->
    <line x1="100" y1="230" x2="400" y2="230" stroke="#1e293b" stroke-width="6"/>
    <line x1="100" y1="255" x2="400" y2="255" stroke="#1e293b" stroke-width="6"/>
    <line x1="100" y1="280" x2="400" y2="280" stroke="#1e293b" stroke-width="6"/>
    <line x1="100" y1="305" x2="400" y2="305" stroke="#1e293b" stroke-width="6"/>
    <line x1="100" y1="330" x2="400" y2="330" stroke="#1e293b" stroke-width="6"/>
    <line x1="100" y1="355" x2="400" y2="355" stroke="#1e293b" stroke-width="6"/>
    <line x1="100" y1="380" x2="400" y2="380" stroke="#1e293b" stroke-width="6"/>

    <!-- Emitting LED Light Strip inside Louver -->
    <rect x="110" y="215" width="280" height="20" rx="4" fill="#fef08a"/>
  </g>

  <!-- Product Labels overlay -->
  <rect x="60" y="60" width="220" height="40" rx="8" fill="#dc2626"/>
  <text x="170" y="86" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#ffffff">3W IP65 FOOT LIGHT</text>
</svg>
`);

export const PHOTO_WALL_LIGHT_RECESSED = encodeSVG(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="100%" height="100%">
  <rect width="1000" height="1000" fill="#0f172a"/>
  <!-- Title -->
  <text x="500" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="28" fill="#38bdf8">Concealed Wall Recess Installation & Dimensions</text>
  <text x="500" y="140" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#94a3b8">Standard 86mm x 86mm Modular Concealed Junction Box Fit</text>

  <!-- Wall Cutout Diagram -->
  <rect x="250" y="220" width="500" height="500" fill="#1e293b" stroke="#334155" stroke-width="8" rx="20"/>
  <rect x="300" y="270" width="400" height="400" fill="#020617" stroke="#dc2626" stroke-dasharray="12 12" stroke-width="4" rx="16"/>

  <!-- Light Fixture Overlay -->
  <rect x="320" y="290" width="360" height="360" fill="#090d16" stroke="#38bdf8" stroke-width="6" rx="20"/>
  <circle cx="500" cy="380" r="30" fill="#ffffff"/>
  <rect x="380" y="440" width="240" height="160" rx="10" fill="#1e293b"/>

  <!-- Dimension Markers -->
  <line x1="250" y1="760" x2="750" y2="760" stroke="#f59e0b" stroke-width="4"/>
  <text x="500" y="800" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#f59e0b">Outer Frame Width: 86 mm</text>

  <line x1="200" y1="220" x2="200" y2="720" stroke="#f59e0b" stroke-width="4"/>
  <text x="140" y="480" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="22" fill="#f59e0b" transform="rotate(-90 140 480)">Height: 86 mm</text>
</svg>
`);

export const OFFICIAL_PRODUCT_PHOTOS = [
  {
    url: PHOTO_1_FULL_KIT,
    title: 'Relights Gen 3 Complete Kit Contents (32 Steps, 3K Sensors, Wiring)',
  },
  {
    url: PHOTO_2_CONTROLLER_TOP,
    title: 'Top-Down Specifications (V2-STEP-1002 500W Controller)',
  },
  {
    url: PHOTO_3_STAIRCASE_LIGHT,
    title: '32 Channel Sense Light Strip - Motion Illumination Demo',
  },
  {
    url: PHOTO_4_FRONT_CLOSEUP,
    title: 'Front View & Terminal Ports (Speed Display & STEP Button)',
  },
  {
    url: PHOTO_5_WIRING_DIAGRAM,
    title: 'Terminal Block Wiring Diagram (DC12V/24V, Anode, Cathode)',
  },
  {
    url: PHOTO_6_PRODUCT_PARAMETERS,
    title: 'Product Parameters Spec Card (185x78x25mm, 350W Max)',
  },
  {
    url: PHOTO_7_SPEED_SETTINGS,
    title: 'Speed & Brightness Control Button Settings Guide',
  },
  {
    url: PHOTO_8_INSTALLATION_SCHEMATIC,
    title: 'Full Staircase System Installation & Wiring Diagram',
  },
];

export const WALL_LIGHT_PHOTOS = [
  {
    url: PHOTO_WALL_LIGHT_FRONT,
    title: '3W Motion Sensor Concealed Wall Step Light - Front View',
  },
  {
    url: PHOTO_WALL_LIGHT_RECESSED,
    title: 'Concealed Modular Box Recessed Mounting & Dimensions (86x86mm)',
  },
];

