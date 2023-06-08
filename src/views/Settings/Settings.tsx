import { View } from "react-native";
import React, { ReactElement } from "react";
import { themes } from "../../models/theme/theme";
import { getAppTheme } from "../../controllers/themes";
import { useDispatch, useSelector } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { ISettings } from "../../controllers/redux/settings";
import { AppDispatch, RootState } from "../../types/redux/store";
import { changeAppTheme } from "../../controllers/redux/settings";

export default function Settings(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const appThemeChange = (value: string): void => {
		dispatch(changeAppTheme(value));
	};

	return (
		<View className="flex-1" style={{ backgroundColor: (getAppTheme(appTheme)).background }} >
			<RNPickerSelect
				style={{
					viewContainer: {
						marginTop: 10,
						borderWidth: 1,
						borderRadius: 10,
						marginHorizontal: 10,
						borderColor: getAppTheme(appTheme).text,
					},
					inputAndroid: {
						color: getAppTheme(appTheme).text,
					},
				}}
				items={themes}
				value={appTheme}
				onValueChange={appThemeChange}
			/>
		</View>
	);
}
