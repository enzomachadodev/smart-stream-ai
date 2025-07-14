import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";

export function CreateRoom() {
	return (
		<div className="h-screen lg:h-auto min-h-screeen">
			<div className="container h-full mx-auto p-4 lg:py-8 flex flex-col lg:flex-row gap-4 lg:gap-8">
				<CreateRoomForm />
				<RoomList />
			</div>
		</div>
	);
}
