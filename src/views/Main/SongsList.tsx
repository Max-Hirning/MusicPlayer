import SoundIcon from "../../icons/sound";
import React, { ReactElement } from "react";
import { ISong } from "../../types/redux/song";
import { styles } from "../../models/theme/styles";
import TrackPlayer from "react-native-track-player";
import { getAppTheme } from "../../controllers/themes";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../../controllers/redux/song";
import { ISettings } from "../../controllers/redux/settings";
import { AppDispatch, RootState } from "../../types/redux/store";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";

export default function SongsList(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const songs: ISong[] = useSelector((state: RootState) => state.songs);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const getText = (text: string): string => {
		if (text.length === 0) {
			return "Unknown";
		}
		if (text.length >= 25) {
			return `${text.slice(0, 25)}...`;
		}
		return text;
	};

	const chooseSong = (song: ISong, id: number) => async (): Promise<void> => {
		dispatch(setSong(song));
		TrackPlayer.skip(id);
	};

	return (
		<FlatList
			data={songs}
			className="mt-4 mb-28"
			renderItem={({ item, index }: { item: ISong, index: number }): ReactElement => {
				return (
					<TouchableOpacity
						onPress={chooseSong(item, index)}
						className="flex flex-row items-center mx-6 my-3 justify-between"
					>
						<View className="flex flex-row items-center">
							<Image
								className="w-14 h-14 rounded-xl"
								source={{uri: item.artwork}}
							/>
							<View className="ml-3">
								<Text style={[styles.fontFamilyText, {color: (getAppTheme(appTheme)).text}]}>{getText(item.title)}</Text>
								<Text style={[styles.fontFamilyText, {color: (getAppTheme(appTheme)).text}]}>{getText(item.album)}</Text>
							</View>
						</View>
						{
							(false) &&
							<SoundIcon
								width={28}
								height={28}
								color={(getAppTheme(appTheme)).icon}
							/>
						}
					</TouchableOpacity>
				);
			}}
			keyExtractor={(_: ISong, index: number): string => index.toString()}
		/>
	);
}
