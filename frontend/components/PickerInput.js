import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../styles/global";
import { Picker } from "@react-native-picker/picker";

const PickerInput = (props) => {
  return (
    <View style={globalStyles.formInputGroup}>
      <Pressable style={globalStyles.formTextInputContainer}>
        <Picker style={globalStyles.formTextInput} {...props}>
          {props.itemValue.map((value) => (
            <Picker.Item key={value} label={props.label} value={value} />
          ))}
        </Picker>
      </Pressable>
      {props.errorText && <AppText error>{props.errorText}</AppText>}
    </View>
  );
};

export default PickerInput;

const styles = StyleSheet.create({});
