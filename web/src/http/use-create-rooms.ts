import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateRoomRequest, CreateRoomResponse } from "./types/rooms";

export function useCreateRoom() {
	const queryClient = useQueryClient();
	const queryKey = ["get-rooms"];

	return useMutation({
		mutationFn: async (data: CreateRoomRequest) => {
			const response = await fetch("http://localhost:4000/rooms", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result: CreateRoomResponse = await response.json();

			return result;
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
			alert("Sala criada com sucesso!");
		},
	});
}
