const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "ping",
    description: "... Pong ?",
    options: [],
    runSlash: (Client, interaction) => {
        interaction.reply("🏓 Pong")
    } 
}