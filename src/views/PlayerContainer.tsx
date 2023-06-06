import Play from "../icons/play";
import Pause from "../icons/pause";
import React, { ReactElement } from "react";
import ChevronLeft from "../icons/chevronLeft";
import ChevronRight from "../icons/chevronRight";
import { styles } from "../models/theme/styles";
import { lightTheme } from "../models/theme/theme";
import { View, Text, Image, TouchableOpacity } from "react-native";

const song = {
	url: require("../../leva-eternity-149473.mp3"), // Load media from the network
	title: "Avaritia",
	artist: "deadmau5",
	album: "Arta Ft Koorosh & Smokepurpp",
	// genre: "Progressive House, Electro House",
	date: "2014-05-20T07:00:00+00:00", // RFC 3339
	artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
	duration: 402, // Duration in seconds
};

export default function PlayerContainer(): ReactElement {
	const getAlbum = (): string => {
		if (song.album.length >= 23) {return `${song.album.slice(0, 23)}...`;}
		return song.album;
	};

	return (
		<TouchableOpacity
			style={{backgroundColor: lightTheme.playerBackground}}
			className="absolute bottom-0 flex flex-row items-center px-4 py-3 justify-between w-full rounded-t-xl"
		>
			<View className="flex flex-row items-center">
				<Image
					source={{uri: song.artwork}}
					className="w-14 h-14 rounded-xl"
				/>
				<View className="ml-3">
					<Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{song.title}</Text>
					<Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{getAlbum()}</Text>
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
