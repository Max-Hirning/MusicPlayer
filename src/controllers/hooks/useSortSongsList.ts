import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { setTracks } from "../trackPlayer";
import { ISong } from "../../types/redux/song";
import { RootState } from "../../types/redux/store";
import { ISettings } from "../../controllers/redux/settings";

interface ISongsObj {
	[key: string]: ISong[];
}

interface IReturnedData {
	emptyMessage: string;
	data: ISong[]|ISongsObj;
}

export function useSortSongsList(): IReturnedData {
	const emptyMessage = useRef<string>("");
	const songsList = useRef<ISong[]|ISongsObj>([]);
	const songs: ISong[] = useSelector((state: RootState) => state.songs);
	const likedSongs: string[] = useSelector((state: RootState) => state.likedSongs);
	const { songsSortType, isPlayerSetted }: ISettings = useSelector((state: RootState) => state.settings);

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

	useMemo(async () => {
		if (isPlayerSetted && songsSortType.toLowerCase() === "favorites") {
			songsList.current = getFavoritesTracksList();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [songsSortType, likedSongs, isPlayerSetted]);

	function getTracksList(): ISong[] {
		emptyMessage.current = "You have no tracks";
		setTracks(songs);
		return songs;
	}

	function getFavoritesTracksList(): ISong[] {
		const list = songs.filter((song: ISong) => likedSongs.some((el: string) => el === song.url));
		emptyMessage.current = "You have no favorite tracks";
		setTracks(list);
		return list;
	}

	function getList(defaultKey: string, keyForEmpty: string): ISongsObj {
		emptyMessage.current = "You have no tracks";
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

	return {
		data: songsList.current,
		emptyMessage: emptyMessage.current,
	};
}
