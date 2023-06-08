import SongActions from "./SongActions";
import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../../models/theme/styles";
import { RootState } from "../../types/redux/store";
import { getAppTheme } from "../../controllers/themes";
import SongController from "../Reusable/SongController";
import { IActiveSong } from "../../controllers/redux/song";
import { ISettings } from "../../controllers/redux/settings";

export default function Song(): ReactElement {
	const { data }: IActiveSong = useSelector((state: RootState) => state.song);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	return (
		<View className="flex-1 items-center justify-between pt-5 pb-10" style={{ backgroundColor: (getAppTheme(appTheme)).background }} >
			<Image
				className="w-72 h-72 rounded-xl"
				source={{uri: data.artwork}}
			/>
			<View>
				<Text
					className="text-2xl"
					style={[{color: (getAppTheme(appTheme)).text}, styles.fontFamilyText]}
				>{data.title}</Text>
				<Text
					className="text-base"
					style={[{color: (getAppTheme(appTheme)).text}, styles.fontFamilyText]}
				>{data.artist}</Text>
			</View>
			<SongActions/>
			<View className="w-80">
				<SongController itemSize={60}/>
			</View>
		</View>
	);
}
