import { cleanEnv, str } from "envalid";
import type { GlobalVariablesI } from "./globalTypes";

const validateGlobalVariables = (
	globalVariables: GlobalVariablesI,
): GlobalVariablesI => {
	return cleanEnv(globalVariables, {
		ENVIRONMENT: str({
			choices: ["dev", "qa", "test"],
		}),
		BASE_URL: str(),
	});
};

export const globalHelpers = {
	validateGlobalVariables,
};
