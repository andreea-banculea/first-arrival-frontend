import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as Random from "expo-random";
import * as Crypto from "expo-crypto";
WebBrowser.maybeCompleteAuthSession();

const GoogleUp = () => {
  const [userInfo, setUserInfo] = React.useState(null);

  const navigation = useNavigation();
  const YOUR_CLIENT_ID =
    "493627146657-8h2gn5cukqb2gtl7ntq3rrha5mlgd408.apps.googleusercontent.com";
  const YOUR_REDIRECT_URI = "http://localhost:8081"

  const handlePress = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&access_type=offline&state=1234_purpleGoogle&prompt=consent`,
      YOUR_REDIRECT_URI
    );

    
    if (result.type === "success") {
      const params = Linking.parse(result.url);

      const { email, name, picture } = params.queryParams;

      const user = {
        email,
        name,
        picture,
      };
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.oauthButton}>
      <Text>or</Text>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.button}>
          <Image
            source={require("../assets/logos/google-logo.jpg")}
            style={{ width: 20, height: 20 }}
          />
          <Text> Login with Google</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.button}>
        <Image
          source={require("../assets/logos/microsoft-logo.png")}
          style={{ width: 20, height: 20 }}
        />
        <Text> Login with Microsoft</Text>
      </View>
    </View>
  );
};

export default GoogleUp;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    width: "68%",
    justifyContent: "space-between",
    alignContent: "center",
    borderRadius: 16,
  },
  oauthButton: {
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "#DEB887",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
