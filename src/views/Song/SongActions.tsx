import HeartIcon from "../../icons/heart";
import VolumeMaxIcon from "../../icons/volumeMax";
import VolumeOffIcon from "../../icons/volumeOff";
import TrackPlayer from "react-native-track-player";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAppTheme } from "../../controllers/themes";
import { IActiveSong } from "../../controllers/redux/song";
import { ISettings } from "../../controllers/redux/settings";
import React, { ReactElement, useState, useRef } from "react";
import { AppDispatch, RootState } from "../../types/redux/store";
import { addLikedSong, removeLikedSong } from "../../controllers/redux/likedSongs";

export default function SongActions(): ReactElement {
	const likedSongId = useRef(-1);
	const dispatch: AppDispatch = useDispatch();
	const [volumeOffStatus, setVolumeOffStatus] = useState<boolean>(false);
	const { data }: IActiveSong = useSelector((state: RootState) => state.song);
	const likedSongs: string[] = useSelector((state: RootState) => state.likedSongs);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const likeUnLikeSong = (): void => {
		if (likedSongId.current === -1) {
			dispatch(addLikedSong(data.url));
		} else {
			dispatch(removeLikedSong(likedSongId.current));
		}
	};

	const changeVolume = async (): Promise<void> => {
		try {
			if (volumeOffStatus) {
				await TrackPlayer.setVolume(100);
			} else {
				await TrackPlayer.setVolume(0);
			}
			const volume = await TrackPlayer.getVolume();
			setVolumeOffStatus(!volume);
		} catch (error) {
			console.log(error);
		}
	};

	const getHeartIconFillColor = (): string => {
		const id: number = likedSongs.findIndex((el: string) => el === data.url);
		likedSongId.current = id;
		return (id !== -1) ? (getAppTheme(appTheme)).icon : "none";
	};

	return (
		<View className="flex-row items-center justify-between w-72">
			<TouchableOpacity onPress={changeVolume}>
				{
					(volumeOffStatus) ?
						<VolumeOffIcon
							width={30}
							height={30}
							color={(getAppTheme(appTheme)).icon}
						/> :
						<VolumeMaxIcon
							width={30}
							height={30}
							color={(getAppTheme(appTheme)).icon}
						/>
				}
			</TouchableOpacity>
			<TouchableOpacity onPress={likeUnLikeSong}>
				<HeartIcon
					width={30}
					height={30}
					fill={getHeartIconFillColor()}
					color={(getAppTheme(appTheme)).icon}
				/>
			</TouchableOpacity>
		</View>
	);
}
