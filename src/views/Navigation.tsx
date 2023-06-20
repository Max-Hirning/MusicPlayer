import Main from "./Main/Main";
import Song from "./Song/Song";
import HomeIcon from "../icons/home";
import EditIcon from "../icons/edit";
import EditSong from "./Edit/EditSong";
import ShareIcon from "../icons/share";
import { AppState } from "react-native";
import ReturnIcon from "../icons/return";
import { useSelector } from "react-redux";
import Settings from "./Settings/Settings";
import SettingsIcon from "../icons/settings";
import { RootState } from "../types/redux/store";
import React, { useEffect, ReactElement } from "react";
import { storeData } from "../controllers/asyncStorage";
import { useNavigation } from "@react-navigation/native";
import { ISettings } from "../controllers/redux/settings";
import { ScreenNavigationProp } from "../types/navigation";
import SongsGroupList from "./SongsGroupList/SongsGroupList";
import { useSetSong } from "../controllers/hooks/useSetSong";
import { TouchableOpacity, StatusBar, View } from "react-native";
import { useSetSettings } from "../controllers/hooks/useSetSettings";
import { getAppTheme, getBarStyleTheme } from "../controllers/themes";
import { useSetSongsList } from "../controllers/hooks/useSetSongsList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useControllTrack, useGetTrackStatus } from "../controllers/hooks/tracks";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(): ReactElement {
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: {
					backgroundColor: (getAppTheme(appTheme)).playerBackground,
				},
				headerShown: false,
				tabBarShowLabel: false,
			}}
		>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }): ReactElement => {
						return (
							<View className={`${focused ? "border-b-2" : ""}`}>
								<HomeIcon width={30} height={30} color={(focused) ? (getAppTheme(appTheme)).icon : (getAppTheme(appTheme)).background}/>
							</View>
						);
					},
				}}
				name="SongsList"
				component={Main}
			/>
			<Tab.Screen
				options={{
					tabBarIcon: ({ focused }): ReactElement => {
						return (
							<View className={`${focused ? "border-b-2" : ""}`}>
								<SettingsIcon width={30} height={30} color={(focused) ? (getAppTheme(appTheme)).icon : (getAppTheme(appTheme)).background}/>
							</View>
						);
					},
				}}
				name="Settings"
				component={Settings}
			/>
		</Tab.Navigator>
	);
}

export default function Navigation(): ReactElement {
	const setSong = useSetSong();
	const setSettings = useSetSettings();
	const setSongsList = useSetSongsList();
	const { stopTrack } = useControllTrack();
	const trackPlayingStatus = useGetTrackStatus();
	const navigation = useNavigation<ScreenNavigationProp>();
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);
	const { songs, song, settings, likedSongs }: RootState = useSelector((state: RootState) => state);

	useEffect(() => {
		const subscription = AppState.addEventListener("change", nextAppState => {
			if (nextAppState === "active") {
				setSong();
				setSettings();
				setSongsList();
			} else {
				if (song.exists) {
					storeData("song", JSON.stringify(song.data));
				}
				storeData("songs", JSON.stringify(songs));
				storeData("settings", JSON.stringify(settings));
				storeData("likedSongs", JSON.stringify(likedSongs));
			}
		});

		return () => {
			subscription.remove();
		};
	}, [songs, song, settings, likedSongs, setSongsList, setSong, setSettings]);

	return (
		<>
			<StatusBar
				barStyle={getBarStyleTheme(settings.appTheme)}
				backgroundColor={(getAppTheme(settings.appTheme)).background}
			/>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: (getAppTheme(appTheme)).background,
					},
					headerTitleStyle: {
						fontSize: 20,
						color: (getAppTheme(appTheme)).text,
						fontFamily: "Poppins-Bold",
					},
					title: "Music Player",
					headerShadowVisible: false,
				}}
				initialRouteName="App"
			>
				<Stack.Screen
					options={{
						headerTitleAlign: "center",
						headerLeft: (): ReactElement => {
							return (
								<TouchableOpacity onPress={() => navigation.goBack()}>
									<ReturnIcon width={50} height={50} color={(getAppTheme(appTheme)).icon}/>
								</TouchableOpacity>
							);
						},
						headerRight: (): ReactElement => {
							return (
								<TouchableOpacity onPress={async () => {
									(trackPlayingStatus) && await stopTrack();
									navigation.navigate("EditSong", song.data);
								}}>
									<EditIcon width={30} height={30} color={(getAppTheme(appTheme)).icon}/>
								</TouchableOpacity>
							);
						},
					}}
					name="Song"
					component={Song}
				/>
				<Stack.Screen
					options={{
						title: "",
						headerTitleAlign: "center",
						headerLeft: (): ReactElement => {
							return (
								<TouchableOpacity onPress={() => navigation.goBack()}>
									<ReturnIcon width={50} height={50} color={(getAppTheme(appTheme)).icon}/>
								</TouchableOpacity>
							);
						},
					}}
					name="SongsGroupList"
					component={SongsGroupList}
				/>
				<Stack.Screen
					options={{
						title: "Edit Track",
						headerTitleAlign: "center",
						headerLeft: (): ReactElement => {
							return (
								<TouchableOpacity onPress={() => navigation.goBack()}>
									<ReturnIcon width={50} height={50} color={(getAppTheme(appTheme)).icon}/>
								</TouchableOpacity>
							);
						},
					}}
					name="EditSong"
					component={EditSong}
				/>
				<Stack.Screen
					name="App"
					options={{
						headerRight: (): ReactElement => {
							return (
								<TouchableOpacity onPress={() => console.log("sdv")}>
									<ShareIcon width={25} height={25} color={(getAppTheme(appTheme)).icon}/>
								</TouchableOpacity>
							);
						},
					}}
					component={App}
				/>
			</Stack.Navigator>
		</>
	);
}
