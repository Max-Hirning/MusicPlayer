import Main from "./src/views/Main/Main";
import React, { ReactElement, useEffect } from "react";
import PlayerContainer from "./src/views/PlayerContainer";
import { StatusBar, View, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./src/models/theme/theme";
import { checkGetPermmisionForStorageReading } from "./src/controllers/permissions";

export default function App(): ReactElement {
	const isDarkMode = useColorScheme() === "dark";
	const backgroundStyle = {
		backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
	};

	useEffect(() => {
		checkGetPermmisionForStorageReading();
	}, []);

	return (
		<View style={[backgroundStyle, { flex: 1 }]}>
			<StatusBar
				backgroundColor={backgroundStyle.backgroundColor}
				barStyle={isDarkMode ? "light-content" : "dark-content"}
			/>
			<Main/>
			<PlayerContainer/>
		</View>
	);
}
