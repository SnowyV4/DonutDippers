const mineflayer = require("mineflayer");
const fs = require("node:fs");
const path = require("node:path");


const { username, host, port, version, auth } = require("./settings.json");

function createBot() {
  function injectModules(bot) {
    const MODULES_DIRECTORY = path.join(__dirname, "modules");
    const modules = fs
      .readdirSync(MODULES_DIRECTORY)
      .filter((x) => x.endsWith(".js"))
      .map((pluginName) => require(path.join(MODULES_DIRECTORY, pluginName)));

    console.log(`Loaded \x1b[32m${modules.length}\x1b[0m bot modules`);

    bot.loadPlugins(modules);
  }

  const bot = mineflayer.createBot({
    username: username,
    auth: auth,
    host: host,
    port: port,
    version: version,
  });

  injectModules(bot);

  bot.on("end", () => {
    console.log("\x1b[31mThe bot has ended. Reconnecting... \x1b[0m");
    setTimeout(createBot, 5000);
  });

  bot.on("error", (err) => {
    console.error(err.message);
  });

  return bot;
}

module.exports = createBot;
