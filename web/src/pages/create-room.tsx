import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";

export function CreateRoom() {
	return (
		<div className="min-h-screeen">
			<div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 border gap-8">
				<CreateRoomForm />
				<RoomList />
			</div>
		</div>
	);
}
