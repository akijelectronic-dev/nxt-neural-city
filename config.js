/* ═══════════════════════════════════════════════════════
   NXT NEURAL CITY — Configuration
   Author: AL-AMIN
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════════
   CITY CONFIG
   ═══════════════════════════════════════════════════════ */
var CITY_CONFIG = {
  GRID_WIDTH: 60,
  GRID_HEIGHT: 60,
  TILE_SIZE: 20,
  
  START_MONEY: 1000000,
  START_POPULATION: 50,
  MAX_POPULATION: 5000,
  
  SIMULATION_SPEED: 3,
  TICK_RATE: 1000,
  
  DAY_LENGTH: 60,
  NIGHT_START: 40,
  
  QUALITY: 'medium',
  SHOW_GRID: false,
  SHOW_ZONES: true,
  SHOW_NAMES: false
};

/* ═══════════════════════════════════════════════════════
   ZONES
   ═══════════════════════════════════════════════════════ */
var ZONES = {
  residential: { name:'Residential', color:'#3b82f6', icon:'🏠', cost:5000 },
  commercial: { name:'Commercial', color:'#f59e0b', icon:'🏪', cost:8000 },
  industrial: { name:'Industrial', color:'#6b7280', icon:'🏭', cost:12000 },
  education: { name:'Education', color:'#8b5cf6', icon:'🏫', cost:15000 },
  healthcare: { name:'Healthcare', color:'#ef4444', icon:'🏥', cost:18000 },
  recreation: { name:'Recreation', color:'#22c55e', icon:'🌳', cost:6000 },
  infrastructure: { name:'Infrastructure', color:'#06b6d4', icon:'⚡', cost:20000 }
};

/* ═══════════════════════════════════════════════════════
   BUILDINGS
   ═══════════════════════════════════════════════════════ */
var BUILDINGS = {
  // Residential
  house_small: {
    id: 'house_small', name: 'Small House', icon: '🏠',
    zone: 'residential', cost: 3000, w: 1, h: 1,
    capacity: 4, upkeep: 50, happiness: 5,
    color: '#3b82f6'
  },
  house_medium: {
    id: 'house_medium', name: 'Medium House', icon: '🏡',
    zone: 'residential', cost: 8000, w: 2, h: 1,
    capacity: 8, upkeep: 120, happiness: 8,
    color: '#2563eb'
  },
  apartment: {
    id: 'apartment', name: 'Apartment', icon: '🏢',
    zone: 'residential', cost: 25000, w: 2, h: 2,
    capacity: 30, upkeep: 400, happiness: 10,
    color: '#1d4ed8'
  },
  villa: {
    id: 'villa', name: 'Villa', icon: '🏘️',
    zone: 'residential', cost: 50000, w: 3, h: 2,
    capacity: 12, upkeep: 600, happiness: 25,
    color: '#1e40af'
  },
  
  // Commercial
  shop: {
    id: 'shop', name: 'Shop', icon: '🏪',
    zone: 'commercial', cost: 5000, w: 1, h: 1,
    jobs: 3, income: 200, happiness: 3,
    color: '#f59e0b'
  },
  restaurant: {
    id: 'restaurant', name: 'Restaurant', icon: '🍽️',
    zone: 'commercial', cost: 12000, w: 2, h: 1,
    jobs: 8, income: 500, happiness: 6,
    color: '#f97316'
  },
  mall: {
    id: 'mall', name: 'Shopping Mall', icon: '🛍️',
    zone: 'commercial', cost: 40000, w: 3, h: 2,
    jobs: 25, income: 2000, happiness: 15,
    color: '#ea580c'
  },
  bank: {
    id: 'bank', name: 'Bank', icon: '🏦',
    zone: 'commercial', cost: 30000, w: 2, h: 2,
    jobs: 15, income: 1500, happiness: 8,
    color: '#d97706'
  },
  
  // Industrial
  factory_small: {
    id: 'factory_small', name: 'Small Factory', icon: '🏭',
    zone: 'industrial', cost: 15000, w: 2, h: 2,
    jobs: 15, income: 800, pollution: 10,
    color: '#6b7280'
  },
  factory_large: {
    id: 'factory_large', name: 'Large Factory', icon: '🏗️',
    zone: 'industrial', cost: 45000, w: 3, h: 3,
    jobs: 40, income: 2500, pollution: 25,
    color: '#4b5563'
  },
  power_plant: {
    id: 'power_plant', name: 'Power Plant', icon: '⚡',
    zone: 'industrial', cost: 35000, w: 2, h: 2,
    jobs: 20, power: 500, pollution: 30,
    color: '#374151'
  },
  
  // Education
  school: {
    id: 'school', name: 'School', icon: '🏫',
    zone: 'education', cost: 25000, w: 3, h: 2,
    jobs: 20, capacity: 200, happiness: 10,
    color: '#8b5cf6'
  },
  university: {
    id: 'university', name: 'University', icon: '🎓',
    zone: 'education', cost: 80000, w: 4, h: 3,
    jobs: 60, capacity: 1000, happiness: 20,
    color: '#7c3aed'
  },
  library: {
    id: 'library', name: 'Library', icon: '📚',
    zone: 'education', cost: 15000, w: 2, h: 1,
    jobs: 8, happiness: 12,
    color: '#9333ea'
  },
  
  // Healthcare
  clinic: {
    id: 'clinic', name: 'Clinic', icon: '🏥',
    zone: 'healthcare', cost: 20000, w: 2, h: 2,
    jobs: 12, capacity: 50, happiness: 15,
    color: '#ef4444'
  },
  hospital: {
    id: 'hospital', name: 'Hospital', icon: '🏨',
    zone: 'healthcare', cost: 70000, w: 4, h: 3,
    jobs: 80, capacity: 500, happiness: 25,
    color: '#dc2626'
  },
  pharmacy: {
    id: 'pharmacy', name: 'Pharmacy', icon: '💊',
    zone: 'healthcare', cost: 8000, w: 1, h: 1,
    jobs: 4, happiness: 6,
    color: '#b91c1c'
  },
  
  // Recreation
  park: {
    id: 'park', name: 'Park', icon: '🌳',
    zone: 'recreation', cost: 3000, w: 2, h: 2,
    upkeep: 100, happiness: 15, pollution: -5,
    color: '#22c55e'
  },
  stadium: {
    id: 'stadium', name: 'Stadium', icon: '🏟️',
    zone: 'recreation', cost: 50000, w: 4, h: 4,
    upkeep: 1500, happiness: 30,
    color: '#16a34a'
  },
  cinema: {
    id: 'cinema', name: 'Cinema', icon: '🎬',
    zone: 'recreation', cost: 22000, w: 2, h: 2,
    jobs: 15, income: 800, happiness: 18,
    color: '#15803d'
  },
  playground: {
    id: 'playground', name: 'Playground', icon: '🛝',
    zone: 'recreation', cost: 5000, w: 1, h: 1,
    upkeep: 80, happiness: 8,
    color: '#4ade80'
  },
  
  // Infrastructure
  road: {
    id: 'road', name: 'Road', icon: '🛣️',
    zone: 'infrastructure', cost: 500, w: 1, h: 1,
    upkeep: 10, color: '#52525b'
  },
  bus_stop: {
    id: 'bus_stop', name: 'Bus Stop', icon: '🚌',
    zone: 'infrastructure', cost: 3000, w: 1, h: 1,
    upkeep: 100, happiness: 5,
    color: '#06b6d4'
  },
  metro: {
    id: 'metro', name: 'Metro Station', icon: '🚇',
    zone: 'infrastructure', cost: 40000, w: 2, h: 2,
    upkeep: 800, happiness: 20,
    color: '#0891b2'
  },
  water_tower: {
    id: 'water_tower', name: 'Water Tower', icon: '🗼',
    zone: 'infrastructure', cost: 12000, w: 1, h: 1,
    upkeep: 200, water: 200,
    color: '#0e7490'
  }
};

/* ═══════════════════════════════════════════════════════
   CITIZEN — Bengali Names
   ═══════════════════════════════════════════════════════ */
var MALE_NAMES = [
  'Karim', 'Rahim', 'Jamal', 'Kamal', 'Rafiq', 'Shafiq', 'Habib', 'Anis',
  'Ashraf', 'Bashir', 'Rashid', 'Nasir', 'Farid', 'Majid', 'Sajid', 'Wahid',
  'Rahman', 'Ibrahim', 'Yusuf', 'Ismail', 'Harun', 'Maruf', 'Mahmud', 'Masud',
  'Nayan', 'Sujon', 'Robin', 'Nazmul', 'Sabbir', 'Tamim', 'Sakib', 'Rakib',
  'Hasan', 'Hossain', 'Shahin', 'Shamim', 'Selim', 'Salim', 'Rony', 'Shuvo'
];

var FEMALE_NAMES = [
  'Fatima', 'Ayesha', 'Khadija', 'Zainab', 'Maryam', 'Sumaiya', 'Nusrat', 'Jannat',
  'Tasnim', 'Sanjida', 'Mim', 'Rima', 'Dipa', 'Mitu', 'Jui', 'Tania',
  'Shorna', 'Lima', 'Nadia', 'Sabina', 'Rehana', 'Rahima', 'Karima', 'Halima',
  'Salma', 'Shilpi', 'Sathi', 'Shathi', 'Mousumi', 'Rupali', 'Popy', 'Lipi',
  'Taslima', 'Nasima', 'Hasina', 'Selina', 'Rabeya', 'Sharmin', 'Nargis', 'Bilkis'
];

var LAST_NAMES = [
  'Ahmed', 'Khan', 'Islam', 'Hossain', 'Rahman', 'Chowdhury', 'Sheikh', 'Mia',
  'Sarker', 'Mollah', 'Bhuiyan', 'Talukder', 'Howlader', 'Siddique', 'Alam', 'Haider'
];

/* ═══════════════════════════════════════════════════════
   JOBS
   ═══════════════════════════════════════════════════════ */
var JOBS = [
  { title:'Teacher', salary:800, zone:'education', icon:'👨‍🏫' },
  { title:'Doctor', salary:2500, zone:'healthcare', icon:'👨‍⚕️' },
  { title:'Nurse', salary:1200, zone:'healthcare', icon:'👩‍⚕️' },
  { title:'Engineer', salary:2000, zone:'industrial', icon:'👷' },
  { title:'Worker', salary:600, zone:'industrial', icon:'👷‍♂️' },
  { title:'Manager', salary:2500, zone:'commercial', icon:'💼' },
  { title:'Shopkeeper', salary:800, zone:'commercial', icon:'🛒' },
  { title:'Cashier', salary:700, zone:'commercial', icon:'💰' },
  { title:'Police', salary:1400, zone:'infrastructure', icon:'👮' },
  { title:'Driver', salary:700, zone:'infrastructure', icon:'🚕' },
  { title:'Farmer', salary:500, zone:'industrial', icon:'👨‍🌾' },
  { title:'Student', salary:0, zone:'education', icon:'🎓' },
  { title:'Retired', salary:400, zone:'residential', icon:'👴' },
  { title:'Chef', salary:900, zone:'commercial', icon:'👨‍🍳' },
  { title:'Banker', salary:2200, zone:'commercial', icon:'🏦' },
  { title:'Programmer', salary:2400, zone:'commercial', icon:'💻' },
  { title:'Barber', salary:600, zone:'commercial', icon:'💈' },
  { title:'Tailor', salary:550, zone:'commercial', icon:'🧵' }
];

/* ═══════════════════════════════════════════════════════
   PERSONALITIES
   ═══════════════════════════════════════════════════════ */
var PERSONALITIES = [
  { id:'friendly', name:'Friendly', emoji:'😊', social:1.2, work:1.0, happiness:1.1 },
  { id:'hardworking', name:'Hardworking', emoji:'💪', social:0.8, work:1.4, happiness:1.0 },
  { id:'lazy', name:'Lazy', emoji:'😴', social:0.9, work:0.6, happiness:1.2 },
  { id:'social', name:'Social', emoji:'🎉', social:1.5, work:0.9, happiness:1.1 },
  { id:'shy', name:'Shy', emoji:'😳', social:0.5, work:1.1, happiness:0.9 },
  { id:'ambitious', name:'Ambitious', emoji:'🚀', social:1.0, work:1.3, happiness:0.95 },
  { id:'kind', name:'Kind', emoji:'😇', social:1.3, work:1.0, happiness:1.15 },
  { id:'grumpy', name:'Grumpy', emoji:'😠', social:0.7, work:1.0, happiness:0.8 }
];

/* ═══════════════════════════════════════════════════════
   VEHICLES
   ═══════════════════════════════════════════════════════ */
var VEHICLES = {
  car_small: { id:'car_small', name:'Small Car', icon:'🚗', speed:1.5, w:10, h:6, color:'#ef4444' },
  car_medium: { id:'car_medium', name:'Sedan', icon:'🚙', speed:1.8, w:12, h:7, color:'#3b82f6' },
  taxi: { id:'taxi', name:'Taxi', icon:'🚕', speed:2.0, w:12, h:7, color:'#fbbf24' },
  bus: { id:'bus', name:'Bus', icon:'🚌', speed:1.2, w:18, h:9, color:'#22c55e' },
  truck: { id:'truck', name:'Truck', icon:'🚚', speed:1.0, w:16, h:9, color:'#6b7280' },
  bike: { id:'bike', name:'Bike', icon:'🏍️', speed:2.5, w:8, h:5, color:'#f97316' },
  police_car: { id:'police_car', name:'Police Car', icon:'🚓', speed:2.2, w:13, h:7, color:'#1e40af' },
  ambulance: { id:'ambulance', name:'Ambulance', icon:'🚑', speed:2.5, w:14, h:8, color:'#dc2626' }
};

/* ═══════════════════════════════════════════════════════
   WEATHER
   ═══════════════════════════════════════════════════════ */
var WEATHER = {
  sunny: { id:'sunny', name:'Sunny', icon:'☀️', happiness:+5, pollution:0, speed:1.0, chance:30 },
  cloudy: { id:'cloudy', name:'Cloudy', icon:'☁️', happiness:0, pollution:0, speed:1.0, chance:25 },
  rainy: { id:'rainy', name:'Rainy', icon:'🌧️', happiness:-5, pollution:-10, speed:0.8, chance:20 },
  stormy: { id:'stormy', name:'Stormy', icon:'⛈️', happiness:-15, pollution:-5, speed:0.5, chance:10 },
  foggy: { id:'foggy', name:'Foggy', icon:'🌫️', happiness:-8, pollution:5, speed:0.7, chance:10 },
  snowy: { id:'snowy', name:'Snowy', icon:'❄️', happiness:0, pollution:-15, speed:0.6, chance:5 }
};

/* ═══════════════════════════════════════════════════════
   EVENTS
   ═══════════════════════════════════════════════════════ */
var EVENTS = [
  { id:'festival', name:'Festival', icon:'🎉', happiness:+20, duration:2, cost:5000 },
  { id:'election', name:'Election', icon:'🗳️', happiness:-5, duration:1, cost:2000 },
  { id:'concert', name:'Concert', icon:'🎸', happiness:+15, duration:1, cost:8000 },
  { id:'protest', name:'Protest', icon:'📢', happiness:-20, duration:2, cost:0 },
  { id:'fire', name:'Fire', icon:'🔥', happiness:-15, duration:1, cost:3000 },
  { id:'sports', name:'Sports Event', icon:'🏆', happiness:+12, duration:1, cost:6000 },
  { id:'accident', name:'Traffic Accident', icon:'💥', happiness:-8, duration:1, cost:1000 },
  { id:'strike', name:'Worker Strike', icon:'✊', happiness:-10, duration:2, cost:0 },
  { id:'parade', name:'Parade', icon:'🎺', happiness:+10, duration:1, cost:4000 }
];

/* ═══════════════════════════════════════════════════════
   COLORS
   ═══════════════════════════════════════════════════════ */
var COLORS = {
  // Terrain
  grass: '#166534',
  grassLight: '#15803d',
  grassDark: '#14532d',
  water: '#0369a1',
  waterLight: '#0ea5e9',
  road: '#52525b',
  roadLine: '#f1f5f9',
  
  // Buildings
  residential: '#3b82f6',
  commercial: '#f59e0b',
  industrial: '#6b7280',
  education: '#8b5cf6',
  healthcare: '#ef4444',
  recreation: '#22c55e',
  infrastructure: '#06b6d4',
  
  // Citizens
  citizen: '#00d4ff',
  citizenHappy: '#22c55e',
  citizenSad: '#ef4444',
  
  // UI
  primary: '#00d4ff',
  accent: '#8b5cf6',
  gold: '#ffd700',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444'
};

/* ═══════════════════════════════════════════════════════
   ECONOMY CONFIG
   ═══════════════════════════════════════════════════════ */
var ECONOMY = {
  TAX_RATE: 0.15,
  TRADE_TAX: 0.05,
  PROPERTY_TAX: 0.02,
  STARTING_TREASURY: 1000000,
  SALARY_MULTIPLIER: 1.0,
  INFLATION_RATE: 0.02,
  COST_OF_LIVING: 300,
  FOOD_COST: 50,
  HOUSING_COST: 100
};

/* ═══════════════════════════════════════════════════════
   TIME CONFIG
   ═══════════════════════════════════════════════════════ */
var TIME = {
  MINUTES_PER_DAY: 1440,
  GAME_MINUTES_PER_TICK: 20,
  DAYS: ['Sat','Sun','Mon','Tue','Wed','Thu','Fri']
};

/* ═══════════════════════════════════════════════════════
   SAVE KEY
   ═══════════════════════════════════════════════════════ */
var SAVE_KEY = 'nxt_neural_city_v1';

/* ═══════════════════════════════════════════════════════
   LOADED MESSAGE
   ═══════════════════════════════════════════════════════ */
console.log('%c🌆 NXT NEURAL CITY Config Loaded', 
  'color:#00d4ff;font-family:monospace;font-size:16px;font-weight:bold');
console.log('%c   Buildings: ' + Object.keys(BUILDINGS).length, 
  'color:#22c55e;font-family:monospace');
console.log('%c   Citizens Names: ' + (MALE_NAMES.length + FEMALE_NAMES.length), 
  'color:#f59e0b;font-family:monospace');
console.log('%c   Jobs: ' + JOBS.length, 
  'color:#8b5cf6;font-family:monospace');
console.log('%c   Vehicles: ' + Object.keys(VEHICLES).length, 
  'color:#ef4444;font-family:monospace');
console.log('%c   Events: ' + EVENTS.length, 
  'color:#ec4899;font-family:monospace');
