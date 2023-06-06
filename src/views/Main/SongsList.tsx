// import SoundIcon from "../../icons/sound";
import React, { ReactElement } from "react";
import { styles } from "../../models/theme/styles";
import { lightTheme } from "../../models/theme/theme";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";

const songs = [
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh & Smokepurpp",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
	{
		url: require("../../../leva-eternity-149473.mp3"), // Load media from the network
		title: "Avaritia",
		artist: "deadmau5",
		album: "Arta Ft Koorosh ",
		// genre: "Progressive House, Electro House",
		date: "2014-05-20T07:00:00+00:00", // RFC 3339
		artwork: "https://cdn.pixabay.com/audio/2023/05/11/05-09-32-203_200x200.png", // Load artwork from the network
		duration: 402, // Duration in seconds
	},
];

export default function SongsList(): ReactElement {
	return (
		<FlatList
			data={songs}
			className="mt-4 mb-28"
			renderItem={({ item }: any): ReactElement => {
				return (
					<TouchableOpacity className="flex flex-row items-center mx-6 my-3 justify-between">
						<View className="flex flex-row items-center">
							<Image
								source={{uri: item.artwork}}
								className="w-14 h-14 rounded-xl"
							/>
							<View className="ml-3">
								<Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{item.title}</Text>
								<Text style={[styles.fontFamilyText, {color: lightTheme.text}]}>{item.album}</Text>
							</View>
						</View>
						{/* <SoundIcon
								width={28}
								height={28}
								color={lightTheme.icon}
							/> */}
					</TouchableOpacity>
				);
			}}
			keyExtractor={(_: string, index: number): string => index.toString()}
		/>
	);
}
