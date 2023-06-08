import SongActions from "./SongActions";
import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../../models/theme/styles";
import { RootState } from "../../types/redux/store";
import { lightTheme } from "../../models/theme/theme";
import SongController from "../Reusable/SongController";
import { IActiveSong } from "../../controllers/redux/song";

export default function Song(): ReactElement {
	const { data, exists }: IActiveSong = useSelector((state: RootState) => state.song);
	console.log(data, exists);
	return (
		<View className="flex-1 items-center justify-between pt-5 pb-10">
			<Image
				className="w-72 h-72 rounded-xl"
				source={{uri: data.artwork}}
			/>
			<View>
				<Text
					className="text-2xl"
					style={[{color: lightTheme.text}, styles.fontFamilyText]}
				>{data.title}</Text>
				<Text
					className="text-base"
					style={[{color: lightTheme.text}, styles.fontFamilyText]}
				>{data.artist}</Text>
			</View>
			<SongActions/>
			<View className="w-80">
				<SongController itemSize={60}/>
			</View>
		</View>
	);
}
