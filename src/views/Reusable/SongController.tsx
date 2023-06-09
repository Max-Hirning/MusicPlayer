import PlayIcon from "../../icons/play";
import PauseIcon from "../../icons/pause";
import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { RootState } from "../../types/redux/store";
import ChevronLeftIcon from "../../icons/chevronLeft";
import { View, TouchableOpacity } from "react-native";
import { getAppTheme } from "../../controllers/themes";
import ChevronRightIcon from "../../icons/chevronRight";
import { ISettings } from "../../controllers/redux/settings";
import { useControllTrack, useGetTrackStatus } from "../../controllers/hooks/tracks";

interface IProps {
    itemSize: number
}

export default function SongController({ itemSize }: IProps): ReactElement {
	const isPlayed = useGetTrackStatus();
	const [ playTrack, stopTrack, nextTrack, previousTrack ] = useControllTrack();
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const playPauseTrack = async () => {
		if (isPlayed) {
			stopTrack();
		} else {
			playTrack();
		}
	};

	return (
		<View className="flex flex-row items-center justify-between" >
			<TouchableOpacity onPress={previousTrack}>
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
			<TouchableOpacity onPress={nextTrack}>
				<ChevronRightIcon
					width={itemSize}
					height={itemSize}
					color={(getAppTheme(appTheme)).icon}
				/>
			</TouchableOpacity>
		</View>
	);
}
