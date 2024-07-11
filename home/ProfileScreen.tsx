import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../hooks/UserContext";
import { useActiveRouteName } from "../routing/ActiveRouteContext";
import { Role } from "../types/User";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CertificationEditPage } from "./components/CetrificationEditScreen";

import { NavigationProp } from "@react-navigation/native";

function ProfileScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { user, loading , handleLogout, refetchUser} = useUser();
  const { setActiveRouteName } = useActiveRouteName();
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState(
    user?.certification?.certificationCode || ""
  );

  useEffect(() => {
    setActiveRouteName("Profile");
  }, [setActiveRouteName]);

  if (user === undefined || loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  const handleEditPress = () => {
    navigation.navigate("Certification", user);
  };

  const handleCodeChange = (text: string) => {
    setCode(text);
  };

  const handleCodeSubmit = () => {
    setIsEditing(false);
  };


  const onLogoutPressed = async () => {
    try {
      await handleLogout();
      await refetchUser();
    } catch (error) {
       console.log('Error logging out:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.profileContainer}>
          {user.role === Role.VOLUNTEER ? (
            <Image
              source={require("../assets/paramedic-profile-photo.png")}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("../assets/user-profile-photo.jpg")}
              style={styles.profileImage}
            />
          )}
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role}</Text>
        </View>
        <View style={styles.accountDetails}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={user.name}
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={user.email}
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="call-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={user.phoneNumber}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value="**********"
              secureTextEntry={true}
              editable={false}
            />
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
        </View>
        {
          <View style={styles.inputContainer}>
            <Ionicons
              name="medkit-outline"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              value={code.toString()} 
              editable={isEditing}
              onChangeText={handleCodeChange}
              onSubmitEditing={handleCodeSubmit}
            />
            <TouchableOpacity onPress={handleEditPress}>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        }
        <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPressed}>
          <Text style={styles.logoutButtonText}>Logout</Text>
          <Image
            source={require("../assets/logout.png")}
            style={{
              width: 20,
              height: 20,
              tintColor: "white",
              marginHorizontal: 15,
            }}
          ></Image>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  role: {
    fontSize: 16,
    color: "gray",
  },
  accountDetails: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal:15,
    marginTop: 20,
    backgroundColor: "#c10202",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Certification"
        component={CertificationEditPage}
      />
    </ProfileStack.Navigator>
  );
}

export { HomeStackScreen, ProfileScreen };
  function handleLogout() {
    throw new Error("Function not implemented.");
  }

