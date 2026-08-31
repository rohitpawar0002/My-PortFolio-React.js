/** Portfolio content sourced from resume */

export const profile = {
  name: 'Rohit Pawar',
  title: 'Front-End Design Engineer',
  /** Hero intro line (reference-style greeting). */
  greeting: "Hello, it's me",
  /** Shown before the highlighted role, e.g. "And I'm an". */
  roleLeadIn: "And I'm a",
  tagline:
    'Angular · React · Ionic Capacitor · AI-assisted development (Claude Code, Cursor). Real-time dashboards, GPS tracking, HRMS attendance with face detection, and REST APIs.',
  location: 'Pune, India (open to UK relocation — visa sponsorship required)',
  phone: '+91 9730023006',
  email: 'rohitt.pawar02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rohit-pawar-661aa2228',
  github: 'https://github.com/rohitpawar0002',
  /** Served from `public/` — see `public/profile-photo.png`. */
  photo: '/profile-photo.png',
  /** Résumé PDF in `public/` (e.g. `public/Rohit_Pawar_Resume.pdf`). */
  resumeUrl: '/Rohit_Pawar_Resume.pdf',
  resumeDownloadName: 'Rohit_Pawar_Resume.pdf',
}

export const summary = [
  "Front-end developer with 2+ years' experience building real-time dashboards, GPS tracking systems, and REST APIs using Angular, React, TypeScript, Ionic, and Node.js.",
  'Delivered a secure HRMS attendance app with on-device face detection that cut fraudulent check-ins to near zero, and government GPS-tracking dashboards used for live monitoring of 1,000+ assets.',
  'Experienced in using AI-assisted coding tools (Claude Code, Cursor AI, Gemini API) to turn rough briefs into working, client-ready interfaces at speed — including an AI-chatbot-powered personal portfolio built end-to-end. Comfortable owning a demo from brief to polished, working front end with minimal specification.',
]

export const skills = [
  'Angular',
  'React.js',
  'Ionic',
  'Capacitor',
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'Bootstrap',
  'Claude Code',
  'Cursor AI',
  'Gemini API',
  'Node.js',
  'Express.js',
  'REST APIs',
  'MS SQL',
  'DynamoDB',
  'Git',
  'GitHub',
  'GitLab',
  'Netlify',
  'Postman',
  'Google Maps API',
  'Razorpay',
  'CI/CD',
  'Responsive Design',
]

export const experience = [
  {
    company: 'Nueotel Communication Pvt. Ltd',
    location: 'Hinjawadi, India',
    role: 'Junior Software Developer',
    period: 'Sep 2024 — Present',
    stack:
      'Angular 16+, TypeScript, Ionic, Capacitor, Node.js, MS SQL, Cursor AI',
    highlights: [
      'Built and optimised real-time Angular dashboards for 5+ government monitoring modules using Google Maps and REST APIs, supporting live analytics for 1,000+ tracked assets.',
      'Delivered Worklio, a secure HRMS attendance app (Ionic, Angular, Capacitor) for iOS/Android covering face-based punch-in/out, geofencing, leave, expenses, payslips, and shift-aware sessions — rolled out to 500+ employees, replacing manual attendance tracking.',
      'Engineered on-device face detection with liveness and sharpness checks plus biometric authentication, cutting fraudulent punch-ins by an estimated 90%+ and bringing check-in time under 3 seconds.',
      'Built the Trackzia GPS tracking app (Ionic, Capacitor) for real-time device tracking, geofencing alerts, and push notifications; used AI tooling to cut a key feature\'s development time by ~40%.',
      'Integrated the Razorpay payment gateway for secure in-app payments, processing 100+ transactions with a streamlined flow that cut payment completion time by roughly 25%.',
      'Built 10+ reusable UI components (Angular, TypeScript, SCSS, Bootstrap), improving cross-device usability and cutting new-screen development time.',
      'Developed 15+ REST API endpoints (Node.js, Express, MS SQL) supporting secure CRUD operations across 5+ production modules.',
    ],
  },
  {
    company: 'Nuevas Technologies Pvt Ltd',
    location: 'Hinjawadi, India',
    role: 'Software Developer Intern',
    period: 'Jan 2024 — Aug 2024',
    stack: 'Angular, TypeScript, HTML, CSS, REST APIs',
    highlights: [
      'Planned service dashboards for 4 communication modules (SMS, WhatsApp, Voice, and RCS) on the Neotel platform.',
      'Built 8+ responsive UI components and connected REST APIs for real-time monitoring across 4 modules.',
      'Enhanced Angular components and API calls, improving dashboard load time and responsiveness by an estimated 30%.',
    ],
  },
]

export const projects = [
  {
    slug: 'worklio',
    name: 'Worklio. — HRMS attendance & workforce',
    stack:
      'Ionic, Capacitor, Angular, TypeScript, Face recognition, Geofencing, Push notifications, iOS Live Activities',
    points: [
      'Production HRMS mobile app for employees, branch managers, and admins: face punch-in/out, geofence validation, shifts, breaks, leave, expenses, and payslips.',
      'Owned the frontend end-to-end (Ionic/Angular/Capacitor) plus push notifications and iOS Live Activities (Lock Screen + Dynamic Island) for live break/session timers.',
      'On-device face detection with liveness checks and biometric auth — rolled out org-wide to 500+ employees, replacing manual attendance.',
      'Role-based flows: employee dashboard & history, manager leave approval, monthly attendance calendars, and team oversight.',
    ],
    appStoreUrl: 'https://apps.apple.com/in/app/worklio/id6774634220',
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.nuevasswm.Worklioo&pcampaignid=web_share',
    screenshotIntervalMs: 3000,
    screenshots: [
      {
        src: '/worklio/00-live-activity-lock.png',
        label: 'Live Activity — Lock Screen (On Break)',
      },
      {
        src: '/worklio/01-live-activity-home.png',
        label: 'Live Activity — Dynamic Island',
      },
      { src: '/worklio/02-login.jpeg', label: 'Login — mobile OTP' },
      { src: '/worklio/02b-otp.jpeg', label: 'OTP verification' },
      {
        src: '/worklio/04-face-registration.jpeg',
        label: 'Face registration',
      },
      {
        src: '/worklio/05-dashboard-home.jpeg',
        label: 'Dashboard — punch, break & shift',
      },
      {
        src: '/worklio/15-admin-dashboard.png',
        label: 'Admin dashboard — attendance overview',
      },
      {
        src: '/worklio/16-geofence-creation.png',
        label: 'Geofence creation — branch locations',
      },
      {
        src: '/worklio/17-attendance-breaks.png',
        label: 'Punch in & break details',
      },
      {
        src: '/worklio/18-punch-location-address.png',
        label: 'Punch & break locations with address',
      },
      {
        src: '/worklio/19-attendance-map.png',
        label: 'Attendance map — geofence & markers',
      },
      {
        src: '/worklio/06-work-analytics.jpeg',
        label: 'Working hours & 7-day analytics',
      },
      { src: '/worklio/07-profile.jpeg', label: 'My Profile' },
      { src: '/worklio/08-menu.jpeg', label: 'Menu — leave, salary, expense' },
      { src: '/worklio/14-my-leave.jpeg', label: 'My Leave / WFH' },
      { src: '/worklio/13-leave-approval.jpeg', label: 'Leave approval (manager)' },
      {
        src: '/worklio/12-monthly-attendance.jpeg',
        label: 'Monthly attendance calendar',
      },
      { src: '/worklio/09-payslips.jpeg', label: 'Payslips' },
      { src: '/worklio/11-notifications.jpeg', label: 'Push notifications inbox' },
    ],
  },
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
    screenshotIntervalMs: 3000,
    /** Files in `public/trackiza/`. First slide: phone screen recording + poster frame. */
    screenshots: [
      {
        src: '/trackiza/00-home-map.mp4',
        poster: '/trackiza/00-home-map-poster.png',
        label: 'Home — map, geofence & vehicle (screen recording)',
        video: true,
      },
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
    browserTitle: 'SWM Dashboard Monitor',
    screenshotIntervalMs: 3000,
    screenshots: [
      {
        src: '/swm/00-overview-recording.mp4',
        label: 'Dashboard walkthrough (screen recording)',
        video: true,
      },
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
    slug: 'nueotel-communication',
    name: 'Nueotel Communication Service',
    stack:
      'Angular 16+, TypeScript, HTML, SCSS, Bootstrap, REST APIs, MS SQL',
    points: [
      'Multi-channel enterprise console (Neotel): SMS, WhatsApp, Voice, RCS, and related modules — Angular front ends on live REST / MS SQL backends.',
      'Voice Call suite: analytics dashboard (Quick Call, Active Response, Forward Connect, weekly/monthly campaigns) with wallet balance and service switcher.',
      'OBD (outbound dialing): clip library with in-table audio playback and approvals; campaign create/view with searchable grids, statuses, and actions.',
      'Make Call flows: campaign selection, bulk mobile entry, call type and scheduling, plus guided steps — matching production ops at Nueotel Communication Pvt. Ltd.',
      'Chatbot module: request KPIs, conversation bar charts, and agent/chatbot analytics (response & interaction time).',
      'RCS & iinbox dashboards: template/media breakdowns, status analysis, and balance-driven navigation patterns.',
      'WhatsApp: Send WhatsApp composer with templates, quality/limit indicators, and live mobile preview.',
    ],
    previewVariant: 'browser',
    browserTitle: 'Nueotel Communication Platform',
    screenshotIntervalMs: 3000,
    screenshots: [
      {
        src: '/nueotel/01-voice-dashboard.png',
        label: 'Voice Call — service dashboard',
      },
      { src: '/nueotel/02-view-clip.png', label: 'View Clip — table' },
      { src: '/nueotel/03-create-campaign.png', label: 'Create Campaign' },
      { src: '/nueotel/04-view-campaign.png', label: 'View Campaign — list' },
      { src: '/nueotel/05-make-call.png', label: 'Make Call' },
      {
        src: '/nueotel/06-chatbot-dashboard.png',
        label: 'Chatbot — service dashboard',
      },
      {
        src: '/nueotel/07-chatbot-analytics.png',
        label: 'Chatbot — response & interaction',
      },
      { src: '/nueotel/08-rcs-dashboard.png', label: 'RCS — service dashboard' },
      {
        src: '/nueotel/09-iinbox-dashboard.png',
        label: 'iinbox — service dashboard',
      },
      {
        src: '/nueotel/10-whatsapp-send.png',
        label: 'WhatsApp — send & mobile preview',
      },
    ],
  },
  {
    slug: 'personal-portfolio',
    name: 'AI-Powered Chatbot Personal Portfolio',
    stack:
      'React, Vite, JavaScript, Framer Motion, Google Gemini API, Netlify Functions',
    points: [
      'Built a responsive single-page portfolio with project showcases, timeline experience, and motion-driven UI, then extended it with an AI chatbot using the Google Gemini API and a serverless backend.',
      'Designed context-aware prompt logic to improve chatbot response accuracy and reduce irrelevant replies.',
      'Set up a full CI/CD pipeline (GitHub, Netlify) for automated, single push-to-deploy releases.',
    ],
  },
  {
    slug: 'authentic-papad',
    name: 'Authentic Papad — E-commerce',
    stack: 'Angular 15, TypeScript, HTML, CSS, Bootstrap',
    points: [
      'Built a responsive Angular e-commerce platform with authentication, cart management, and order-tracking modules, improving the end-to-end checkout experience.',
    ],
  },
]

export const awards = [
  {
    title: 'Star Performer Award',
    year: '2026',
    detail:
      'Recognised for outstanding performance and contribution to successful project delivery.',
  },
  {
    title: 'Certification in Robotics and Embedded Systems',
    year: '',
    detail: 'Formal certification in robotics and embedded systems.',
  },
]

export const education = [
  {
    school: 'Modern College, Ganeshkhind',
    location: 'Pune, India',
    degree: 'MSc, Computer Applications',
    period: '2022 — 2024',
  },
  {
    school: 'Modern College, Ganeshkhind',
    location: 'Pune, India',
    degree: 'BCA, Computer Applications',
    period: '2019 — 2022',
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
