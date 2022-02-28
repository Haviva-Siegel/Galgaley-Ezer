import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import AppButton from "./AppButton";
import httpURL from "../services/httpService";
import { globalStyles } from "../styles/global";
import { SignupContext } from "../context/UserContext";
import FormInput from "./FormInput";
import { ERRORS, emailRegex } from "../utils/validations";
import PickerInput from "./PickerInput";

const SignupCard = () => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const { signup, setSignup } = useContext(SignupContext);
  const watchShowLanguage = watch("language", false);
  const onSubmit = async (info, e) => {
    e.preventDefault();
    console.log(info);
    try {
      const { data } = await httpURL.post("/auth/signup", { ...info });
      setSignup(data);
    } catch ({ response }) {
      if (response && response.status === 400) {
        setError(
          "email",
          {
            type: "server side",
            message: ERRORS.emailAlreadyInUse,
          },
          { shouldFocus: true }
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={globalStyles.formContainer}>
      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERRORS.requiredField },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            errorText={errors.firstName?.message}
            placeholder="שם פרטי"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textContentType="name"
          />
        )}
        name="firstName"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERRORS.requiredField },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            errorText={errors.lastName?.message}
            placeholder="שם משפחה"
            style={globalStyles.formTextInput}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textContentType="familyName"
          />
        )}
        name="lastName"
      />
      <Controller
        control={control}
        render={({ value }) => (
          <PickerInput
            selectedValue={value}
            onValueChange={(itemValue) => setValue("language", itemValue)}
            itemValue={["java", "js", "html"]}
            label={watchShowLanguage}
          />
        )}
        name="language"
        defaultValue="java"
      />
      {(console.log(watchShowLanguage), console.log(getValues("language")))}

      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERRORS.requiredField },
          pattern: {
            value: emailRegex,
            message: ERRORS.invalidEmail,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            errorText={errors.email?.message}
            placeholder="כתובת מייל"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        rules={{
          required: { value: true, message: ERRORS.requiredField },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            errorText={errors.password?.message}
            placeholder="סיסמא"
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={isSecureEntry}
            value={value}
            textContentType="password"
            onPress={() => setIsSecureEntry((prev) => !prev)}
          />
        )}
        name="password"
      />

      <AppButton onPress={handleSubmit(onSubmit)}>סיימתי!</AppButton>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  picker: {
    backgroundColor: "#000",
    marginBottom: 10,
    borderRadius: 6,
  },
});

export default SignupCard;
