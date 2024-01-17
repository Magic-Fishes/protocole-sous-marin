const Discord = require("discord.js");
const config = require("./src/config.json");

const Client = new Discord.Client({ partials: ["CHANNEL"], intents: 98303 });

// Error handling 

process.on("exit", code => {console.log("Le processus s'est arrêté avec le code : " + code) });
process.on("uncaughtException", (err, origin) => { console.log("UNCAUGHT_EXCEPTION : " + err, "Origine : " + origin)});
process.on("unhandledRejection", (reason, promise) => { console.log("Unhandled Rejection : " + reason, "Promise : " + promise)});
process.on("warning", (...args) => { console.log(...args)});


["commands", "cooldowns", "buttons", "selects"].forEach(x => Client[x] = new Discord.Collection());
["CommandUtil", "EventUtil", "ButtonUtil", "SelectUtil"].forEach(handler => { require(`./src/utils/handlers/${handler}`)(Client) });


Client.login(config.token);