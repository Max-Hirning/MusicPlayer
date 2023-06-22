import SongActions from "./SongActions";
import React, { ReactElement } from "react";
import { ISong } from "../../types/redux/song";
import { View, Text, Image } from "react-native";
import { styles } from "../../models/theme/styles";
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from "react-redux";
import { getAppTheme } from "../../controllers/themes";
import SongController from "../Reusable/SongController";
import { ISettings } from "../../controllers/redux/settings";
import { AppDispatch, RootState } from "../../types/redux/store";
import { IActiveSong, setSong } from "../../controllers/redux/song";
import TrackPlayer, { Event, useProgress, useTrackPlayerEvents } from "react-native-track-player";

export default function Song(): ReactElement {
	const progress = useProgress();
	const dispatch: AppDispatch = useDispatch();
	const { data }: IActiveSong = useSelector((state: RootState) => state.song);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	// useTrackPlayerEvents([Event.PlaybackTrackChanged], async (el: any) => {
	// 	const res = await TrackPlayer.getTrack(el.nextTrack);
	// 	console.log(res);
	// 	(res) && dispatch(setSong(res as ISong));
	// });

	const getText = (text: string): string => {
		if (text.length === 0) {
			return "Unknown";
		}
		return text;
	};

	const secondsToMinutes = (seconds: number): string => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds.toFixed(0)}`;
	};

	const changeProgressSong = async (value: number): Promise<void> => {
		try {
			await TrackPlayer.seekTo(value);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View className="flex-1 items-center justify-between pt-5 pb-10 px-5" style={{ backgroundColor: (getAppTheme(appTheme)).background }} >
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
			<View className="top-5 relative w-80 flex-row items-center justify-between">
				<Text style={{color: getAppTheme(appTheme).text}}>{secondsToMinutes(progress.position)}</Text>
				<Text style={{color: getAppTheme(appTheme).text}}>{secondsToMinutes(progress.duration)}</Text>
			</View>
			<Slider
				minimumValue={0}
				value={progress.position}
				maximumValue={progress.duration}
				style={{width: 320, height: 40}}
				onValueChange={changeProgressSong}
				thumbTintColor={getAppTheme(appTheme).icon}
				maximumTrackTintColor={getAppTheme(appTheme).icon}
				minimumTrackTintColor={getAppTheme(appTheme).progressBar}
			/>
			<View className="w-80">
				<SongController itemSize={60}/>
			</View>
		</View>
	);
}
