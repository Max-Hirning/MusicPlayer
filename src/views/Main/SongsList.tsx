import SoundIcon from "../../icons/sound";
import React, { ReactElement } from "react";
import { ISong } from "../../types/redux/song";
import { styles } from "../../models/theme/styles";
import { getAppTheme } from "../../controllers/themes";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../../controllers/redux/song";
import { useNavigation } from "@react-navigation/native";
import { ISettings } from "../../controllers/redux/settings";
import { ScreenNavigationProp } from "../../types/navigation";
import TrackPlayer, { State } from "react-native-track-player";
import { AppDispatch, RootState } from "../../types/redux/store";
import { useSortSongsList } from "../../controllers/hooks/useSortSongsList";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import { setSongsGroupListAsync } from "../../controllers/redux/songsGroupList";

export default function SongsList(): ReactElement {
	const songsList = useSortSongsList();
	const dispatch: AppDispatch = useDispatch();
	const navigation = useNavigation<ScreenNavigationProp>();
	const { appTheme, songsSortType }: ISettings = useSelector((state: RootState) => state.settings);

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
		await TrackPlayer.skip(id);
		const trackState: State = await TrackPlayer.getState();
		(trackState !== State.Playing) && TrackPlayer.play();
	};

	if (Array.isArray(songsList)) {
		return (
			<FlatList
				data={songsList}
				className="mt-4 mb-28"
				keyExtractor={(_: ISong, index: number): string => index.toString()}
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
			/>
		);
	} else {
		return (
			<FlatList
				className="mt-4 mb-28"
				data={Object.entries(songsList)}
				renderItem={({ item }: { item: [string, ISong[]] }): ReactElement => {
					return (
						<TouchableOpacity
							onPress={() => {
								dispatch(setSongsGroupListAsync(item[1]));
								navigation.navigate("SongsGroupList", { title: `${songsSortType.slice(0, songsSortType.length - 1)}: ${item[0].toLowerCase()}` });
							}}
							style={{ backgroundColor: getAppTheme(appTheme).playerBackground }}
							className="flex-col items-center justify-between w-40 h-40 py-2 flex items-center mx-6 my-3 justify-between rounded-xl"
						>
							<Image
								className="w-28 h-28 rounded-xl"
								source={{uri: item[1][0].artwork}}
							/>
							<Text>{item[0]}</Text>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(_: [string, ISong[]], index: number): string => index.toString()}
			/>
		);
	}
}
