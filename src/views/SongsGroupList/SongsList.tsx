import SoundIcon from "../../icons/sound";
import React, { ReactElement } from "react";
import { ISong } from "../../types/redux/song";
import { styles } from "../../models/theme/styles";
import { getAppTheme } from "../../controllers/themes";
import { useSelector, useDispatch } from "react-redux";
import { ISettings } from "../../controllers/redux/settings";
import TrackPlayer, { State } from "react-native-track-player";
import { AppDispatch, RootState } from "../../types/redux/store";
import { useGetTrackStatus } from "../../controllers/hooks/tracks";
import { IActiveSong, setSong } from "../../controllers/redux/song";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";

export default function SongsList(): ReactElement {
	const isPlaying = useGetTrackStatus();
	const dispatch: AppDispatch = useDispatch();
	const song: IActiveSong = useSelector((state: RootState) => state.song);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);
	const songsGroupList: ISong[] = useSelector((state: RootState) => state.songsGroupList);

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
		const trackState: State = await TrackPlayer.getState();
		(trackState !== State.Playing) && TrackPlayer.play();
	};

	return (
		<FlatList
			data={songsGroupList}
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
			}}
		/>
	);
}
