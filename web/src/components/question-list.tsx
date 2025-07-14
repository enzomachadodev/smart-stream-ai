import { useRoomQuestions } from "@/http/use-room-questions";
import { QuestionItem } from "./question-item";

interface QuestionListProps {
	roomId: string;
}

export function QuestionList({ roomId }: QuestionListProps) {
	const { data: questions, isLoading } = useRoomQuestions(roomId);

	return (
		<div className="space-y-6">
			<div className="flex items-center justbify-between">
				<h2 className="text-2xl font-semibold">Perguntas & Respostas</h2>
			</div>

			{isLoading && (
				<div className="flex items-center justify-center">
					<span className="text-muted-foreground">Carregando perguntas...</span>
				</div>
			)}

			{questions?.map((question) => (
				<QuestionItem
					key={question.id}
					question={question}
				/>
			))}
		</div>
	);
}
