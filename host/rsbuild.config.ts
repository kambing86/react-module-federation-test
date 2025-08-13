import path from "node:path";
import {
	createModuleFederationConfig,
	pluginModuleFederation,
} from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		pluginReact(),
		pluginModuleFederation(
			createModuleFederationConfig({
				name: "host",
				remotes: {
					remote1: "remote1@http://localhost:3001/mf-manifest.json",
					remote2: "remote2@http://localhost:3002/mf-manifest.json",
				},
				shared: ["react", "react-dom"],
				runtimePlugins: [path.join(__dirname, "./src/runtime-plugin/retry.ts")],
			}),
		),
	],
});
