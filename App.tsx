import Main from "./src/views/Main/Main";
import React, { ReactElement } from "react";
import PlayerContainer from "./src/views/PlayerContainer";
import { darkTheme, lightTheme } from "./src/models/theme/theme";
import { SafeAreaView, StatusBar, View, useColorScheme } from "react-native";

export default function App(): ReactElement {
	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? darkTheme.background : lightTheme.background,
	};

	return (
		<View
			className="flex-1"
			style={[backgroundStyle]}
		>
			<StatusBar
				backgroundColor={backgroundStyle.backgroundColor}
				barStyle={isDarkMode ? "light-content" : "dark-content"}
			/>
			<Main/>
			<PlayerContainer/>
		</View>
	);
}
