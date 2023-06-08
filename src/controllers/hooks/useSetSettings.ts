import { useDispatch } from "react-redux";
import { setSettings } from "../redux/settings";
import { AppDispatch } from "../../types/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSetSettings() {
	const dispatch: AppDispatch = useDispatch();

	const start = async (): Promise<void> => {
		try {
			const settingsResult = await AsyncStorage.getItem("settings");
			dispatch(setSettings(settingsResult ? JSON.parse(settingsResult) : settingsResult));
		} catch (error) {
			console.log(error);
		}
	};

	return start;
}
