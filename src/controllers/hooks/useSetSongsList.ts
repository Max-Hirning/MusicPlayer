import { storeData } from "../asyncStorage";
import { ISettings } from "../redux/settings";
import { setSongsAsync } from "../redux/songs";
import { ISong } from "../../types/redux/song";
import RNFS, { ReadDirItem } from "react-native-fs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../types/redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

export function useSetSongsList() {
	const dispatch: AppDispatch = useDispatch();
	const { isPlayerSetted }: ISettings = useSelector((state: RootState) => state.settings);

	const start = async (isSettedPlayer: boolean): Promise<void> => {
		try {
			if (isSettedPlayer || isPlayerSetted) {
				await getMusicFiles();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getMusicFiles = async (): Promise<void> => {
		try {
			const permission = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
			if (permission === RESULTS.GRANTED) {
				const path = RNFS.ExternalStorageDirectoryPath;
				const musicFiles = await RNFS.readDir(`${path}/Music`);
				const downloadFiles = await RNFS.readDir(`${path}/Download`);
				const songsList = await AsyncStorage.getItem("songs");
				const songsFiles = [...musicFiles, ...downloadFiles].filter((file: ReadDirItem) => file.isFile() && file.name.toLowerCase().endsWith(".mp3"));
				if (songsList) {
					const newSongList: ISong[] = [];
					const songs = JSON.parse(songsList);
					songsFiles.map((file: ReadDirItem) => {
						const songId = songs.findIndex((song: ISong) => song.url === file.path);
						if (songId >= 0) {
							newSongList.push(songs[songId]);
						} else {
							if (!(songsFiles.length < songs.length)) {
								newSongList.push({
									album: "",
									genre: "",
									artist: "",
									url: file.path,
									title: file.name.split(".")[0],
									date: ((new Date()).toJSON()).split("T")[0],
									artwork: "https://firebasestorage.googleapis.com/v0/b/musicplayer-60ee0.appspot.com/o/defaultAlbum.png?alt=media&token=e59f8bfe-38db-4ca0-ad80-7a1a962ec10b&_gl=1*s95tvr*_ga*MTA0NTM4MTIzOS4xNjg2MTQ0NjM3*_ga_CW55HF8NVT*MTY4NjE0NDYzNy4xLjEuMTY4NjE0NDkyOC4wLjAuMA",
								});
							}
						}
					});
					addSongsList(newSongList);
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
			dispatch(setSongsAsync(songsList));
			storeData("songs", JSON.stringify(songsList));
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
		} catch (error) {
			console.log(error);
		}
	};

	return start;
}
