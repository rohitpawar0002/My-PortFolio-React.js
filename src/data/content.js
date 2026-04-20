/** Portfolio content sourced from resume */

export const profile = {
  name: 'Rohit Pawar',
  title: 'Software Developer',
  /** Hero intro line (reference-style greeting). */
  greeting: "Hello, it's me",
  /** Shown before the highlighted role, e.g. "And I'm an". */
  roleLeadIn: "And I'm an",
  tagline:
    'Building real-time dashboards, GPS tracking mobile apps, and scalable REST APIs with Angular, React.js, Ionic, Node.js, and MS SQL.',
  location: 'Pune, India',
  phone: '+91 9730023006',
  email: 'rohitt.pawar02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rohit-pawar-661aa2228',
  /** Optional — set your GitHub URL when available. */
  github: '',
  /** Served from `public/` — see `public/profile-photo.png`. */
  photo: '/profile-photo.png',
}

export const summary = [
  'Angular Developer with experience building real-time dashboards, GPS tracking mobile applications, and scalable REST APIs using Angular, TypeScript, Ionic, Node.js, and MS SQL.',
  'Proficient in leveraging Cursor AI to accelerate feature delivery, build and optimize React.js components, and enhance application performance.',
  'Skilled in responsive UI components, third-party API integration, and location-based applications. Experienced collaborating with cross-functional teams to deliver scalable, high-performance software.',
]

export const skills = [
  'Angular',
  'React.js',
  'Ionic',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Express.js',
  'REST APIs',
  'MS SQL',
  'HTML',
  'CSS',
  'SCSS',
  'Bootstrap',
  'Capacitor',
  'GitLab',
  'Postman',
  'Cursor AI',
  'Google Maps API',
]

export const experience = [
  {
    company: 'Nueotel Communication Pvt. Ltd',
    location: 'Hinjawadi, India',
    role: 'Junior Software Developer',
    period: 'Sep 2024 — Present',
    stack:
      'Angular 16+, TypeScript, Ionic, Capacitor, Node.js, Express.js, MS SQL, REST APIs, Google Maps API, Razorpay, Cursor AI',
    highlights: [
      'Built and optimized real-time Angular dashboards for 5+ government monitoring modules with Google Maps and live REST APIs.',
      'Engineered Trackzia GPS tracking app (Ionic, Capacitor) with geofencing, push notifications, and Cart / Add-to-Cart using Cursor AI.',
      'Designed 10+ reusable UI components (Angular, TypeScript, HTML, SCSS, Bootstrap) for desktop and mobile.',
      'Integrated Razorpay for secure digital payments in the mobile app.',
      'Delivered SMW (Solid Waste Management) iOS app for municipal vehicle monitoring with GPS tracking.',
      'Developed 15+ REST API endpoints (Node.js, Express, MS SQL) for secure CRUD and data management.',
    ],
  },
  {
    company: 'Nuevas Technologies Pvt Ltd',
    location: 'Hinjawadi, India',
    role: 'Software Developer Intern',
    period: 'Jan 2024 — Aug 2024',
    stack: 'Angular, TypeScript, HTML, CSS, REST APIs',
    highlights: [
      'Designed service dashboards for 4 communication modules: SMS, WhatsApp, Voice, and RCS (Neotel platform).',
      'Built 8+ responsive UI components with REST APIs for real-time monitoring.',
      'Optimized Angular components and API calls to improve dashboard loading and responsiveness.',
    ],
  },
]

export const projects = [
  {
    slug: 'trackiza',
    name: 'Trackiza — GPS personal tracking',
    stack:
      'Ionic, Capacitor, Angular, TypeScript, Google Maps API, Geofencing, Push notifications',
    points: [
      'Cross-platform mobile app for live GPS tracking, geofencing, and location-aware alerts.',
      'Shipped to production with App Store and Google Play releases (Ionic + Capacitor native bridge).',
      'Integrated maps, push notifications, and secure backend-driven flows for real-world fleet / personal use.',
      'Integrated Razorpay payment gateway for in-app hardware purchases and checkout (Node.js / REST).',
    ],
    appStoreUrl: 'https://apps.apple.com/in/app/trackzia/id6743649049',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.ionic.trackzia&hl=en',
    /** Milliseconds between slides in the phone preview (Ionic app gallery). */
    screenshotIntervalMs: 3500,
    /** Real device screenshots — files in `public/trackiza/`, copied to `dist/` on build. */
    screenshots: [
      { src: '/trackiza/01-login.png', label: 'Login' },
      { src: '/trackiza/02-otp.png', label: 'OTP' },
      { src: '/trackiza/03-dashboard.png', label: 'Home / map' },
      { src: '/trackiza/04-cart.png', label: 'Cart / store' },
      { src: '/trackiza/05-order-summary.png', label: 'Checkout' },
      { src: '/trackiza/06-geofence.png', label: 'Geofence' },
      { src: '/trackiza/12-profile.png', label: 'Profile menu' },
      { src: '/trackiza/07-sim-plans.png', label: 'SIM plans' },
      { src: '/trackiza/08-activity.png', label: 'Activity' },
      {
        src: '/trackiza/10-vehicle-history.png',
        label: 'Vehicle history & playback',
      },
      { src: '/trackiza/11-timeline.png', label: 'Trip timeline' },
      { src: '/trackiza/14-add-user.png', label: 'Add user' },
      { src: '/trackiza/13-refer-earn.png', label: 'Refer & earn' },
    ],
  },
  {
    slug: 'swm-dashboard',
    name: 'SWM Dashboard Monitor',
    stack:
      'Angular 16+, TypeScript, Bootstrap, Google Maps API, REST APIs, MS SQL',
    points: [
      'Government solid-waste monitoring dashboard: live route coverage, zone-wise fleet status, and KPI cards fed by MS SQL + Node/Express APIs.',
      'Interactive charts (donut, bar, area) for deployment status, hourly route coverage, and zone benchmarks with export / view toggles.',
      'Google Maps module with vehicle route playback, stoppage coverage (covered / uncovered), ignition state legend, and history polyline animation.',
      'Aligned with municipal operations workflows (cache refresh, date filters, multi-zone rollups) for field supervision teams.',
    ],
    previewVariant: 'browser',
    screenshotIntervalMs: 4000,
    screenshots: [
      { src: '/swm/01-overview.png', label: 'Fleet & route KPIs' },
      { src: '/swm/02-coverage-charts.png', label: 'Zone & hourly coverage' },
      { src: '/swm/03-route-map.png', label: 'Live route map & playback' },
      { src: '/swm/04-zone-route-status.png', label: 'Zone-wise route status' },
      {
        src: '/swm/05-ward-coverage-charts.png',
        label: 'Ward charts & zone coverage',
      },
    ],
  },
  {
    slug: 'authentic-papad',
    name: 'Authentic Papad — E-commerce',
    stack: 'Angular 15, TypeScript, HTML, CSS, Bootstrap',
    points: [
      'Responsive e-commerce platform with login, cart, and order history.',
      'Three core modules: authentication, cart management, and order tracking.',
    ],
  },
  {
    slug: 'vlabs-simulation',
    name: 'Simulation Of Science Practical (Vlabs IIT-Bombay)',
    stack: 'TypeScript, HTML Canvas',
    points: [
      'Interactive Canvas simulations for object rotation and animation (mouse and button events).',
      'Event-driven transformations using TypeScript and Canvas APIs.',
    ],
  },
]

export const awards = [
  {
    title: 'Star Performer Award — Nueotel',
    year: '2026',
    detail:
      'Outstanding performance, commitment, and contribution to project delivery and team collaboration.',
  },
  {
    title: 'Certification of Robotics and Embedded Systems',
    year: '',
    detail: 'Formal certification in robotics and embedded systems.',
  },
]

export const education = [
  {
    school: 'Modern College, Ganeshkhind',
    location: 'Pune, India',
    degree: 'MSc-CA',
    period: 'Jun 2022 — May 2024',
  },
  {
    school: 'Modern College, Ganeshkhind',
    location: 'Pune, India',
    degree: 'BCA',
    period: 'Jul 2019 — Apr 2022',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
