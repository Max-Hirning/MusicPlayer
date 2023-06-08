import Main from "./Main/Main";
import Song from "./Song/Song";
import EditIcon from "../icons/edit";
import { AppState } from "react-native";
import ReturnIcon from "../icons/return";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import { RootState } from "../types/redux/store";
import { lightTheme } from "../models/theme/theme";
import React, { useEffect, ReactElement } from "react";
import { storeData } from "../controllers/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../types/navigation";
import { useSetSong } from "../controllers/hooks/useSetSong";
import { useSetSongsList } from "../controllers/hooks/useSetSongsList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Navigation() {
	const setSong = useSetSong();
	const setSongsList = useSetSongsList();
	const navigation = useNavigation<ScreenNavigationProp>();
	const { songs, song }: RootState = useSelector((state: RootState) => state);

	useEffect(() => {
		const subscription = AppState.addEventListener("change", nextAppState => {
			if (nextAppState === "active") {
				setSong();
				setSongsList();
			} else {
				if (song.exists) {
					storeData("song", JSON.stringify(song.data));
				}
				storeData("songs", JSON.stringify(songs));
			}
		});

		return () => {
			subscription.remove();
		};
	}, [songs, song, setSongsList, setSong]);

	return (
		<Stack.Navigator initialRouteName="SongsList">
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: lightTheme.background,
					},
					headerTitleStyle: {
						fontSize: 20,
						color: lightTheme.text,
						fontFamily: "Poppins-Bold",
					},
					title: "Music Player",
					headerShadowVisible: false,
					headerTitleAlign: "center",
					headerLeft: (): ReactElement => {
						return (
							<TouchableOpacity onPress={() => navigation.goBack()}>
								<ReturnIcon width={50} height={50} color={lightTheme.icon}/>
							</TouchableOpacity>
						);
					},
					headerRight: (): ReactElement => {
						return (
							<TouchableOpacity onPress={() => console.log("sdv")}>
								<EditIcon width={30} height={30} color={lightTheme.icon}/>
							</TouchableOpacity>
						);
					},
				}}
				name="Song"
				component={Song}
			/>
			<Stack.Screen
				options={{
					headerStyle: {
						backgroundColor: lightTheme.background,
					},
					headerTitleStyle: {
						fontSize: 20,
						color: lightTheme.text,
						fontFamily: "Poppins-Bold",
					},
					title: "Music Player",
					headerShadowVisible: false,
				}}
				name="SongsList"
				component={Main}
			/>
		</Stack.Navigator>
	);
}
