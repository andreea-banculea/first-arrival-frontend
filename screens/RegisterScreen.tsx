import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { nameValidator } from "../helpers/nameValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { phoneNumberValidator } from "../helpers/phoneNumberValidator";
import { Role, UserType } from "../types/User";
import { useRegisterUser } from "./hooks/useRegisterUser";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const { userCreate } = useRegisterUser();
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneNumberError = phoneNumberValidator(phoneNumber.value);

    if (emailError || passwordError || nameError || phoneNumberError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      return;
    }

    const user: UserType = {
      id: 0,
      name: name.value,
      email: email.value,
      password: password.value,
      phoneNumber: phoneNumber.value,
      location: null, // Assuming LocationType is defined elsewhere
      role: Role.USER, // Assuming Role is an enum or type defined elsewhere
      certification: null, // Optional field
      volunteerLevel: null, // Optional field
    };

    userCreate(user, {
      onSuccess: () => {
        setTimeout(() => {
          navigation.navigate("LoginScreen");
        }, 1000);
      },
    });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text: string) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
        description={undefined}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: string) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description={undefined}
      />
      <TextInput
        label="Phone number"
        returnKeyType="next"
        value={phoneNumber.value}
        onChangeText={(text: string) =>
          setPhoneNumber({ value: text, error: "" })
        }
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
        autoCapitalize="none"
        autoCompleteType="phoneNumber"
        textContentType="phoneNumber"
        keyboardType="phone-number"
        description={undefined}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: string) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        description={undefined}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
