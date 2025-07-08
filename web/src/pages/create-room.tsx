import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsResponse = {
	id: string;
	name: string;
}[];

export function CreateRoom() {
	const { data: rooms, isLoading } = useQuery({
		queryKey: ["get-rooms"],
		queryFn: async () => {
			const response = await fetch("http://localhost:4000/rooms");
			const data: GetRoomsResponse = await response.json();
			return data;
		},
	});

	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="flex flex-col items-center justify-center space-y-4">
				<h1 className="text-3xl font-bold">Create Room</h1>
				{isLoading ? (
					<p className="text-lg">Loading...</p>
				) : rooms?.length ? (
					<ul className="space-y-2">
						{rooms.map((room) => (
							<li
								key={room.id}
								className="text-lg"
							>
								{room.name} - <span className="text-gray-500">{room.id}</span>-{" "}
								<Link
									to={`/room/${room.id}`}
									className="hover:underline text-blue-500"
								>
									Acessar Sala
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p className="text-lg">Nenhuma sala encontrada</p>
				)}
				<Link
					to="/room"
					className="underline text-blue-500"
				>
					Acessar Sala
				</Link>
			</div>
		</div>
	);
}
