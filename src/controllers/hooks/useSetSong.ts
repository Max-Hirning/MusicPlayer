import { setSong } from "../redux/song";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSetSong() {
	const dispatch: AppDispatch = useDispatch();

	const start = async (): Promise<void> => {
		try {
			const songResult = await AsyncStorage.getItem("song");
			dispatch(setSong(songResult ? JSON.parse(songResult) : songResult));
		} catch (error) {
			console.log(error);
		}
	};

	return start;
}
