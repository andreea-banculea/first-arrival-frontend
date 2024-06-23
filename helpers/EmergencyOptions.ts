const accidentIcon = require("../assets/emergency-type/car-accident.png");
const chestPainIcon = require("../assets/emergency-type/chest-pain.png");
const breathlessnessIcon = require("../assets/emergency-type/breathlessness.png");
const unconsciousnessIcon = require("../assets/emergency-type/unconsciousness.png");
const paralysisIcon = require("../assets/emergency-type/paralysis.png");
const otherIcon = require("../assets/emergency-type/other.png");

export const emergencyOptions = [
  { icon: accidentIcon, text: "Accident", colors: ["#d60202", "#995656"] },
  { icon: chestPainIcon, text: "Chest pain", colors: ["#d60202", "#995656"] },
  {
    icon: breathlessnessIcon,
    text: "Breathlessness",
    colors: ["#d60202", "#995656"],
  },
  {
    icon: unconsciousnessIcon,
    text: "Unconsciousness",
    colors: ["#d60202", "#995656"],
  },
  {
    icon: paralysisIcon,
    text: "Sudden paralysis or weakness",
    colors: ["#d60202", "#995656"],
  },
  {
    icon: otherIcon,
    text: "Other",
    colors: ["#d60202", "#995656"],
  },
];

export function getEmergencyOptionByText(text: string) {
  const emergencyOption = emergencyOptions.find(option => option.text === text);
  if(emergencyOption) {
    return emergencyOption;
  } else {
    return emergencyOptions[5];
  }
}