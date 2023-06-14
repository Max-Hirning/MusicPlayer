import { ISong } from "./redux/song";
import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from "@react-navigation/stack";

type NavigationParamList = {
    Song: undefined;
    EditSong: ISong;
    SongsList: undefined;
};

export type SongScreenRouteProp = RouteProp<NavigationParamList, 'EditSong'>;
export type ScreenNavigationProp = StackNavigationProp<NavigationParamList, "SongsList">;
