import { ISong } from "./redux/song";
import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";

type NavigationParamList = {
    App: undefined;
    Song: undefined;
    EditSong: ISong;
    SongsGroupList: {
        title: string;
    };
    SongsList: undefined;
};

export type EditSongScreenRouteProp = RouteProp<NavigationParamList, "EditSong">;
export type ScreenNavigationProp = StackNavigationProp<NavigationParamList, "SongsList">;
export type SongsGroupListScreenRouteProp = RouteProp<NavigationParamList, "SongsGroupList">;
