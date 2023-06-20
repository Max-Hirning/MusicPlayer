import { ISong } from "../types/redux/song";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, RepeatMode } from "react-native-track-player";

export const setupPlayer = async (): Promise<boolean> => {
	let isSetup = false;
	try {
		await TrackPlayer.getCurrentTrack();
		isSetup = true;
	} catch {
		await TrackPlayer.setupPlayer();
		await TrackPlayer.updateOptions({
			android: {
				appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
			},
			progressUpdateEventInterval: 2,
			compactCapabilities: [ Capability.Play, Capability.Pause, Capability.SkipToNext ],
			capabilities: [ Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious, Capability.SeekTo ],
		});
		isSetup = true;
	} finally {
		return isSetup;
	}
};

export const playbackService = async (): Promise<void> => {
	// TODO: Attach remote event handlers
};

export const setTracks = async (songsList: ISong[]): Promise<void> => {
	await TrackPlayer.reset();
	await TrackPlayer.add(songsList);
	await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};
