"use server";

import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { unstable_after as after } from "next/server";

function logError(actionName: string, clientInput: unknown, error: unknown) {
	console.error(actionName, "Input ->", clientInput, "Error -> ", error);
}

export const action = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
		});
	},

	handleServerError(e, utils) {
		logError(utils.metadata.actionName, utils.clientInput, e);
	},
}).use(async ({ next, clientInput, metadata }) => {
	const result = await next();

	after(async () => {
		if (process.env.NODE_ENV === "development") {
			console.log(
				metadata.actionName,
				"Input ->",
				clientInput,
				"Result -> ",
				result,
			);
		}
	});

	return result;
});
