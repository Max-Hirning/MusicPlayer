import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { RootState } from "../../types/redux/store";
import { View, Text, TextInput } from "react-native";
import { getAppTheme } from "../../controllers/themes";
import { ISettings } from "../../controllers/redux/settings";

interface Props {
    value: string;
    title: string;
    placeholder: string;
    changeFunc: (value: string) => void;
}

export default function Input({ value, title, placeholder, changeFunc }: Props): ReactElement {
    const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

    return (
        <View>
            <Text 
                style={{backgroundColor: getAppTheme(appTheme).background }}
                className="ml-2 text-base relative top-2 text-center z-10 w-24" 
            >{title}</Text>
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={changeFunc}
                className="rounded-xl border-2 px-4 text-lg"
                style={{borderColor: getAppTheme(appTheme).text}}
            />
        </View>
    )
}