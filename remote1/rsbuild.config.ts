import path from "node:path";
import {
	createModuleFederationConfig,
	pluginModuleFederation,
} from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
	server: {
		port: 3001,
	},
	dev: {
		// It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
		assetPrefix: true,
		client: {
			port: 3001,
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
				name: "remote1",
				exposes: {
					"./button": "./src/button.tsx",
					"./app": "./src/App.tsx",
				},
				shared: [
					"react",
					"react-dom",
					// 'antd'
				],
				runtimePlugins: [path.join(__dirname, "./src/runtime-plugin/retry.ts")],
			}),
		),
	],
});
