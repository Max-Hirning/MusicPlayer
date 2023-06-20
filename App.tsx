import { Provider } from "react-redux";
import Navigation from "./src/views/Navigation";
import { store } from "./src/controllers/redux/store";
import React, { ReactElement, useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { darkTheme, lightTheme } from "./src/models/theme/theme";
import { useControllTrack } from "./src/controllers/hooks/tracks";
import { useTrackPlayerEvents, Event } from "react-native-track-player";
import { checkGetPermmisionForStorageReading } from "./src/controllers/permissions";

export default function App(): ReactElement {
	const isDarkMode = useColorScheme() === "dark";
	const { playTrack, stopTrack, nextTrack, previousTrack } = useControllTrack();
	const backgroundStyle = { backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background };

	useEffect(() => {
		checkGetPermmisionForStorageReading();
	}, []);

	useTrackPlayerEvents([Event.RemotePause, Event.RemotePlay, Event.RemoteNext, Event.RemotePrevious], (event: any) => {
		switch (event.type) {
		case Event.RemotePause:
			stopTrack();
			break;
		case Event.RemotePlay:
			playTrack();
			break;
		case Event.RemoteNext:
			nextTrack();
			break;
		case Event.RemotePrevious:
			previousTrack();
			break;
		default:
			stopTrack();
			break;
		}
	});

	return (
		<NavigationContainer>
			<Provider store={store}>
				<>
					<StatusBar
						backgroundColor={backgroundStyle.backgroundColor}
						barStyle={isDarkMode ? "light-content" : "dark-content"}
					/>
					<Navigation/>
				</>
			</Provider>
		</NavigationContainer>
	);
}
