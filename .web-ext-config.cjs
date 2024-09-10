module.exports = {
  sourceDir: "./public/",
  artifactsDir: "./web-ext-artifacts/",
  build: {
    overwriteDest: true,
  },
  run: {
    firefox: process.env.FIREFOX_BINARY || "firefox",
    firefoxProfile: "dev-edition-default",
    startUrl: ["https://www.youtube.com/watch?v=10lnRomHBLw"],
    browserConsole: true,
  },
};
