import { useSelector } from "react-redux";
import HeartIcon from "../../icons/heart";
import VolumeMaxIcon from "../../icons/volumeMax";
import VolumeOffIcon from "../../icons/volumeOff";
import TrackPlayer from "react-native-track-player";
import { RootState } from "../../types/redux/store";
import React, { ReactElement, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { getAppTheme } from "../../controllers/themes";
import { ISettings } from "../../controllers/redux/settings";

export default function SongActions(): ReactElement {
	const [volumeOffStatus, setVolumeOffStatus] = useState<boolean>(false);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const changeColume = async (): Promise<void> => {
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
	return (
		<View className="flex-row items-center justify-between w-72">
			<TouchableOpacity onPress={changeColume}>
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
			<TouchableOpacity>
				<HeartIcon
					width={30}
					height={30}
					color={(getAppTheme(appTheme)).icon}
				/>
			</TouchableOpacity>
		</View>
	);
}
