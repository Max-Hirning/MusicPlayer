import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { setTracks } from "../trackPlayer";
import { ISong } from "../../types/redux/song";
import { RootState } from "../../types/redux/store";
import { ISettings } from "../../controllers/redux/settings";

interface ISongsObj {
	[key: string]: ISong[];
}

export function useSortSongsList(): ISong[]|ISongsObj {
	const songsList = useRef<ISong[]|ISongsObj>([]);
	const songs: ISong[] = useSelector((state: RootState) => state.songs);
	const likedSongs: string[] = useSelector((state: RootState) => state.likedSongs);
	const { songsSortType, isPlayerSetted }: ISettings = useSelector((state: RootState) => state.settings);

	useMemo(async () => {
		if (isPlayerSetted && songsSortType.toLowerCase() === "favorites") {
			songsList.current = getFavoritesTracksList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [songsSortType, likedSongs, isPlayerSetted]);

	useMemo(async () => {
		if (isPlayerSetted) {
			switch (songsSortType.toLowerCase()) {
			case "favorites":
				songsList.current = getFavoritesTracksList();
				break;
			case "genries":
				songsList.current = getList("genre", "No genre");
				break;
			case "artists":
				songsList.current = getList("artist", "No artist");
				break;
			case "albums":
				songsList.current = getList("album", "No album");
				break;
			default:
				songsList.current = getTracksList();
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [songsSortType, songs, isPlayerSetted]);

	function getTracksList(): ISong[] {
		setTracks(songs);
		return songs;
	}

	function getFavoritesTracksList(): ISong[] {
		const list = songs.filter((song: ISong) => likedSongs.some((el: string) => el === song.url));
		setTracks(list);
		return list;
	}

	function getList(defaultKey: string, keyForEmpty: string): ISongsObj {
		return songs.reduce((res: ISongsObj, el: ISong): ISongsObj => {
			const key =  el[defaultKey]?.toLowerCase();
			if (key !== "") {
				if (res[key]) {
					res[key].push(el);
				} else {
					res[key] = [el];
				}
			} else {
				if (res[keyForEmpty]) {
					res[keyForEmpty].push(el);
				} else {
					res[keyForEmpty] = [el];
				}
			}
			return res;
		}, {});
	}

	return songsList.current;
}
