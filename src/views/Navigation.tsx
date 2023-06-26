import Main from "./Main/Main";
import Song from "./Song/Song";
import HomeIcon from "../icons/home";
import EditIcon from "../icons/edit";
import TrashIcon from "../icons/trash";
import EditSong from "./Edit/EditSong";
import ShareIcon from "../icons/share";
import Share from "react-native-share";
import { AppState } from "react-native";
import ReturnIcon from "../icons/return";
import Settings from "./Settings/Settings";
import { ISong } from "../types/redux/song";
import SettingsIcon from "../icons/settings";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, ReactElement } from "react";
import { storeData } from "../controllers/asyncStorage";
import { setupPlayer } from "../controllers/trackPlayer";
import { useNavigation } from "@react-navigation/native";
import { setSongsAsync } from "../controllers/redux/songs";
import { ScreenNavigationProp } from "../types/navigation";
import SongsGroupList from "./SongsGroupList/SongsGroupList";
import { AppDispatch, RootState } from "../types/redux/store";
import { resetSong, setSong } from "../controllers/redux/song";
import { removeLikedSong } from "../controllers/redux/likedSongs";
import { useSetSettings } from "../controllers/hooks/useSetSettings";
import { getAppTheme, getBarStyleTheme } from "../controllers/themes";
import { useSetSongsList } from "../controllers/hooks/useSetSongsList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, StatusBar, View, AppStateStatus } from "react-native";
import { useControllTrack, useGetTrackStatus } from "../controllers/hooks/tracks";
import { ISettings, changePlayerSettedStatus } from "../controllers/redux/settings";
import TrackPlayer, { Event, useTrackPlayerEvents } from "react-native-track-player";

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
							<View
								className={`${focused ? "border-b-2" : ""}`}
								style={{borderColor: getAppTheme(appTheme).icon}}
							>
								<HomeIcon width={30} height={30} color={(focused) ? (getAppTheme(appTheme)).icon : (getAppTheme(appTheme)).inactiveIcon}/>
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
							<View
								className={`${focused ? "border-b-2" : ""}`}
								style={{borderColor: getAppTheme(appTheme).icon}}
							>
								<SettingsIcon width={30} height={30} color={(focused) ? (getAppTheme(appTheme)).icon : (getAppTheme(appTheme)).inactiveIcon}/>
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
	const setSettings = useSetSettings();
	const isPlaying = useGetTrackStatus();
	const setSongsList = useSetSongsList();
	const { stopTrack } = useControllTrack();
	const dispatch: AppDispatch = useDispatch();
	const navigation = useNavigation<ScreenNavigationProp>();
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);
	const { songs, song, settings, likedSongs }: RootState = useSelector((state: RootState) => state);

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (el: any) => {
		const res = await TrackPlayer.getTrack(el.nextTrack);
		(res) && dispatch(setSong(res as ISong));
	});

	useEffect(() => {
		const subscription = AppState.addEventListener("change", async (nextAppState: AppStateStatus) => {
			settingAppUp(nextAppState);
		});
		return () => {
			subscription.remove();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [songs, settings, likedSongs]);

	async function settingAppUp(appStatus: string): Promise<void> {
		try {
			if (appStatus === "active") {
				const isPlayerSettedUp = await setupPlayer();

				dispatch(changePlayerSettedStatus(isPlayerSettedUp));
				setSongsList(isPlayerSettedUp);
				setSettings();
			} else {
				storeData("songs", JSON.stringify(songs));
				storeData("settings", JSON.stringify(settings));
				storeData("likedSongs", JSON.stringify(likedSongs));
			}
		} catch (error) {
			console.log(error);
		}
	}

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
									(isPlaying) && await stopTrack();
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
						// headerRight: (): ReactElement => {
						// 	return (
						// 		<TouchableOpacity onPress={async () => {
						// 			dispatch(setSongsAsync(songs.filter((el: ISong) => el.url !== song.data.url)));
						// 			const id: number = likedSongs.findIndex((el: string) => el === song.data.url);
						// 			(id !== -1) && dispatch(removeLikedSong(id));
						// 			dispatch(resetSong());

						// 			// delete from file sys
						// 			navigation.navigate("App");
						// 		}}>
						// 			<TrashIcon width={35} height={35} color={(getAppTheme(appTheme)).icon}/>
						// 		</TouchableOpacity>
						// 	);
						// },
					}}
					name="EditSong"
					component={EditSong}
				/>
				<Stack.Screen
					name="App"
					options={{
						headerRight: (): ReactElement => {
							return (
								<TouchableOpacity onPress={async () => {
									try {
										const res = await Share.open({
											failOnCancel: false,
											showAppsToView: true,
											url: "https://www.youtube.com/",
										});
										console.log(res);
									} catch (error) {
										console.log(error);
									}
								}}>
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
