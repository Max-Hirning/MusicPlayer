import React from "react";
import SearchIcon from "./src/assets/search";
import {lightTheme} from "./src/models/theme/theme";
import {Colors} from "react-native/Libraries/NewAppScreen";
import { SafeAreaView, StatusBar, useColorScheme} from "react-native";

function App(): JSX.Element {
	const isDarkMode = useColorScheme() === "dark";

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? "light-content" : "dark-content"}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<SearchIcon width={20} height={20} color={lightTheme.icon} />
		</SafeAreaView>
	);
}

export default App;
