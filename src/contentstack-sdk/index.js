import Contentstack from "contentstack";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

const Stack = Contentstack.Stack({
  live_preview: {
    management_token: `${process.env.REACT_APP_CONTENTSTACK_MANAGEMENT_TOKEN}`,
    enable: true,
    host: "api.contentstack.io",
  },
});

ContentstackLivePreview.init({
  stackSdk: Stack,
});
