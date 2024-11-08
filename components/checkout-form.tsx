"use client";
import { useActionState, useEffect } from "react";
import { checkout } from "@/lib/actions";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function CheckoutForm() {
	const [message, formAction, isPending] = useActionState(checkout, null);

	return (
		<form className="flex flex-col gap-2 w-full" action={formAction}>
			<Button variant="outline" className="w-full h-12 bg-card relative">
				{isPending && (
					<Loader2 className="w-4 h-4 animate-spin absolute right-4 text-muted-foreground" />
				)}
				<span className="text-base">Buy now Pay later</span>
				{message && <span className="text-sm text-green-500">{message}</span>}
			</Button>
		</form>
	);
}
