import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRooms } from "@/http/use-rooms";
import { dayjs } from "@/lib/dayjs";
import { Badge } from "./ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

export function RoomList() {
	const { data: rooms, isLoading } = useRooms();

	return (
		<Card className="h-full lg:h-[calc(100vh_-_64px)] w-full lg:w-1/2">
			<CardHeader>
				<CardTitle>Salas Recentes</CardTitle>
				<CardDescription>
					Acesso rápido para salas criadas recentemente
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4 h-full overflow-y-auto">
				{isLoading && (
					<div className="flex items-center justify-center h-32">
						<span className="text-muted-foreground">Carregando salas...</span>
					</div>
				)}
				{rooms?.map((room) => (
					<Link
						key={room.id}
						to={`/room/${room.id}`}
						className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/30 duration-200"
					>
						<div className="flex flex-1 flex-col gap-1">
							<h3 className="font-medium">{room.name}</h3>
							<div className="flex items-center gap-1">
								<Badge
									className="text-xs"
									variant="secondary"
								>
									{dayjs(room.createdAt).fromNow()}
								</Badge>
								<Badge
									className="text-xs"
									variant="secondary"
								>
									{room.questionsCount} pergunta(s)
								</Badge>
							</div>
						</div>
						<span className="flex items-center gap-1 text-sm">
							Entrar
							<ArrowRight className="size-4" />
						</span>
					</Link>
				))}
			</CardContent>
		</Card>
	);
}
