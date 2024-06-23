import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AmbulanceScreen from "../ambulance-screen/AmbulanceScreen";
import { styles } from "./DetailsFormScreen";
import AdditionalDataCard from "./components/AdditionalDataCard";
import MedicalHistoryCard from "./components/MedicalHistoryCard";
import MedicationsCard from "./components/MedicationsCard";
import SeverityCard from "./components/SeverityCard";
import SymptomsCard from "./components/SymptomsCard";
import VictimsCard from "./components/VictimsCard";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { getEmergencyOptionByText } from "../../helpers/EmergencyOptions";
import {
  EmergencyDTOType,
  MedicalHistoryType,
  Medication,
  getSeverityEnum,
} from "../../types/Emergency";
import { useUpdateEmergencyDTO } from "../hooks/useUpdateEmergencyDTO";

const severityIcons = ["info-circle", "exclamation-triangle", "heartbeat"];

type DetailsFormScreenProps = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

export default function DetailsFormScreen({
  navigation,
  route,
}: DetailsFormScreenProps) {
  const emergency = route.params.emergency;
  const emergencyType = getEmergencyOptionByText(emergency.emergencyType);
  const [description, setDescription] = useState(emergency.symptomsDescription);
  const [additionalData, setAdditionalData] = useState(
    emergency.additionalInformation
  );
  const [medicalHistory, setMedicalHistory] = useState([
    { label: "Diabetic", checked: false },
    { label: "Severe allergies", checked: false },
    { label: "Asthma", checked: false },
    { label: "Pregnant", checked: false },
    { label: "HIV Positive", checked: false },
    { label: "Heart Condition", checked: false },
    { label: "Epilepsy", checked: false },
    { label: "Blood Clotting Disorders", checked: false },
    { label: "Chronic Kidney Disease", checked: false },
    { label: "Chronic Obstructive Pulmonary Disease", checked: false },
    { label: "Cancer", checked: false },
    { label: "Organ Transplant", checked: false },
    { label: "Mental Health Conditions", checked: false },
  ]);

  const [medications, setMedications] = useState<
    { label: string; checked: boolean }[]
  >([]);

  const [newCondition, setNewCondition] = useState("");
  const [newMedication, setNewMedication] = useState("");

  const { emergencyUpdate } = useUpdateEmergencyDTO();

  const myMedicalHistory = emergency.medicalHistory.map(
    (condition: MedicalHistoryType) => condition.name
  );
  const myMedications = emergency.medications.map(
    (medication: Medication) => medication.name
  );

  useEffect(() => {
    if (myMedicalHistory.length > 0) {
      const existingLabels = new Set(medicalHistory.map((item) => item.label));
      let updatedMedicalHistory = medicalHistory.map((item) => ({
        ...item,
        checked: myMedicalHistory.includes(item.label),
      }));

      myMedicalHistory.forEach((label: string) => {
        if (!existingLabels.has(label)) {
          updatedMedicalHistory.push({ label, checked: true });
        }
      });

      setMedicalHistory(updatedMedicalHistory);
    }
  }, []);

  useEffect(() => {
    if (myMedications.length > 0) {
      const updatedMedications = myMedications.map((medication: string) => ({
        label: medication,
        checked: true,
      }));
      setMedications(updatedMedications);
    }
  }, []);

  const handleSubmit = () => {

    const newEmergency: EmergencyDTOType = {
      id: emergency.id,
      locationId: emergency.location.id,
      reportedById: emergency.reportedBy.id,
      emergencyType: emergency.emergencyType,
      status: emergency.status,
      timestamp: emergency.timestamp,
      severity: getSeverityEnum(severityIndex),
      nrOfVictims: nrOfVictims,
      symptomsDescription: description,
      medicalHistory: medicalHistory
        .filter((item) => item.checked)
        .map((item) => item.label),
      medications: medications
        .filter((item) => item.checked)
        .map((item) => item.label),
      additionalInformation: additionalData,
      volunteersAcceptedIds: [],
    };
    emergencyUpdate(newEmergency);
    navigation.navigate("Ambulance", {
      emergency: newEmergency,
    });
  };

  const addMedicalHistory = () => {
    if (newCondition) {
      setMedicalHistory([
        ...medicalHistory,
        { label: newCondition, checked: true },
      ]);
      setNewCondition("");
    }
  };

  const toggleCondition = (index: number) => {
    const updatedHistory = medicalHistory.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setMedicalHistory(updatedHistory);
  };

  const addMedication = () => {
    if (newMedication) {
      setMedications([...medications, { label: newMedication, checked: true }]);
      setNewMedication("");
    }
  };

  const toggleMedication = (index: number) => {
    const updatedMedications = medications.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    setMedications(updatedMedications);
  };

  const [severityIndex, setSeverityIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const [nrOfVictims, setNrOfVictims] = useState("1");
  const [items, setItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "10+", value: "10+" },
    { label: "15+", value: "15+" },
    { label: "20+", value: "20+" },
    { label: "50+", value: "50+" },
  ]);

  const deleteCondition = (index: number): void => {
    const updatedHistory = medicalHistory.filter((_, i) => i !== index);
    setMedicalHistory(updatedHistory);
  };

  const deleteMedication = (index: number): void => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.title}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={emergencyType.colors}
          style={styles.iconWrapper}
        >
          <Image source={emergencyType.icon} style={styles.icon} />
        </LinearGradient>
        <Text style={styles.text}>{emergencyType.text}</Text>
      </View>

      <SeverityCard
        severityIndex={severityIndex}
        setSeverityIndex={setSeverityIndex}
      />

      <VictimsCard
        open={open}
        value={nrOfVictims}
        items={items}
        setOpen={setOpen}
        setValue={setNrOfVictims}
        setItems={setItems}
      />

      <SymptomsCard description={description} setDescription={setDescription} />

      <MedicalHistoryCard
        medicalHistory={medicalHistory}
        newCondition={newCondition}
        setNewCondition={setNewCondition}
        addMedicalHistory={addMedicalHistory}
        toggleCondition={toggleCondition}
        deleteCondition={deleteCondition}
      />
      <MedicationsCard
        medications={medications}
        newMedication={newMedication}
        setNewMedication={setNewMedication}
        addMedication={addMedication}
        toggleMedication={toggleMedication}
        deleteMedication={deleteMedication}
      />

      <AdditionalDataCard
        additionalData={additionalData}
        setAdditionalData={setAdditionalData}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Details</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const DetailsFormStack = createNativeStackNavigator();

export function ReportEmergencyStackDetailsForm() {
  return (
    <DetailsFormStack.Navigator>
      <DetailsFormStack.Screen
        name="Details Form"
        component={DetailsFormScreen}
        options={{ headerShown: false }}
      />
      <DetailsFormStack.Screen
        name="Ambulance"
        component={AmbulanceScreen}
        options={{ headerShown: false }}
      />
    </DetailsFormStack.Navigator>
  );
}
