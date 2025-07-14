export type GetRoomsResponse = {
	id: string;
	name: string;
	questionsCount: number;
	createdAt: string;
}[];

export type GetRoomQuestionsResponse = {
	id: string;
	question: string;
	answer?: string;
	createdAt: string;
}[];

export type CreateRoomRequest = {
	name: string;
	description?: string;
};

export type CreateRoomResponse = {
	id: string;
};

export type CreateQuestionRequest = {
	question: string;
};

export type CreateQuestionResponse = {
	id: string;
};
