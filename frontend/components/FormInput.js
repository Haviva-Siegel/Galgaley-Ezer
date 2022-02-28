import React from "react";
import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "./../styles/global";
import AppText from "./AppText";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../styles/styles.config";

const FormInput = (props) => {
  return (
    <View style={globalStyles.formInputGroup}>
      <Pressable style={globalStyles.formTextInputContainer}>
        <TextInput style={globalStyles.formTextInput} {...props} />
        {props.textContentType === "password" && (
          <TouchableOpacity onPress={props.onPress}>
            <FontAwesome5
              name={props.secureTextEntry ? "eye" : "eye-slash"}
              size={20}
              color={COLORS.grey}
              style={globalStyles.secondaryIcon}
            />
          </TouchableOpacity>
        )}
      </Pressable>
      {props.errorText && <AppText error>{props.errorText}</AppText>}
    </View>
  );
};

export default FormInput;
