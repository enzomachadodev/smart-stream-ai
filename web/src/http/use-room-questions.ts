import { useQuery } from "@tanstack/react-query";
import type { GetRoomQuestionsResponse } from "./types/rooms";

export function useRoomQuestions(roomId: string) {
	return useQuery({
		queryKey: ["get-questions", roomId],
		enabled: !!roomId,
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:4000/rooms/${roomId}/questions`
			);
			const data: GetRoomQuestionsResponse = await response.json();
			return data;
		},
	});
}
