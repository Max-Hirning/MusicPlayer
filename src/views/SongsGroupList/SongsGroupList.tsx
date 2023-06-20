import { View } from "react-native";
import SongsList from "./SongsList";
import { useSelector } from "react-redux";
import PlayerContainer from "../Reusable/PlayerContainer";
import { RootState } from "../../types/redux/store";
import React, { ReactElement, useEffect } from "react";
import { getAppTheme } from "../../controllers/themes";
import { ISettings } from "../../controllers/redux/settings";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNavigationProp, SongsGroupListScreenRouteProp } from "../../types/navigation";

export default function SongsGroupList(): ReactElement {
	const navigation = useNavigation<ScreenNavigationProp>();
	const { params } = useRoute<SongsGroupListScreenRouteProp>();
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	useEffect(() => {
		navigation.setOptions({ title: params.title });
	}, [navigation, params]);

	return (
		<View
			className="flex-1"
			style={{ backgroundColor: (getAppTheme(appTheme)).background }}
		>
			<SongsList/>
			<PlayerContainer/>
		</View>
	);
}
