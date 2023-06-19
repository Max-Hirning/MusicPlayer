import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { ISong } from "../../types/redux/song";
import { RootState } from "../../types/redux/store";
import { ISettings } from "../../controllers/redux/settings";

export function useSortSongsList(): ISong[] {
	const songsList = useRef<ISong[]>([]);
	const songs: ISong[] = useSelector((state: RootState) => state.songs);
	const likedSongs: string[] = useSelector((state: RootState) => state.likedSongs);
	const { songsSortType }: ISettings = useSelector((state: RootState) => state.settings);

	useMemo(() => {
		switch (songsSortType.toLowerCase()) {
		case "favorites":
			songsList.current = (songs.filter((song: ISong) => likedSongs.some((el: string) => el === song.url)));
			break;
		case "playlists":
			songsList.current = (songs);
			break;
		case "artists":
			songsList.current = (songs);
			break;
		case "albums":
			songsList.current = (songs);
			break;
		default:
			songsList.current = (songs);
		}
	}, [songsSortType, likedSongs, songs]);

	return songsList.current;
}
