/**
 * AI Patient Care Diagnostics & Triage Engine
 * Based on logistic regression weights trained on hospital hematology lab records
 * combined with clinical laboratory reference range analysis.
 */

// Model weights learned from 5,074 clinical records
const MODEL_CONFIG = {
  bias: -0.544,
  weights: {
    haematocrit: -0.224,
    haemoglobins: -0.209,
    erythrocyte: -0.171,
    leucocyte: 0.417,
    thrombocyte: -0.740,
    mch: -0.092,
    mchc: 0.046,
    mcv: -0.102,
    age: 0.092,
    sex: 0.251, // Male = 1, Female = 0
  },
  stats: {
    haematocrit: { mean: 38.20, std: 5.96 },
    haemoglobins: { mean: 12.74, std: 2.07 },
    erythrocyte: { mean: 4.54, std: 0.78 },
    leucocyte: { mean: 8.72, std: 5.01 },
    thrombocyte: { mean: 257.88, std: 113.16 },
    mch: { mean: 28.23, std: 2.68 },
    mchc: { mean: 33.34, std: 1.23 },
    mcv: { mean: 84.61, std: 6.87 },
    age: { mean: 46.72, std: 21.75 },
  }
};

// Standard clinical laboratory reference ranges
export const CLINICAL_RANGES = {
  haematocrit: { name: 'Hematocrit (Hct)', unit: '%', min: 36.0, max: 50.0, criticalLow: 30.0, criticalHigh: 55.0 },
  haemoglobins: { name: 'Hemoglobin (Hb)', unit: 'g/dL', min: 12.0, max: 17.0, criticalLow: 9.0, criticalHigh: 18.5 },
  erythrocyte: { name: 'Erythrocyte (RBC)', unit: '×10¹²/L', min: 4.0, max: 5.5, criticalLow: 3.0, criticalHigh: 6.5 },
  leucocyte: { name: 'Leukocyte (WBC)', unit: '×10⁹/L', min: 4.0, max: 11.0, criticalLow: 2.5, criticalHigh: 15.0 },
  thrombocyte: { name: 'Thrombocyte (Platelets)', unit: '×10⁹/L', min: 150, max: 450, criticalLow: 100, criticalHigh: 600 },
  mch: { name: 'Mean Corpuscular Hemoglobin (MCH)', unit: 'pg', min: 27.0, max: 33.0, criticalLow: 23.0, criticalHigh: 36.0 },
  mchc: { name: 'MCHC', unit: 'g/dL', min: 32.0, max: 36.0, criticalLow: 30.0, criticalHigh: 38.0 },
  mcv: { name: 'Mean Corpuscular Volume (MCV)', unit: 'fL', min: 80.0, max: 100.0, criticalLow: 70.0, criticalHigh: 105.0 },
};

/**
 * Evaluates a single lab parameter against clinical reference ranges.
 */
function evaluateParameter(key, value) {
  const range = CLINICAL_RANGES[key];
  if (!range || typeof value !== 'number' || isNaN(value)) {
    return { status: 'normal', flag: 'Normal', message: 'Value within normal limits.' };
  }

  let status = 'normal';
  let flag = 'Normal';
  let message = 'Within normal healthy reference range.';

  if (value < range.criticalLow) {
    status = 'critical';
    flag = 'Critically Low';
    if (key === 'thrombocyte') message = 'Severe thrombocytopenia detected (elevated hemorrhage risk).';
    else if (key === 'haemoglobins') message = 'Severe anemia alert; tissue oxygen delivery compromised.';
    else if (key === 'leucocyte') message = 'Severe leukopenia (compromised immune response).';
    else message = `Significantly below normal range (< ${range.min} ${range.unit}).`;
  } else if (value > range.criticalHigh) {
    status = 'critical';
    flag = 'Critically High';
    if (key === 'leucocyte') message = 'Marked leukocytosis; points to acute systemic infection or inflammatory distress.';
    else if (key === 'thrombocyte') message = 'Severe thrombocytosis (elevated thrombotic risk).';
    else message = `Significantly above normal range (> ${range.max} ${range.unit}).`;
  } else if (value < range.min) {
    status = 'warning';
    flag = 'Low';
    if (key === 'haemoglobins' || key === 'haematocrit') message = 'Mild-to-moderate anemia profile.';
    else message = `Slightly below standard baseline range.`;
  } else if (value > range.max) {
    status = 'warning';
    flag = 'High';
    if (key === 'leucocyte') message = 'Mild leukocytosis; suggests localized infection or stress response.';
    else message = `Slightly elevated above normal baseline.`;
  }

  return {
    key,
    name: range.name,
    unit: range.unit,
    value,
    normalRange: `${range.min} - ${range.max} ${range.unit}`,
    status,
    flag,
    message,
  };
}

/**
 * Predicts In-Patient vs Out-Patient care and generates clinical triage report.
 */
export function predictPatientCare(data) {
  const {
    haematocrit = 38.0,
    haemoglobins = 12.5,
    erythrocyte = 4.5,
    leucocyte = 8.0,
    thrombocyte = 250,
    mch = 28.0,
    mchc = 33.0,
    mcv = 85.0,
    age = 45,
    sex = 'F',
  } = data;

  const numHct = parseFloat(haematocrit) || MODEL_CONFIG.stats.haematocrit.mean;
  const numHb = parseFloat(haemoglobins) || MODEL_CONFIG.stats.haemoglobins.mean;
  const numRbc = parseFloat(erythrocyte) || MODEL_CONFIG.stats.erythrocyte.mean;
  const numWbc = parseFloat(leucocyte) || MODEL_CONFIG.stats.leucocyte.mean;
  const numPlt = parseFloat(thrombocyte) || MODEL_CONFIG.stats.thrombocyte.mean;
  const numMch = parseFloat(mch) || MODEL_CONFIG.stats.mch.mean;
  const numMchc = parseFloat(mchc) || MODEL_CONFIG.stats.mchc.mean;
  const numMcv = parseFloat(mcv) || MODEL_CONFIG.stats.mcv.mean;
  const numAge = parseInt(age, 10) || 45;
  const isMale = sex === 'M' || sex === '1' || sex === 1 ? 1 : 0;

  // Standardize inputs
  const zHct = (numHct - MODEL_CONFIG.stats.haematocrit.mean) / MODEL_CONFIG.stats.haematocrit.std;
  const zHb = (numHb - MODEL_CONFIG.stats.haemoglobins.mean) / MODEL_CONFIG.stats.haemoglobins.std;
  const zRbc = (numRbc - MODEL_CONFIG.stats.erythrocyte.mean) / MODEL_CONFIG.stats.erythrocyte.std;
  const zWbc = (numWbc - MODEL_CONFIG.stats.leucocyte.mean) / MODEL_CONFIG.stats.leucocyte.std;
  const zPlt = (numPlt - MODEL_CONFIG.stats.thrombocyte.mean) / MODEL_CONFIG.stats.thrombocyte.std;
  const zMch = (numMch - MODEL_CONFIG.stats.mch.mean) / MODEL_CONFIG.stats.mch.std;
  const zMchc = (numMchc - MODEL_CONFIG.stats.mchc.mean) / MODEL_CONFIG.stats.mchc.std;
  const zMcv = (numMcv - MODEL_CONFIG.stats.mcv.mean) / MODEL_CONFIG.stats.mcv.std;
  const zAge = (numAge - MODEL_CONFIG.stats.age.mean) / MODEL_CONFIG.stats.age.std;

  // Linear logit
  let logit = MODEL_CONFIG.bias +
    zHct * MODEL_CONFIG.weights.haematocrit +
    zHb * MODEL_CONFIG.weights.haemoglobins +
    zRbc * MODEL_CONFIG.weights.erythrocyte +
    zWbc * MODEL_CONFIG.weights.leucocyte +
    zPlt * MODEL_CONFIG.weights.thrombocyte +
    zMch * MODEL_CONFIG.weights.mch +
    zMchc * MODEL_CONFIG.weights.mchc +
    zMcv * MODEL_CONFIG.weights.mcv +
    zAge * MODEL_CONFIG.weights.age +
    isMale * MODEL_CONFIG.weights.sex;

  // Clinical risk boosts for extreme red-flag values
  if (numPlt < 100) logit += 0.8;
  if (numPlt < 50) logit += 1.2;
  if (numWbc > 15) logit += 0.9;
  if (numHb < 9.0) logit += 0.8;

  // Sigmoid probability (0 to 1)
  const inCareProbability = 1 / (1 + Math.exp(-Math.max(-15, Math.min(15, logit))));
  const inCareScore = Math.round(inCareProbability * 100);

  const isInCare = inCareScore >= 50;
  const confidence = isInCare ? inCareScore : (100 - inCareScore);

  // Risk category
  let riskLevel = 'Low';
  let riskColor = 'green';
  if (inCareScore >= 75) {
    riskLevel = 'Critical High';
    riskColor = 'red';
  } else if (inCareScore >= 50) {
    riskLevel = 'Moderate - High';
    riskColor = 'orange';
  } else if (inCareScore >= 35) {
    riskLevel = 'Mild - Monitored';
    riskColor = 'yellow';
  }

  // Detailed parameter analysis
  const parameterAnalysis = {
    haematocrit: evaluateParameter('haematocrit', numHct),
    haemoglobins: evaluateParameter('haemoglobins', numHb),
    erythrocyte: evaluateParameter('erythrocyte', numRbc),
    leucocyte: evaluateParameter('leucocyte', numWbc),
    thrombocyte: evaluateParameter('thrombocyte', numPlt),
    mch: evaluateParameter('mch', numMch),
    mchc: evaluateParameter('mchc', numMchc),
    mcv: evaluateParameter('mcv', numMcv),
  };

  // Critical clinical alerts
  const clinicalAlerts = [];
  if (numPlt < 100) clinicalAlerts.push('Thrombocytopenia: Platelet count critically low (< 100 × 10⁹/L). Continuous monitoring required.');
  if (numWbc > 12) clinicalAlerts.push('Leukocytosis: Elevated white blood cells indicating systemic infection or acute inflammation.');
  if (numHb < 10) clinicalAlerts.push('Anemia Alert: Hemoglobin below 10 g/dL. Evaluate for acute or chronic blood loss.');
  if (numMcv < 80) clinicalAlerts.push('Microcytosis: Low mean corpuscular volume suggesting microcytic hypochromic anemia.');
  if (numMcv > 100) clinicalAlerts.push('Macrocytosis: High mean corpuscular volume (B12/folate or hepatic etiology).');

  // Recommendations
  const recommendations = [];
  if (isInCare) {
    recommendations.push('Immediate in-patient admission or specialist hospital observation recommended.');
    recommendations.push('Repeat Complete Blood Count (CBC) with differential in 12-24 hours.');
    recommendations.push('Monitor vital signs continuously (BP, SpO2, temperature, cardiac rhythm).');
    if (numPlt < 100) recommendations.push('Initiate bleeding precautions and order coagulation profile (PT/INR, PTT).');
  } else {
    recommendations.push('Out-patient clinical follow-up and monitoring is appropriate.');
    recommendations.push('Schedule routine repeat blood panel in 2 to 4 weeks.');
    recommendations.push('Adherence to prescribed lifestyle, hydration, and nutritional support.');
    recommendations.push('Advise patient to seek urgent emergency care if fever, chills, or abnormal bruising occurs.');
  }

  return {
    triageDecision: isInCare ? 'in-care' : 'out-care',
    triageLabel: isInCare ? 'In-Patient Care (Hospital Admission)' : 'Out-Patient Care (Routine Clinic/Home)',
    riskScore: inCareScore,
    riskLevel,
    riskColor,
    confidence: `${confidence}%`,
    summary: isInCare
      ? `Based on hematological markers, this patient exhibits acute physiological disruption with an estimated ${inCareScore}% in-patient risk, warranting hospital admission and physician supervision.`
      : `Based on hematological markers, this patient is clinically stable with low acute hospitalization risk (${100 - inCareScore}% out-care probability). Ambulatory and outpatient care is appropriate.`,
    clinicalAlerts,
    recommendations,
    parameters: parameterAnalysis,
    timestamp: new Date().toISOString(),
  };
}
