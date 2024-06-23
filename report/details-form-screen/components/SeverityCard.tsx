import { StyleSheet } from 'react-native';

import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import SegmentedControl from '@react-native-community/segmented-control';

const severityIcons = ["info-circle", "exclamation-triangle", "heartbeat"];
const severityColors = ["#FFCDD2", "#FF8A65", "#D32F2F"];

const SeverityCard = ({ severityIndex, setSeverityIndex }: { severityIndex: number, setSeverityIndex: (index: number) => void }) => {
  const severityLevels = ["Low", "Medium", "High"];

  return (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <FontAwesome
          name={severityIcons[severityIndex] as any}
          size={24}
          color={severityColors[severityIndex]}
          style={styles.severityIcon}
        />
        <Text style={styles.label}>Severity</Text>
      </View>
      <SegmentedControl
        values={severityLevels}
        selectedIndex={severityIndex}
        onChange={(event) =>
          setSeverityIndex(event.nativeEvent.selectedSegmentIndex)
        }
        style={styles.segmentedControl}
      />
    </Card>
  );
};

export default SeverityCard;


export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginHorizontal: -5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  severityIcon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  segmentedControl: {
    marginTop: 10,
  },
});
