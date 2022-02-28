import React, { useContext, useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AppButton from "./AppButton";
import { globalStyles } from "../styles/global";
import httpURL from "../services/httpService";
import { UserContext, SignupContext } from "../context/UserContext";
import SigninCardHeader from "./SigninCardHeader";
import FormInput from "./FormInput";
import { emailRegex, ERRORS } from "../utils/validations";

const SigninCard = () => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useContext(UserContext);
  const { signup, setSignup } = useContext(SignupContext);

  const onSubmit = async (info, e) => {
    e.preventDefault();
    if (signup) {
      info.username = signup.email;
    }

    try {
      const { data } = await httpURL.post("/auth/login", { ...info });
      console.log(data);
      setUser(data.user);
    } catch ({ response }) {
      if (response && response.status === 401) {
        setError(
          "username",
          {
            type: "server side",
            message: ERRORS.wrongPasswordOrEmail,
          },
          { shouldFocus: true }
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={globalStyles.formContainer}>
      {signup ? (
        <SigninCardHeader heading={signup.name} />
      ) : (
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
              errorText={errors.username?.message}
              placeholder="כתובת מייל"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          )}
          name="username"
        />
      )}

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

      <AppButton onPress={handleSubmit(onSubmit)}>כניסה</AppButton>
    </KeyboardAvoidingView>
  );
};

export default SigninCard;
