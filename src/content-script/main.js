import App from "./App.svelte";

const target = document.createElement("div");
target.id = "svelte-extension-root";
document.body.appendChild(target);

new App({
  target: target,
  props: {
    name: "YouTube Bookmarker",
  },
});
