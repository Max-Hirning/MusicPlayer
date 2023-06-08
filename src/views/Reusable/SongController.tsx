// import PlayIcon from "../../icons/play";
import PauseIcon from "../../icons/pause";
import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import { RootState } from "../../types/redux/store";
import ChevronLeftIcon from "../../icons/chevronLeft";
import { View, TouchableOpacity } from "react-native";
import { getAppTheme } from "../../controllers/themes";
import ChevronRightIcon from "../../icons/chevronRight";
import { ISettings } from "../../controllers/redux/settings";

interface IProps {
    itemSize: number
}

export default function SongController({ itemSize }: IProps): ReactElement {
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	return (
		<View className="flex flex-row items-center justify-between" >
			<TouchableOpacity>
				<ChevronLeftIcon
					width={itemSize}
					height={itemSize}
					color={(getAppTheme(appTheme)).icon}
				/>
			</TouchableOpacity>
			<TouchableOpacity>
				<PauseIcon
					width={itemSize}
					height={itemSize}
					color={(getAppTheme(appTheme)).icon}
				/>
			</TouchableOpacity>
			<TouchableOpacity>
				<ChevronRightIcon
					width={itemSize}
					height={itemSize}
					color={(getAppTheme(appTheme)).icon}
				/>
			</TouchableOpacity>
		</View>
	);
}
