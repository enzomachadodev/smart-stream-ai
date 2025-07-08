import { Navigate, useParams } from "react-router-dom";

type RoomParams = {
	roomId: string;
};

export function Room() {
	const params = useParams<RoomParams>();

	if (!params.roomId) {
		return (
			<Navigate
				replace
				to="/"
			/>
		);
	}

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex flex-col items-center justify-center space-y-4">
				<h1 className="text-3xl font-bold">Room</h1>
				<p className="text-lg">This is a placeholder for the room page.</p>
			</div>
		</div>
	);
}
