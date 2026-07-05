import { globalHelpers } from "./globalHelpers";
import type { GlobalVariablesI } from "./globalTypes";

async function globalSetup() {
	const { ENVIRONMENT, BASE_URL } = process.env;

	if (!ENVIRONMENT) {
		throw new Error("ENVIRONMENT is not defined");
	}

	const envVariables = globalHelpers.validateGlobalVariables(
		process.env as unknown as GlobalVariablesI,
	);

	const globalEnv = {
		...envVariables,
	};

	process.env.globalEnv = JSON.stringify(globalEnv);

	console.log("Global setup completed");
	console.log(`ENVIRONMENT: ${ENVIRONMENT}`);
	console.log(`BASE_URL: ${BASE_URL}`);
}

export default globalSetup;
