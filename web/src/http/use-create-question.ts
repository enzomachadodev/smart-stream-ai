import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
	CreateQuestionRequest,
	CreateQuestionResponse,
	GetRoomQuestionsResponse,
} from "./types/rooms";

export function useCreateQuestion(roomId: string) {
	const queryClient = useQueryClient();
	const queryKey = ["get-questions", roomId];

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

		onMutate: ({ question }) => {
			const questions =
				queryClient.getQueryData<GetRoomQuestionsResponse>(queryKey);

			const questionsArray = questions || [];

			const newQuestion = {
				id: crypto.randomUUID(),
				question,
				createdAt: new Date().toISOString(),
				isGenerationgAnswer: true,
			};

			queryClient.setQueryData<GetRoomQuestionsResponse>(queryKey, [
				newQuestion,
				...questionsArray,
			]);

			return { newQuestion, questions };
		},

		onSuccess: (data, _, context) => {
			queryClient.setQueryData<GetRoomQuestionsResponse>(
				queryKey,
				(questions) => {
					if (!questions || !context.newQuestion) {
						return questions;
					}

					return questions.map((question) => {
						if (question.id === context.newQuestion.id) {
							return {
								...question,
								id: data.questionId,
								answer: data.answer,
								isGenerationAnswer: false,
							};
						}

						return question;
					});
				}
			);
		},

		onError: (_error, _, context) => {
			if (context?.questions) {
				queryClient.setQueryData<GetRoomQuestionsResponse>(
					queryKey,
					context.questions
				);
			}
		},
	});
}
