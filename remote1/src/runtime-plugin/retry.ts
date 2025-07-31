import { RetryPlugin } from "@module-federation/retry-plugin";
const retryPlugin = () =>
  RetryPlugin({
    fetch: {},
    script: {},
  });
export default retryPlugin;
