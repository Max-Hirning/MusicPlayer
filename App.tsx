import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaView, StatusBar, useColorScheme, Text } from "react-native";

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
			<Text style={{fontFamily: "Poppins-ExtraBold"}}>sdvsdvsd</Text>
		</SafeAreaView>
	);
}

export default App;
