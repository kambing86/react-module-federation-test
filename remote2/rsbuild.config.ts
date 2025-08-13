import path from "node:path";
import {
	createModuleFederationConfig,
	pluginModuleFederation,
} from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	server: {
		port: 3002,
	},
	dev: {
		// It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
		assetPrefix: true,
		client: {
			port: 3002,
		},
	},
	plugins: [
		pluginReact({
			splitChunks: {
				react: false,
				router: false,
			},
		}),
		pluginModuleFederation(
			createModuleFederationConfig({
				name: "remote2",
				exposes: {
					"./button": "./src/button.tsx",
				},
				shared: ["react", "react-dom"],
				runtimePlugins: [path.join(__dirname, "./src/runtime-plugin/retry.ts")],
			}),
		),
	],
});
