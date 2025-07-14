import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
	CreateQuestionRequest,
	CreateQuestionResponse,
} from "./types/rooms";

export function useCreateQuestion(roomId: string) {
	const queryClient = useQueryClient();
	const queryKey = ["get-questions"];

	return useMutation({
		mutationFn: async (data: CreateQuestionRequest) => {
			const response = await fetch(
				`http://localhost:4000/rooms/${roomId}/questions`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				}
			);

			const result: CreateQuestionResponse = await response.json();

			return result;
		},

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
			alert("Pergunta criada com sucesso!");
		},
	});
}
