export const MedicalHistoryPredefined = [
  "Diabetic",
  "Severe allergies",
  "Asthma",
  "Pregnant",
  "HIV Positive",
  "Heart Condition",
  "Epilepsy",
  "Blood Clotting Disorders",
  "Chronic Kidney Disease",
  "Chronic Obstructive Pulmonary Disease",
  "Cancer",
  "Organ Transplant",
  "Mental Health Conditions",
];

export const medicalHistoryIcons = {
  "Diabetic": "syringe",
  "Severe allergies": "allergies",
  "Asthma": "lungs",
  "Pregnant": "baby",
  "HIV Positive": "ribbon",
  "Heart Condition": "heart",
  "Epilepsy": "brain",
  "Blood Clotting Disorders": "vial",
  "Chronic Kidney Disease": "kidneys",
  "Chronic Obstructive Pulmonary Disease": "lungs",
  "Cancer": "ribbon",
  "Organ Transplant": "hand-holding-heart",
  "Mental Health Conditions": "brain",
  "Other": "plus" 
};

 function isConditionInList(condition: string) {
  return MedicalHistoryPredefined.includes(condition);
}

export function separateConditions(conditions: string[]) {
  const predefinedConditions = conditions.filter(isConditionInList);
  const customConditions = conditions.filter(condition => !isConditionInList(condition));

  return { predefinedConditions, customConditions };
}