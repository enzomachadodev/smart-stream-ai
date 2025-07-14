import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const isRecordingSuported =
	!!navigator.mediaDevices &&
	typeof navigator.mediaDevices?.getUserMedia === "function" &&
	typeof window.MediaRecorder === "function";

type RoomParams = {
	roomId: string;
};

export function RecordRoomAudio() {
	const { roomId } = useParams<RoomParams>();

	const [isRecording, setIsRecording] = useState(false);
	const recorder = useRef<MediaRecorder | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	async function stopRecording() {
		setIsRecording(false);

		if (recorder.current && recorder.current.state !== "inactive") {
			recorder.current.stop();
		}

		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
	}

	const uploadAudio = async (audioBlob: Blob) => {
		const formData = new FormData();
		formData.append("audio", audioBlob, "recording.webm");

		const response = await fetch(
			`http://localhost:4000/rooms/${roomId}/audio`,
			{
				method: "POST",
				body: formData,
			}
		);

		const result = await response.json();

		if (!response.ok) {
			throw new Error("Failed to upload audio");
		}

		console.log("Audio uploaded successfully:", result);
	};

	function createRecorder(audio: MediaStream) {
		recorder.current = new MediaRecorder(audio, {
			mimeType: "audio/webm",
			audioBitsPerSecond: 64000,
		});

		recorder.current.ondataavailable = async (event) => {
			if (event.data.size > 0) {
				await uploadAudio(event.data);
			}
		};

		recorder.current.onstart = () => {
			console.log("Recording started");
		};

		recorder.current.onstop = () => {
			console.log("Recording stopped");
		};

		recorder.current.start();
	}

	async function startRecording() {
		if (!isRecordingSuported) {
			alert("Gravação de áudio não é suportada neste navegador.");
			return;
		}

		setIsRecording(true);

		const audio = await navigator.mediaDevices.getUserMedia({
			audio: {
				echoCancellation: true,
				noiseSuppression: true,
				sampleRate: 44100,
			},
		});

		createRecorder(audio);

		intervalRef.current = setInterval(() => {
			recorder.current?.stop();

			createRecorder(audio);
		}, 5000);
	}

	if (!roomId) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	return (
		<div className="h-screen flex items-center justify-center flex-col gap-3 text-center">
			{isRecording ? (
				<Button onClick={stopRecording}>Parar gravação</Button>
			) : (
				<Button onClick={startRecording}>Gravar áudio</Button>
			)}

			{isRecording ? (
				<span>Gravando áudio...</span>
			) : (
				<span>Pressione o botão para gravar</span>
			)}
		</div>
	);
}
