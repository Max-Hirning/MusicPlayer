// import PlayIcon from "../../icons/play";
import PauseIcon from "../../icons/pause";
import React, { ReactElement } from "react";
import ChevronLeftIcon from "../../icons/chevronLeft";
import { lightTheme } from "../../models/theme/theme";
import { View, TouchableOpacity } from "react-native";
import ChevronRightIcon from "../../icons/chevronRight";

interface IProps {
    itemSize: number
}

export default function SongController({ itemSize }: IProps): ReactElement {
	return (
		<View className="flex flex-row items-center justify-between" >
			<TouchableOpacity>
				<ChevronLeftIcon
					width={itemSize}
					height={itemSize}
					color={lightTheme.icon}
				/>
			</TouchableOpacity>
			<TouchableOpacity>
				<PauseIcon
					width={itemSize}
					height={itemSize}
					color={lightTheme.icon}
				/>
			</TouchableOpacity>
			<TouchableOpacity>
				<ChevronRightIcon
					width={itemSize}
					height={itemSize}
					color={lightTheme.icon}
				/>
			</TouchableOpacity>
		</View>
	);
}
