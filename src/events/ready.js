const config = require("../../config.json")

module.exports = {
    name: "ready",
    once: true,
    async execute(Client) {
        console.log("Bot ON");
        Client.channels.cache.get(config.channels.feedback).send((config.dev ? "BOT lancé en DEVELOPPEMENT" : "BOT lancé en PRODUCTION"));
        Client.guilds.cache.get(config.server).commands.set(Client.commands.map(cmd => cmd)) // Used to activade commands but we don't have any with this bot
    }
}