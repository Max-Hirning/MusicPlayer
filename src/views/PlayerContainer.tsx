import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { styles } from "../models/theme/styles";
import { RootState } from "../types/redux/store";
import { lightTheme } from "../models/theme/theme";
import SongController from "./Reusable/SongController";
import { IActiveSong } from "../controllers/redux/song";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../types/navigation";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function PlayerContainer(): ReactElement {
	const navigation = useNavigation<ScreenNavigationProp>();
	const { data, exists }: IActiveSong = useSelector((state: RootState) => state.song);

	const openSongPage = (): void => {
		navigation.push("Song");
	};

	const getText = (text: string): string => {
		if (text.length >= 18) {return `${text.slice(0, 18)}...`;}
		return text;
	};

	if (exists) {
		return (
			<TouchableOpacity
				onPress={openSongPage}
				style={{backgroundColor: lightTheme.playerBackground}}
				className="absolute bottom-0 flex flex-row items-center px-4 py-3 justify-between w-full rounded-t-xl"
			>
				<View className="flex flex-row items-center">
					<Image
						className="w-14 h-14 rounded-xl"
						source={{uri: data.artwork}}
					/>
					<View className="ml-3">
						<Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{getText(data.title)}</Text>
						{(data.album.length !== 0) && <Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{getText(data.album)}</Text>}
					</View>
				</View>
				<View className="w-28">
					<SongController itemSize={30}/>
				</View>
			</TouchableOpacity>
		);
	}

	return <></>;
}
