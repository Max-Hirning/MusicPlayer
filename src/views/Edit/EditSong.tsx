import Input from "../Reusable/Input";
import { ISong } from "../../types/redux/song";
import { song } from "../../models/redux/song";
import { setSong } from "../../controllers/redux/song";
import { useDispatch, useSelector } from "react-redux";
import { getAppTheme } from "../../controllers/themes";
import { View, TouchableOpacity, Text } from "react-native";
import { ISettings } from "../../controllers/redux/settings";
import { setSongsAsync } from "../../controllers/redux/songs";
import React, { ReactElement, useState, useEffect } from "react";
import { AppDispatch, RootState } from "../../types/redux/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenNavigationProp, EditSongScreenRouteProp } from "../../types/navigation";

export default function EditSong(): ReactElement {
	const dispatch: AppDispatch = useDispatch();
	const [data, setData] = useState<ISong>(song);
	const { params } = useRoute<EditSongScreenRouteProp>();
	const navigation = useNavigation<ScreenNavigationProp>();
	const songs: ISong[] = useSelector((state: RootState) => state.songs);
	const { appTheme }: ISettings = useSelector((state: RootState) => state.settings);

	useEffect(() => {
		setData(params);
	}, [params]);

	const saveTrack = (): void => {
		const newSong: ISong = {...data, date: (new Date()).toJSON().split("T")[0]};
		const EditSongId = songs.findIndex((el: ISong) => el.url === newSong.url);

		const state = [ ...songs ];
		state[EditSongId] = newSong;

		dispatch(setSongsAsync(state));
		dispatch(setSong(newSong));

		navigation.goBack();
	};

	return (
		<View
			className="flex-1 items-center pt-5"
			style={{ backgroundColor: (getAppTheme(appTheme)).background }}
		>
			<View className="w-80">
				<Input
					value={data.title}
					title="Track title"
					placeholder="Track title"
					changeFunc={(value: string) => setData((state: ISong) => ({...state, title: value}))}
				/>
				<Input
					value={data.album}
					title="Track album"
					placeholder="Track album"
					changeFunc={(value: string) => setData((state: ISong) => ({...state, album: value}))}
				/>
				<Input
					value={data.artist}
					title="Track artist"
					placeholder="Track artist"
					changeFunc={(value: string) => setData((state: ISong) => ({...state, artist: value}))}
				/>
				<Input
					value={data.genre}
					title="Track genre"
					placeholder="Track genre"
					changeFunc={(value: string) => setData((state: ISong) => ({...state, genre: value}))}
				/>
			</View>
			<TouchableOpacity
				onPress={saveTrack}
				className="px-16 py-2 rounded-3xl my-10"
				style={{backgroundColor: getAppTheme(appTheme).playerBackground}}
			>
				<Text
					className="text-xl"
					style={{color: getAppTheme(appTheme).text}}
				>Save</Text>
			</TouchableOpacity>
		</View>
	);
}
