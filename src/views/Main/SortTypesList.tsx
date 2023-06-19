import React, { ReactElement } from "react";
import { styles } from "../../models/theme/styles";
import { sortsTypes } from "../../models/sortsTypes";
import { useDispatch, useSelector } from "react-redux";
import { getAppTheme } from "../../controllers/themes";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { AppDispatch, RootState } from "../../types/redux/store";
import { ISettings, changeSongsSortType } from "../../controllers/redux/settings";

export default function SortTypesList(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const { songsSortType, appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	const chooseSortType = (type: string) => (): void => {
		(type !== songsSortType) && dispatch(changeSongsSortType(type));
	};

	return (
		<FlatList
			data={sortsTypes}
			horizontal={true}
			className="mt-2 pb-2"
			renderItem={({ item }: { item: string }): ReactElement => {
				return (
					<TouchableOpacity
						className="mx-3"
						onPress={chooseSortType(item)}
					>
						<Text
							className="text-base"
							style={[(item.toLowerCase() === songsSortType.toLowerCase()) ? styles.fontFamilyBoldText : styles.fontFamilyText, {color: (getAppTheme(appTheme)).text}]}
						>{item}</Text>
					</TouchableOpacity>
				);
			}}
			keyExtractor={(_: string, index: number): string => index.toString()}
		/>
	);
}
