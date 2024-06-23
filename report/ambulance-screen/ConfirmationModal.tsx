import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';

type ConfirmationModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Cancel Request</Text>
          <Text style={styles.modalMessage}>Are you sure you want to cancel the emergency request?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.modalButton, styles.modalButtonConfirm]} onPress={onConfirm}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onCancel}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  modalButtonConfirm: {
    backgroundColor: '#d60202',
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ConfirmationModal;
