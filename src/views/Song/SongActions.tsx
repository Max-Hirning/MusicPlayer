import { useSelector } from "react-redux";
import HeartIcon from "../../icons/heart";
import React, { ReactElement } from "react";
import VolumeMaxIcon from "../../icons/volumeMax";
// import VolumeOffIcon from "../../icons/volumeOff";
import { RootState } from "../../types/redux/store";
import { View, TouchableOpacity } from "react-native";
import { getAppTheme } from "../../controllers/themes";
import { ISettings } from "../../controllers/redux/settings";
// import { IActiveSong } from "../../controllers/redux/song";

export default function SongActions(): ReactElement {
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	return (
		<View className="flex-row items-center justify-between w-72">
			<TouchableOpacity>
				<VolumeMaxIcon
					width={30}
					height={30}
					color={(getAppTheme(appTheme)).icon}
				/>
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
