import { Text, View } from "react-native";
import React, { ReactElement } from "react";
import DeviceInfo from "react-native-device-info";
import { themes } from "../../models/theme/theme";
import { styles } from "../../models/theme/styles";
import ChevronDownIcon from "../../icons/chevronDown";
import { getAppTheme } from "../../controllers/themes";
import { useDispatch, useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import { ISettings } from "../../controllers/redux/settings";
import { AppDispatch, RootState } from "../../types/redux/store";
import { changeAppTheme } from "../../controllers/redux/settings";

export default function Settings(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const appThemeChange = (value: string): void => {
		dispatch(changeAppTheme(value.toLowerCase()));
	};

	const buttonText = (): string => `${appTheme.charAt(0).toUpperCase() + appTheme.slice(1)} theme`;

	return (
		<View className="flex-1 items-center justify-between pt-2 pb-5" style={{ backgroundColor: (getAppTheme(appTheme)).background }} >
			<View>
				<SelectDropdown
					data={themes}
					buttonStyle={{
						width: 200,
						borderWidth: 1,
						borderRadius: 10,
						borderColor: getAppTheme(appTheme).text,
						backgroundColor: getAppTheme(appTheme).background,
					}}
					rowTextStyle={{
						color: getAppTheme(appTheme).text,
					}}
					dropdownStyle={{
						borderWidth: 1,
						borderBottomLeftRadius: 10,
						borderBottomRightRadius: 10,
						borderColor: getAppTheme(appTheme).text,
						backgroundColor: getAppTheme(appTheme).background,
					}}
					buttonTextStyle={{
						color: getAppTheme(appTheme).text,
					}}
					defaultValue={appTheme}
					onSelect={appThemeChange}
					defaultButtonText={buttonText()}
					buttonTextAfterSelection={buttonText}
					renderDropdownIcon={(): ReactElement => <ChevronDownIcon color={getAppTheme(appTheme).icon} width={35} height={35}/>}
				/>
			</View>
			<Text
				className="text-sm"
				style={[styles.fontFamilyText, {color: getAppTheme(appTheme).text}]}
			>App version: {DeviceInfo.getVersion()}</Text>
		</View>
	);
}
