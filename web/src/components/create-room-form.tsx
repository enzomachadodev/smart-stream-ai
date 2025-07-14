import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateRoom } from "@/http/use-create-rooms";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const createRoomSchema = z.object({
	name: z.string().min(1, "O nome da sala é obrigatório"),
	description: z.string(),
});

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
	const { mutateAsync: createRoom, isPending } = useCreateRoom();

	const form = useForm({
		resolver: zodResolver(createRoomSchema),
		disabled: isPending,
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const handleCreateRoom = async (data: CreateRoomFormData) => {
		await createRoom(data).then(() => {
			form.reset();
		});
	};

	return (
		<Card className="h-fit w-full lg:w-1/2">
			<CardHeader>
				<CardTitle>Criar Sala</CardTitle>
				<CardDescription>
					Crie uma nova sala para começar a fazer perguntas e receber respostas
					da I.A.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateRoom)}
						className="flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome da sala</FormLabel>
									<FormControl>
										<Input
											placeholder="Digite o nome da sala..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição da sala</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Digite uma descrição para a sala..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							className="w-full"
							type="submit"
							loading={isPending || form.formState.isSubmitting}
						>
							Criar Sala
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
