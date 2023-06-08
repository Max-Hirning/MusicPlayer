import { StatusBarStyle } from "react-native";
import { darkTheme, lightTheme } from "../models/theme/theme";

export const getAppTheme = (theme: string) => {
	switch (theme) {
	case "light":
		return lightTheme;
	case "dark":
		return darkTheme;
	default:
		return lightTheme;
	}
};

export const getBarStyleTheme = (theme: string): StatusBarStyle => {
	switch (theme) {
	case "light":
		return "dark-content";
	case "dark":
		return "light-content";
	default:
		return "dark-content";
	}
};
