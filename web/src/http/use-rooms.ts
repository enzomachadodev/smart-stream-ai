import { useQuery } from "@tanstack/react-query";
import type { GetRoomsResponse } from "./types/rooms";

export function useRooms() {
	return useQuery({
		queryKey: ["get-rooms"],
		queryFn: async () => {
			const response = await fetch("http://localhost:4000/rooms");
			const data: GetRoomsResponse = await response.json();
			return data;
		},
	});
}
