import { Provider } from "react-redux";
import Navigation from "./src/views/Navigation";
import { store } from "./src/controllers/redux/store";
import React, { ReactElement, useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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
