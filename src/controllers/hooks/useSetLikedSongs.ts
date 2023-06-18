import { useDispatch } from "react-redux";
import { setSettings } from "../redux/settings";
import { AppDispatch } from "../../types/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSetLikedSongs() {
	const dispatch: AppDispatch = useDispatch();

	const start = async (): Promise<void> => {
		try {
			const likedSongsResult = await AsyncStorage.getItem("likedSongs");
			dispatch(setSettings(likedSongsResult ? JSON.parse(likedSongsResult) : likedSongsResult));
		} catch (error) {
			console.log(error);
		}
	};

	return start;
}
