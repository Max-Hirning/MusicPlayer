import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { setTracks } from "../trackPlayer";
import { ISong } from "../../types/redux/song";
import { RootState } from "../../types/redux/store";
import { ISettings } from "../../controllers/redux/settings";

interface ITest {
	[key: string]: ISong[];
}

export function useSortSongsList(): ISong[]|ITest {
	const songsList = useRef<ISong[]|ITest>([]);
	const songs: ISong[] = useSelector((state: RootState) => state.songs);
	const likedSongs: string[] = useSelector((state: RootState) => state.likedSongs);
	const { songsSortType, isPlayerSetted }: ISettings = useSelector((state: RootState) => state.settings);

	useMemo(() => {
		if (isPlayerSetted) {
			let list: ISong[] = [];
			switch (songsSortType.toLowerCase()) {
			case "favorites":
				list = songs.filter((song: ISong) => likedSongs.some((el: string) => el === song.url));
				songsList.current = list;
				setTracks(list);
				break;
			case "genries":
				songsList.current = songs.reduce((res: ITest, el: ISong): ITest => {
					if (el.genre !== "") {
						if (res[el.genre]) {
							res[el.genre].push(el);
						} else {
							res[el.genre] = [el];
						}
					} else {
						if (res["No genre"]) {
							res["No genre"].push(el);
						} else {
							res["No genre"] = [el];
						}
					}
					return res;
				}, {});
				break;
			case "artists":
				songsList.current = songs.reduce((res: ITest, el: ISong): ITest => {
					if (el.artist !== "") {
						if (res[el.artist]) {
							res[el.artist].push(el);
						} else {
							res[el.artist] = [el];
						}
					} else {
						if (res["No artist"]) {
							res["No artist"].push(el);
						} else {
							res["No artist"] = [el];
						}
					}
					return res;
				}, {});
				break;
			case "albums":
				songsList.current = songs.reduce((res: ITest, el: ISong): ITest => {
					if (el.album !== "") {
						if (res[el.album]) {
							res[el.album].push(el);
						} else {
							res[el.album] = [el];
						}
					} else {
						if (res["No album"]) {
							res["No album"].push(el);
						} else {
							res["No album"] = [el];
						}
					}
					return res;
				}, {});
				break;
			default:
				list = songs;
				setTracks(list);
				songsList.current = songs;
			}
		}
	}, [songsSortType, likedSongs, songs, isPlayerSetted]);

	return songsList.current;
}
