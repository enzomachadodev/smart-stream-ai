import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";
import { CreateRoom } from "./pages/create-room";
import { RecordRoomAudio } from "./pages/record-room-audio";
import { Room } from "./pages/room";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				defaultTheme="dark"
				storageKey="vite-ui-theme"
			>
				<ThemeToggle />
				<BrowserRouter>
					<Routes>
						<Route
							index
							element={<CreateRoom />}
						/>
						<Route
							path="/room/:roomId"
							element={<Room />}
						/>
						<Route
							path="/room/:roomId/audio"
							element={<RecordRoomAudio />}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
