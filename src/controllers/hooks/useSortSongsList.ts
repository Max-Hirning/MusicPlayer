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
	const prevSongsSortType = useRef("");
	const songsList = useRef<ISong[]|ITest>([]);
	const songs: ISong[] = useSelector((state: RootState) => state.songs);
	const likedSongs: string[] = useSelector((state: RootState) => state.likedSongs);
	const { songsSortType, isPlayerSetted }: ISettings = useSelector((state: RootState) => state.settings);

	useMemo(async () => {
		if (isPlayerSetted && (songsSortType !== prevSongsSortType.current)) {
			switch (songsSortType.toLowerCase()) {
			case "favorites":
				const list = songs.filter((song: ISong) => likedSongs.some((el: string) => el === song.url));
				songsList.current = list;
				setTracks(list);
				break;
			case "genries":
				songsList.current = songs.reduce((res: ITest, el: ISong): ITest => {
					const key =  el.genre.toLowerCase();
					if (key !== "") {
						if (res[key]) {
							res[key].push(el);
						} else {
							res[key] = [el];
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
					const key =  el.artist.toLowerCase();
					if (key !== "") {
						if (res[key]) {
							res[key].push(el);
						} else {
							res[key] = [el];
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
					const key =  el.album.toLowerCase();
					if (key !== "") {
						if (res[key]) {
							res[key].push(el);
						} else {
							res[key] = [el];
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
				setTracks(songs);
				songsList.current = songs;
			}
			prevSongsSortType.current = songsSortType;
		}
	}, [songsSortType, likedSongs, songs, isPlayerSetted]);

	return songsList.current;
}
