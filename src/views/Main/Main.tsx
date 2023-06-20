import SongsList from "./SongsList";
import { View } from "react-native";
import { useSelector } from "react-redux";
import SortTypesList from "./SortTypesList";
import React, { ReactElement } from "react";
import PlayerContainer from "../Reusable/PlayerContainer";
import { RootState } from "../../types/redux/store";
import { getAppTheme } from "../../controllers/themes";
import { ISettings } from "../../controllers/redux/settings";

export default function Main(): ReactElement {
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	return (
		<View className="flex-1" style={{ backgroundColor: (getAppTheme(appTheme)).background }}>
			<View>
				<SortTypesList/>
				<SongsList/>
			</View>
			<PlayerContainer/>
		</View>
	);
}
