import SongActions from "./SongActions";
import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../../models/theme/styles";
import { RootState } from "../../types/redux/store";
import { getAppTheme } from "../../controllers/themes";
import { useProgress } from "react-native-track-player";
import SongController from "../Reusable/SongController";
import { IActiveSong } from "../../controllers/redux/song";
import { ISettings } from "../../controllers/redux/settings";

export default function Song(): ReactElement {
	const progress = useProgress();
	const { data }: IActiveSong = useSelector((state: RootState) => state.song);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const getText = (text: string): string => {
		if (text.length === 0) {
			return "Unknown";
		}
		return text;
	};

	return (
		<View className="flex-1 items-center justify-between pt-5 pb-10" style={{ backgroundColor: (getAppTheme(appTheme)).background }} >
			<Image
				className="w-72 h-72 rounded-xl"
				source={{uri: data.artwork}}
			/>
			<View>
				<Text
					className="text-2xl text-center"
					style={[{color: (getAppTheme(appTheme)).text}, styles.fontFamilyText]}
				>{getText(data.title)}</Text>
				<Text
					className="text-base text-center mt-2"
					style={[{color: (getAppTheme(appTheme)).text}, styles.fontFamilyText]}
				>Author: {getText(data.artist)}</Text>
			</View>
			<SongActions/>
			<View
				className="w-72 h-1"
				style={{backgroundColor: getAppTheme(appTheme).progressBar}}
			>
				<View
					className="h-1"
					style={{backgroundColor: getAppTheme(appTheme).icon, width: `${progress.position/(progress.duration/100)}%`}}
				>

				</View>
			</View>
			<View className="w-80">
				<SongController itemSize={60}/>
			</View>
		</View>
	);
}
