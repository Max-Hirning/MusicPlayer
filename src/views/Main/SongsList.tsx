import SoundIcon from "../../icons/sound";
import { ISong } from "../../types/redux/song";
import { styles } from "../../models/theme/styles";
import React, { ReactElement, useState } from "react";
import { getAppTheme } from "../../controllers/themes";
import { useSelector, useDispatch } from "react-redux";
import { setSong } from "../../controllers/redux/song";
import { ISettings } from "../../controllers/redux/settings";
import { AppDispatch, RootState } from "../../types/redux/store";
// import { useGetTrackStatus } from "../../controllers/hooks/tracks";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";
import TrackPlayer, { useTrackPlayerEvents, Event } from "react-native-track-player";

export default function SongsList(): ReactElement {
	// const isPlayed = useGetTrackStatus();
	const dispatch: AppDispatch = useDispatch();
	const [activeTrack, setActiveTrack] = useState<number>(-1);
	const songs: ISong[] = useSelector((state: RootState) => state.songs);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);
	
	// useTrackPlayerEvents([Event.PlaybackTrackChanged, Event.PlaybackMetadataReceived], async (el: any) => {
	// 	console.log(el);
	// 	const activeTrackIndex = await TrackPlayer.getCurrentTrack();
	// 	if (activeTrackIndex) {
	// 		setActiveTrack(activeTrackIndex);
	// 	}
	// });

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
		TrackPlayer.skipToNext(id);
	};

	return (
		<FlatList
			data={songs}
			className="mt-4 mb-28"
			renderItem={({ item, index }: { item: ISong, index: number }): ReactElement => {
				return (
					<TouchableOpacity
						onPress={chooseSong(item, index+1)}
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
							(index === activeTrack) &&
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
