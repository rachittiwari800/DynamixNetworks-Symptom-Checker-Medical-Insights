export const symptoms = [
  { id: "fever", name: "Fever", category: "General" },
  { id: "cough", name: "Cough", category: "Respiratory" },
  { id: "headache", name: "Headache", category: "Neurological" },
  { id: "fatigue", name: "Fatigue", category: "General" },
  { id: "sore-throat", name: "Sore Throat", category: "Respiratory" },
  { id: "body-aches", name: "Body Aches", category: "Musculoskeletal" },
  { id: "runny-nose", name: "Runny Nose", category: "Respiratory" },
  { id: "nausea", name: "Nausea", category: "Gastrointestinal" },
  { id: "vomiting", name: "Vomiting", category: "Gastrointestinal" },
  { id: "diarrhea", name: "Diarrhea", category: "Gastrointestinal" },
  { id: "shortness-breath", name: "Shortness of Breath", category: "Respiratory" },
  { id: "chest-pain", name: "Chest Pain", category: "Cardiovascular" },
  { id: "dizziness", name: "Dizziness", category: "Neurological" },
  { id: "rash", name: "Rash", category: "Dermatological" },
  { id: "chills", name: "Chills", category: "General" },
  { id: "loss-taste-smell", name: "Loss of Taste or Smell", category: "Sensory" },
  { id: "abdominal-pain", name: "Abdominal Pain", category: "Gastrointestinal" },
  { id: "joint-pain", name: "Joint Pain", category: "Musculoskeletal" },
  { id: "congestion", name: "Congestion", category: "Respiratory" },
  { id: "back-pain", name: "Back Pain", category: "Musculoskeletal" },
];

export const conditions = [
  {
    id: "common-cold",
    name: "Common Cold",
    description: "A viral infection of the upper respiratory tract, typically mild and self-limiting.",
    severity: "low",
    commonSymptoms: ["runny-nose", "sore-throat", "cough", "congestion", "body-aches", "headache"],
    recommendations: [
      "Get plenty of rest",
      "Stay hydrated with water and warm fluids",
      "Use over-the-counter pain relievers if needed",
      "Gargle with warm salt water for sore throat",
      "Use a humidifier to ease congestion"
    ],
    whenToSeekHelp: "If symptoms persist beyond 10 days or worsen significantly"
  },
  {
    id: "flu",
    name: "Influenza (Flu)",
    description: "A contagious respiratory illness caused by influenza viruses, more severe than a common cold.",
    severity: "moderate",
    commonSymptoms: ["fever", "cough", "sore-throat", "body-aches", "headache", "fatigue", "chills"],
    recommendations: [
      "Rest and isolate to prevent spread",
      "Drink plenty of fluids",
      "Take antiviral medication if prescribed within 48 hours",
      "Use fever reducers as recommended",
      "Monitor symptoms closely"
    ],
    whenToSeekHelp: "If experiencing difficulty breathing, chest pain, persistent fever, or if you're in a high-risk group"
  },
  {
    id: "covid-19",
    name: "COVID-19",
    description: "A respiratory illness caused by the SARS-CoV-2 virus, with symptoms ranging from mild to severe.",
    severity: "moderate",
    commonSymptoms: ["fever", "cough", "fatigue", "loss-taste-smell", "shortness-breath", "body-aches", "sore-throat"],
    recommendations: [
      "Self-isolate immediately",
      "Get tested to confirm diagnosis",
      "Monitor oxygen levels if possible",
      "Rest and stay hydrated",
      "Contact healthcare provider for guidance on treatment options"
    ],
    whenToSeekHelp: "If experiencing severe shortness of breath, persistent chest pain, confusion, or bluish lips/face"
  },
  {
    id: "gastroenteritis",
    name: "Gastroenteritis (Stomach Flu)",
    description: "Inflammation of the digestive tract, usually caused by viral or bacterial infection.",
    severity: "moderate",
    commonSymptoms: ["nausea", "vomiting", "diarrhea", "abdominal-pain", "fever", "body-aches"],
    recommendations: [
      "Stay hydrated with clear fluids and oral rehydration solutions",
      "Eat bland foods when able (BRAT diet: bananas, rice, applesauce, toast)",
      "Avoid dairy and fatty foods temporarily",
      "Rest as much as possible",
      "Wash hands frequently to prevent spread"
    ],
    whenToSeekHelp: "If severe dehydration, bloody stools, high fever, or symptoms lasting more than 3 days"
  },
  {
    id: "migraine",
    name: "Migraine",
    description: "A neurological condition characterized by intense, debilitating headaches often accompanied by other symptoms.",
    severity: "moderate",
    commonSymptoms: ["headache", "nausea", "dizziness", "fatigue"],
    recommendations: [
      "Rest in a quiet, dark room",
      "Apply cold compress to forehead",
      "Take prescribed migraine medication early",
      "Stay hydrated",
      "Identify and avoid triggers (stress, certain foods, lack of sleep)"
    ],
    whenToSeekHelp: "If experiencing sudden severe headache, headache with fever/stiff neck, or neurological symptoms like vision changes"
  },
  {
    id: "sinusitis",
    name: "Sinusitis",
    description: "Inflammation or infection of the sinuses, often following a cold or allergies.",
    severity: "low",
    commonSymptoms: ["congestion", "headache", "fever", "runny-nose", "cough"],
    recommendations: [
      "Use saline nasal irrigation",
      "Apply warm compresses to face",
      "Stay hydrated",
      "Use a humidifier",
      "Take decongestants or pain relievers as needed"
    ],
    whenToSeekHelp: "If symptoms persist beyond 10 days, severe headache, or high fever"
  },
  {
    id: "bronchitis",
    name: "Acute Bronchitis",
    description: "Inflammation of the bronchial tubes, usually following a respiratory infection.",
    severity: "moderate",
    commonSymptoms: ["cough", "fatigue", "shortness-breath", "chest-pain", "fever"],
    recommendations: [
      "Get plenty of rest",
      "Drink warm fluids",
      "Use a humidifier",
      "Avoid smoke and irritants",
      "Take over-the-counter cough suppressants if needed"
    ],
    whenToSeekHelp: "If cough lasts more than 3 weeks, coughing up blood, or experiencing severe breathing difficulties"
  }
];

export const getMatchingConditions = (selectedSymptoms) => {
  if (selectedSymptoms.length === 0) return [];

  const scoredConditions = conditions.map(condition => {
    const matchCount = selectedSymptoms.filter(symptom => 
      condition.commonSymptoms.includes(symptom)
    ).length;
    
    const matchPercentage = (matchCount / selectedSymptoms.length) * 100;
    
    return {
      condition,
      matchCount,
      matchPercentage
    };
  });

  return scoredConditions
    .filter(item => item.matchCount > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .map(item => item.condition)
    .slice(0, 3);
};
