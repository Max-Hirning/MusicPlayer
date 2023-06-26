import SoundIcon from "../../icons/sound";
import React, { ReactElement } from "react";
import { ISong } from "../../types/redux/song";
import { styles } from "../../models/theme/styles";
import TrackPlayer from "react-native-track-player";
import { getAppTheme } from "../../controllers/themes";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ISettings } from "../../controllers/redux/settings";
import { ScreenNavigationProp } from "../../types/navigation";
import { AppDispatch, RootState } from "../../types/redux/store";
import { useGetTrackStatus } from "../../controllers/hooks/tracks";
import { useSortSongsList } from "../../controllers/hooks/useSortSongsList";
import { IActiveSong, resetSong, setSong } from "../../controllers/redux/song";
import { setSongsGroupListAsync } from "../../controllers/redux/songsGroupList";
import { View, FlatList, Text, Image, TouchableOpacity, ScrollView } from "react-native";

export default function SongsList(): ReactElement {
	const songsList = useSortSongsList();
	const isPlaying = useGetTrackStatus();
	const dispatch: AppDispatch = useDispatch();
	const navigation = useNavigation<ScreenNavigationProp>();
	const song: IActiveSong = useSelector((state: RootState) => state.song);
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

	const chooseSong = (el: ISong, id: number) => async (): Promise<void> => {
		dispatch(setSong(el));
		await TrackPlayer.skip(id);
		(!isPlaying) && await TrackPlayer.play();
	};

	if (Array.isArray(songsList)) {
		return (
			<ScrollView className="mt-4 mb-28">
				{
					songsList.map((item: ISong, index: number): ReactElement => {
						return (
							<TouchableOpacity
								key={item.url}
								onPress={chooseSong(item, index)}
								className="flex flex-row items-center mx-6 my-3 justify-between"
							>
								<View className="flex flex-row items-center">
									<Image
										source={{uri: item.artwork}}
										className="w-14 h-14 rounded-xl"
									/>
									<View className="ml-3">
										<Text style={[styles.fontFamilyText, {color: (getAppTheme(appTheme)).text}]}>{getText(item.title)}</Text>
										<Text style={[styles.fontFamilyText, {color: (getAppTheme(appTheme)).text}]}>{getText(item.album)}</Text>
									</View>
								</View>
								{
									(isPlaying && (song.data.url === item.url)) &&
								<SoundIcon
									width={28}
									height={28}
									color={(getAppTheme(appTheme)).icon}
								/>
								}
							</TouchableOpacity>
						);
					})
				}
			</ScrollView>
		);
	} else {
		return (
			<FlatList
				numColumns={2}
				horizontal={false}
				className="mt-4 mb-10"
				contentContainerStyle={{
					alignItems: "center",
				}}
				data={Object.entries(songsList)}
				keyExtractor={(item: [string, ISong[]]): string => item[0].toString()}
				renderItem={({ item }: { item: [string, ISong[]] }): ReactElement => {
					return (
						<TouchableOpacity
							onPress={() => {
								dispatch(resetSong());
								dispatch(setSongsGroupListAsync(item[1]));
								navigation.navigate("SongsGroupList", { title: `${songsSortType.slice(0, songsSortType.length - 1)}: ${item[0].toLowerCase()}` });
							}}
							style={{ backgroundColor: getAppTheme(appTheme).playerBackground }}
							className="flex-col items-center justify-between w-40 h-40 py-2 flex items-center mx-3 my-3 justify-between rounded-xl"
						>
							<Image
								className="w-28 h-28 rounded-xl"
								source={{uri: item[1][0].artwork}}
							/>
							<Text style={[{color: getAppTheme(appTheme).text}, styles.fontFamilyText]}>{item[0]}</Text>
						</TouchableOpacity>
					);
				}}
			/>
		);
	}
}
