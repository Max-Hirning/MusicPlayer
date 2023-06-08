import type { StackNavigationProp } from "@react-navigation/stack";

type NavigationParamList = {
    Song: undefined;
    SongsList: undefined;
};

export type ScreenNavigationProp = StackNavigationProp<NavigationParamList, "SongsList">;
