import { ISong } from "../types/redux/song";
import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, RepeatMode } from "react-native-track-player";

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
	TrackPlayer.addEventListener(Event.RemotePlay, () => {
		TrackPlayer.play();
	});
	TrackPlayer.addEventListener(Event.RemoteNext, () => {
		TrackPlayer.skipToNext();
	});
	TrackPlayer.addEventListener(Event.RemotePause, () => {
		TrackPlayer.pause();
	});
	TrackPlayer.addEventListener(Event.RemotePrevious, () => {
		TrackPlayer.skipToPrevious();
	});
};

export const setTracks = async (songsList: ISong[]): Promise<void> => {
	await TrackPlayer.reset();
	await TrackPlayer.add(songsList);
	await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};
