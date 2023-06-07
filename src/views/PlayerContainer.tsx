// import Play from "../icons/play";
import Pause from "../icons/pause";
import { useSelector } from "react-redux";
import React, { ReactElement } from "react";
import ChevronLeft from "../icons/chevronLeft";
import { styles } from "../models/theme/styles";
import { RootState } from "../types/redux/store";
import ChevronRight from "../icons/chevronRight";
import { lightTheme } from "../models/theme/theme";
import { IActiveSong } from "../controllers/redux/activeSong";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function PlayerContainer(): ReactElement {
	const { data, exists }: IActiveSong = useSelector((state: RootState) => state.song);

	const getText = (text: string): string => {
		if (text.length >= 18) {return `${text.slice(0, 18)}...`;}
		return text;
	};

	if (exists) {
		return (
			<TouchableOpacity
				style={{backgroundColor: lightTheme.playerBackground}}
				className="absolute bottom-0 flex flex-row items-center px-4 py-3 justify-between w-full rounded-t-xl"
			>
				<View className="flex flex-row items-center">
					<Image
						className="w-14 h-14 rounded-xl"
						source={{uri: data.artwork}}
					/>
					<View className="ml-3">
						<Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{getText(data.title)}</Text>
						{(data.album.length !== 0) && <Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{getText(data.album)}</Text>}
					</View>
				</View>
				<View className="flex flex-row items-center">
					<TouchableOpacity>
						<ChevronLeft
							width={30}
							height={30}
							color={lightTheme.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity className="mx-2">
						<Pause
							width={30}
							height={30}
							color={lightTheme.icon}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<ChevronRight
							width={30}
							height={30}
							color={lightTheme.icon}
						/>
					</TouchableOpacity>
				</View>
			</TouchableOpacity>
		);
	}

	return <></>;
}
