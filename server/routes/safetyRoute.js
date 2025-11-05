// routes/safetyRoute.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const router = express.Router();

// ✅ Update this line to match your CSV file name
const CSV_PATH = path.join(__dirname, '..', 'data', 'chennai_safety_dataset_5000.csv');

// In-memory store for CSV rows
let safetyRows = [];

// Load CSV at startup into memory
function loadCSV() {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', () => {
        safetyRows = rows;
        console.log(`✅ Loaded ${rows.length} rows from CSV`);
        resolve();
      })
      .on('error', (err) => reject(err));
  });
}

function normalize(s) {
  return s ? s.toString().trim().toLowerCase() : '';
}

function findBestMatch(query) {
  if (!query) return null;
  const q = normalize(query);

  let match = safetyRows.find(row =>
    normalize(row['Place Name']).includes(q)
  );
  if (match) return match;

  const tokens = q.split(/\s+/).filter(Boolean);
  match = safetyRows.find(row => {
    const place = normalize(row['Place Name']);
    return tokens.every(t => place.includes(t));
  });
  if (match) return match;

  match = safetyRows.find(row => normalize(row['Place Name']).startsWith(q));
  return match || null;
}

function mapRowToResponse(row) {
  if (!row) return null;
  return {
    placeName: row['Place Name'] || '',
    safetyRating: row['Safety Rating (5.0)'] || '',
    lighting: row['Lighting'] || '',
    lightingScore: row['Lighting Score'] || '',
    policePresence: row['Police Presence'] || '',
    emergencyServices: row['Emergency Services (m)'] || '',
    crimeBeatId: row['Crime Beat ID'] || '',
    crowdDensity: row['Crowd Density'] || '',
    overallStatus: row['Overall Status'] || ''
  };
}

let csvLoaded = false;
loadCSV()
  .then(() => { csvLoaded = true; })
  .catch(err => console.error('❌ Failed to load CSV:', err));

router.get('/', (req, res) => {
  if (!csvLoaded) {
    return res.status(503).json({ error: 'Data not loaded yet. Try again shortly.' });
  }

  const query = req.query.query || req.query.q || req.query.area || '';
  if (!query) {
    return res.status(400).json({ error: 'Please provide a "query" parameter (e.g. ?query=Tambaram)' });
  }

  const found = findBestMatch(query);

  if (!found) {
    return res.status(404).json({ error: 'No matching area found', query });
  }

  const payload = mapRowToResponse(found);
  return res.json({ success: true, data: payload });
});

module.exports = router;
