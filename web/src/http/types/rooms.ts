export type GetRoomsResponse = {
	id: string;
	name: string;
	questionsCount: number;
	createdAt: string;
}[];

export type CreateRoomRequest = {
	name: string;
	description?: string;
};

export type CreateRoomResponse = {
	id: string;
};
