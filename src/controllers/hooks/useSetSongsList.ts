import { useDispatch } from "react-redux";
import { setSongs } from "../redux/songs";
import { storeData } from "../asyncStorage";
import { ISong } from "../../types/redux/song";
import TrackPlayer from "react-native-track-player";
import RNFS, { ReadDirItem } from "react-native-fs";
import { AppDispatch } from "../../types/redux/store";
import { setupPlayer, addTracks } from "../trackPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

export function useSetSongsList() {
	const dispatch: AppDispatch = useDispatch();

	const start = async (): Promise<void> => {
		try {
			await getMusicFiles();
		} catch (error) {
			console.log(error);
		}
	};

	const getMusicFiles = async (): Promise<void> => {
		try {
			const permission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
			if (permission === RESULTS.GRANTED) {
				const path = RNFS.ExternalStorageDirectoryPath;
				const files = await RNFS.readDir(`${path}/Music`);
				const songsList = await AsyncStorage.getItem("songs");
				const songsFiles = files.filter(file => file.isFile() && file.name.toLowerCase().endsWith(".mp3"));

				if (songsList) {
					if (JSON.parse(songsList).length !== songsFiles.length) {
						createSongsList(songsFiles);
					} else {
						addSongsList(JSON.parse(songsList));
						// dispatch(setSongs(JSON.parse(songsList)));
					}
				} else {
					createSongsList(songsFiles);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const addSongsList = async (songsList: ISong[]): Promise<void> => {
		try {
			let isSetup = await setupPlayer();
			const queue = await TrackPlayer.getQueue();

			if (isSetup && queue.length <= 0) {
				await addTracks(songsList);
				dispatch(setSongs(songsList));
			}

			console.log(isSetup);
		} catch (error) {
			console.log(error);
		}
	};

	const createSongsList = async (array: ReadDirItem[]): Promise<void> => {
		try {
			const newListOfSongs: ISong[] = array.map((file: ReadDirItem): ISong => {
				return ({
					album: "",
					genre: "",
					artist: "",
					url: file.path,
					title: file.name.split(".")[0],
					date: ((new Date()).toJSON()).split("T")[0],
					artwork: "https://firebasestorage.googleapis.com/v0/b/musicplayer-60ee0.appspot.com/o/defaultAlbum.png?alt=media&token=e59f8bfe-38db-4ca0-ad80-7a1a962ec10b&_gl=1*s95tvr*_ga*MTA0NTM4MTIzOS4xNjg2MTQ0NjM3*_ga_CW55HF8NVT*MTY4NjE0NDYzNy4xLjEuMTY4NjE0NDkyOC4wLjAuMA",
				});
			});
			addSongsList(newListOfSongs);
			// dispatch(setSongs(newListOfSongs));
			storeData("songs", JSON.stringify(newListOfSongs));
		} catch (error) {
			console.log(error);
		}
	};

	return start;
}
