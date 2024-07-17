// components/NamePopup.tsx
"use client";

import React, { useState } from "react";
import {
	Modal,
	Input,
	Button,
	Chip,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	FormLabel,
	ModalClose,
	ModalDialog,
	Stack,
} from "@mui/joy";
import { createUser } from "@/lib/actions-user";
import { useUserContext } from "../UserProvider";
import { error } from "console";

interface NamePopupProps {
	onComplete: () => void;
}

export function NamePopup({ onComplete }: NamePopupProps) {
	const [name, setName] = useState("");
	const [open, setOpen] = useState(true);
	const { setUserStorage } = useUserContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (name) {
			const user = await createUser(name);
			setUserStorage(user.id, user.name);
			setOpen(false);
			onComplete();
		}
	};

	return (
		<Modal open={open}>
			<ModalDialog size="md">
				{/* <ModalClose variant="plain" color="danger" /> */}
				<DialogTitle component="div">Podaj swoje imię</DialogTitle>
				<DialogContent>Podaj imię, które będzie Cię identyfikować podczas korzystania z aplikacji</DialogContent>

				<form onSubmit={handleSubmit}>
					<FormControl>
						<Input placeholder="Wpisz swoje imię" variant="soft" value={name} onChange={handleChange} />
						<Button variant="solid" color="primary" type="submit" sx={{ mt: 2 }}>
							Zapisz
						</Button>
					</FormControl>
				</form>
			</ModalDialog>
		</Modal>
	);
}