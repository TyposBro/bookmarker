module.exports = {
  run: {
    startUrl: ["https://www.youtube.com"],
    firefox: process.env.FIREFOX_BINARY || "firefox",
    browserConsole: true,
  },
};
