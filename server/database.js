import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const PATIENTS_FILE = path.join(DATA_DIR, 'patients.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure contacts file exists
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// Ensure appointments file exists
if (!fs.existsSync(APPOINTMENTS_FILE)) {
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify([], null, 2), 'utf8');
}

// In-memory cache for patients
let patientsCache = [];

export function initDatabase() {
  if (fs.existsSync(PATIENTS_FILE)) {
    const raw = fs.readFileSync(PATIENTS_FILE, 'utf8');
    patientsCache = JSON.parse(raw);
    console.log(`[Database] Loaded ${patientsCache.length} patient lab records.`);
  } else {
    console.warn(`[Database] Warning: ${PATIENTS_FILE} not found!`);
  }
}

export function getPatients({ page = 1, limit = 10, search = '', careType = 'all', sex = 'all', sortBy = 'id', sortOrder = 'asc' } = {}) {
  let filtered = [...patientsCache];

  if (search) {
    const term = search.toLowerCase().trim();
    filtered = filtered.filter(p => 
      p.id.toLowerCase().includes(term) ||
      p.age.toString().includes(term) ||
      p.source.toLowerCase().includes(term)
    );
  }

  if (careType && careType !== 'all') {
    filtered = filtered.filter(p => p.source === careType);
  }

  if (sex && sex !== 'all') {
    filtered = filtered.filter(p => p.sex === sex);
  }

  // Sort
  filtered.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];
    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = (valB || '').toLowerCase();
    }
    if (valA < valB) return sortOrder === 'desc' ? 1 : -1;
    if (valA > valB) return sortOrder === 'desc' ? -1 : 1;
    return 0;
  });

  const total = filtered.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const totalPages = Math.ceil(total / limitNum);
  const startIndex = (pageNum - 1) * limitNum;
  const data = filtered.slice(startIndex, startIndex + limitNum);

  return {
    data,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNext: pageNum < totalPages,
      hasPrev: pageNum > 1,
    }
  };
}

export function getPatientById(id) {
  return patientsCache.find(p => p.id === String(id));
}

export function getStats() {
  const total = patientsCache.length;
  if (total === 0) return {};

  const inCare = patientsCache.filter(p => p.source === 'in-care');
  const outCare = patientsCache.filter(p => p.source === 'out-care');

  const calcAverages = (list) => {
    if (list.length === 0) return {};
    const sum = list.reduce((acc, p) => ({
      haematocrit: acc.haematocrit + p.haematocrit,
      haemoglobins: acc.haemoglobins + p.haemoglobins,
      erythrocyte: acc.erythrocyte + p.erythrocyte,
      leucocyte: acc.leucocyte + p.leucocyte,
      thrombocyte: acc.thrombocyte + p.thrombocyte,
      mch: acc.mch + p.mch,
      mchc: acc.mchc + p.mchc,
      mcv: acc.mcv + p.mcv,
      age: acc.age + p.age,
    }), {
      haematocrit: 0, haemoglobins: 0, erythrocyte: 0,
      leucocyte: 0, thrombocyte: 0, mch: 0, mchc: 0, mcv: 0, age: 0
    });

    const len = list.length;
    return {
      haematocrit: Number((sum.haematocrit / len).toFixed(1)),
      haemoglobins: Number((sum.haemoglobins / len).toFixed(1)),
      erythrocyte: Number((sum.erythrocyte / len).toFixed(2)),
      leucocyte: Number((sum.leucocyte / len).toFixed(1)),
      thrombocyte: Number((sum.thrombocyte / len).toFixed(0)),
      mch: Number((sum.mch / len).toFixed(1)),
      mchc: Number((sum.mchc / len).toFixed(1)),
      mcv: Number((sum.mcv / len).toFixed(1)),
      age: Number((sum.age / len).toFixed(0)),
    };
  };

  return {
    totalPatients: total,
    inCareCount: inCare.length,
    outCareCount: outCare.length,
    inCarePercentage: Number(((inCare.length / total) * 100).toFixed(1)),
    outCarePercentage: Number(((outCare.length / total) * 100).toFixed(1)),
    overallAverages: calcAverages(patientsCache),
    inCareAverages: calcAverages(inCare),
    outCareAverages: calcAverages(outCare),
  };
}

export function saveContact({ name, email, subject, message }) {
  const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8') || '[]');
  const newContact = {
    id: 'MSG-' + Date.now(),
    name: name?.trim() || 'Anonymous',
    email: email?.trim() || '',
    subject: subject?.trim() || 'General Inquiry',
    message: message?.trim() || '',
    createdAt: new Date().toISOString(),
    status: 'unread',
  };
  contacts.unshift(newContact);
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf8');
  return newContact;
}

export function getContacts() {
  return JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf8') || '[]');
}

export function saveAppointment(data) {
  const appointments = JSON.parse(fs.readFileSync(APPOINTMENTS_FILE, 'utf8') || '[]');
  const newAppt = {
    id: 'APT-' + Date.now(),
    ...data,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
  };
  appointments.unshift(newAppt);
  fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf8');
  return newAppt;
}

export function getAppointments() {
  return JSON.parse(fs.readFileSync(APPOINTMENTS_FILE, 'utf8') || '[]');
}
