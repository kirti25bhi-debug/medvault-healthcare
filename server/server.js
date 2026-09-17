import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { 
  initDatabase, 
  getPatients, 
  getPatientById, 
  getStats, 
  saveContact, 
  getContacts, 
  saveAppointment, 
  getAppointments 
} from './database.js';
import { predictPatientCare, CLINICAL_RANGES } from './diagnostics.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Initialize Database on startup
initDatabase();

// 1. Healthcheck
app.get('/api/health', (req, res) => {
  const stats = getStats();
  res.json({
    status: 'online',
    service: 'MedVault Healthcare API & Diagnostics Engine',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    dataset: {
      totalPatients: stats.totalPatients || 0,
      inCare: stats.inCareCount || 0,
      outCare: stats.outCareCount || 0,
    }
  });
});

// 2. Patient Records List (Paginated, Filterable)
app.get('/api/patients', (req, res) => {
  try {
    const { page, limit, search, careType, sex, sortBy, sortOrder } = req.query;
    const result = getPatients({ page, limit, search, careType, sex, sortBy, sortOrder });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch patients', message: error.message });
  }
});

// 3. Clinical Dataset Stats & Analytics
app.get('/api/patients/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to compute stats', message: error.message });
  }
});

// 4. Clinical Reference Ranges Metadata
app.get('/api/diagnostics/ranges', (req, res) => {
  res.json(CLINICAL_RANGES);
});

// 5. Preset Samples for Easy Testing in Frontend
app.get('/api/diagnostics/samples', (req, res) => {
  res.json([
    {
      label: 'Sample High-Risk Patient (In-Care Admitted)',
      description: 'Severe thrombocytopenia (Platelets 50) and low hematocrit',
      data: {
        haematocrit: 31.9,
        haemoglobins: 11.0,
        erythrocyte: 3.88,
        leucocyte: 13.5,
        thrombocyte: 50,
        mch: 28.4,
        mchc: 34.5,
        mcv: 82.2,
        age: 51,
        sex: 'F'
      }
    },
    {
      label: 'Sample Stable Patient (Out-Care Routine)',
      description: 'Normal blood count, healthy platelets (282) and hemoglobin (14.6)',
      data: {
        haematocrit: 42.3,
        haemoglobins: 14.6,
        erythrocyte: 4.78,
        leucocyte: 5.0,
        thrombocyte: 282,
        mch: 30.5,
        mchc: 34.5,
        mcv: 88.5,
        age: 27,
        sex: 'M'
      }
    },
    {
      label: 'Sample Acute Infection Patient (Elevated WBC)',
      description: 'Leukocytosis (WBC 18.5) and low platelets requiring observation',
      data: {
        haematocrit: 34.9,
        haemoglobins: 12.6,
        erythrocyte: 4.10,
        leucocyte: 18.5,
        thrombocyte: 120,
        mch: 30.7,
        mchc: 36.1,
        mcv: 85.1,
        age: 63,
        sex: 'M'
      }
    }
  ]);
});

// 6. AI Patient Care Diagnostics & Triage Prediction
app.post('/api/diagnostics/predict', (req, res) => {
  try {
    const inputData = req.body || {};
    const report = predictPatientCare(inputData);
    res.json(report);
  } catch (error) {
    res.status(400).json({ error: 'Failed to run diagnostics', message: error.message });
  }
});

// 7. Get Patient by ID
app.get('/api/patients/:id', (req, res) => {
  const patient = getPatientById(req.params.id);
  if (!patient) {
    return res.status(404).json({ error: 'Patient not found' });
  }
  // Run live diagnostic report on this patient
  const diagnostic = predictPatientCare(patient);
  res.json({ patient, diagnostic });
});

// 8. Contact Inquiries (Submit & List)
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }
  const saved = saveContact({ name, email, subject, message });
  res.status(201).json({
    success: true,
    message: 'Thank you for your message! Our medical team has received your inquiry.',
    inquiry: saved,
  });
});

app.get('/api/contact', (req, res) => {
  res.json(getContacts());
});

// 9. Appointments Booking
app.post('/api/appointments', (req, res) => {
  const { name, email, phone, doctor, specialty, date, time, notes } = req.body;
  if (!name || !email || !specialty || !date) {
    return res.status(400).json({ error: 'Missing required appointment fields.' });
  }
  const appt = saveAppointment({ name, email, phone, doctor, specialty, date, time, notes });
  res.status(201).json({
    success: true,
    message: 'Appointment successfully scheduled!',
    appointment: appt,
  });
});

app.get('/api/appointments', (req, res) => {
  res.json(getAppointments());
});

// Serve frontend static assets in production (when dist/ exists)
if (fs.existsSync(distPath)) {
  console.log(`📦 Serving static frontend files from: ${distPath}`);
  app.use(express.static(distPath));

  // SPA fallback for all non-API GET requests (Express 5 compatible)
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distPath, 'index.html'));
    }
    next();
  });
}

// 404 handler for undefined API routes
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🚀 MedVault Healthcare Backend Server running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🧪 Healthcheck: http://localhost:${PORT}/api/health`);
  console.log(`📊 Patients API: http://localhost:${PORT}/api/patients`);
  console.log(`🤖 AI Diagnostics: http://localhost:${PORT}/api/diagnostics/predict`);
  console.log(`=================================================\n`);
});
