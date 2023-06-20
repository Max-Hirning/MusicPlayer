import PlayIcon from "../../icons/play";
import PauseIcon from "../../icons/pause";
import React, { ReactElement } from "react";
import { ISong } from "../../types/redux/song";
import TrackPlayer from "react-native-track-player";
import ChevronLeftIcon from "../../icons/chevronLeft";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSong } from "../../controllers/redux/song";
import { getAppTheme } from "../../controllers/themes";
import ChevronRightIcon from "../../icons/chevronRight";
import { ISettings } from "../../controllers/redux/settings";
import { AppDispatch, RootState } from "../../types/redux/store";
import { useControllTrack, useGetTrackStatus } from "../../controllers/hooks/tracks";

interface IProps {
    itemSize: number
}

export default function SongController({ itemSize }: IProps): ReactElement {
	const isPlayed = useGetTrackStatus();
	const dispatch: AppDispatch = useDispatch();
	const { playTrack, stopTrack, nextTrack, previousTrack } = useControllTrack();
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const playPauseTrack = async () => {
		if (isPlayed) {
			stopTrack();
		} else {
			playTrack();
		}
	};

	const moveToNextTrack = async (): Promise<void> => {
		try {
			await nextTrack();
			saveNewActiveTrack();
		} catch (error) {
			console.log(error);
		}
	};

	const saveNewActiveTrack = async (): Promise<void> => {
		try {
			const currentTrackId = await TrackPlayer.getCurrentTrack();
			if (currentTrackId !== null) {
				const currentTrack = await TrackPlayer.getTrack(currentTrackId);
				if (currentTrack !== null) {
					dispatch(setSong(currentTrack as ISong));
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const moveToPreviosTrack = async (): Promise<void> => {
		try {
			await previousTrack();
			saveNewActiveTrack();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View className="flex flex-row items-center justify-between" >
			<TouchableOpacity onPress={moveToPreviosTrack}>
				<ChevronLeftIcon
					width={itemSize}
					height={itemSize}
					color={(getAppTheme(appTheme)).icon}
				/>
			</TouchableOpacity>
			<TouchableOpacity onPress={playPauseTrack}>
				{
					(isPlayed) ?
						<PauseIcon
							width={itemSize}
							height={itemSize}
							color={(getAppTheme(appTheme)).icon}
						/> :
						<PlayIcon
							width={itemSize}
							height={itemSize}
							color={(getAppTheme(appTheme)).icon}
						/>
				}
			</TouchableOpacity>
			<TouchableOpacity onPress={moveToNextTrack}>
				<ChevronRightIcon
					width={itemSize}
					height={itemSize}
					color={(getAppTheme(appTheme)).icon}
				/>
			</TouchableOpacity>
		</View>
	);
}
