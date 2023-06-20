import songReducer from "./song";
import songsReducer from "./songs";
import settingsReducer from "./settings";
import likedSongsReducer from "./likedSongs";
import { configureStore } from "@reduxjs/toolkit";
import SongsGroupListReducer from "./songsGroupList";

export const store = configureStore({
	reducer: {
		song: songReducer,
		songs: songsReducer,
		settings: settingsReducer,
		likedSongs: likedSongsReducer,
		songsGroupList: SongsGroupListReducer,
	},
});
