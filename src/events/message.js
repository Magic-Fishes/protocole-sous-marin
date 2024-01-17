const config = require("../config.json")
const { MessageActionRow, MessageButton } = require("discord.js")


module.exports = {
    name: "messageCreate",
    once: false,
    async execute(Client, message) {
        if (message.webhookId && message.channelId == config.channels.feedback && message.content.slice(0, 11) === "botActions:") {
            const newMessage = {
                embeds: message.embeds,
            };
            const botActions = message.content.slice(11).split(",")
            
            /**
             * The stupid way I used to handle different webhooks :
             * I use botActions str in the first string of the message's content to know that it is a webhook to handle. 
             * The bot will delete the all the message starting with botActions and replace them by a message with the botActions commands applied
             * After that, put ":" and then you can put your commands if we can call it that way. the goal is to knwo specifics thing from the webhook sender as if we need to handle it or not.
             * 
             * COMMANDS SYNTAXE : [THIS_IS_TWO_COMMANDS],[SEPARATED_BY_A_COMMA]
             * (it is case sensitive but if you modify the code you could change the command and make a command like this : [CoMmAnD])
             * 
             * USED COMMANDS :
             * [VERIFY] : add a button to verify the feedback and send it to the webhook verified_feedback in your config.json file
             * [DISABLE_VERIFY] : if the button verify is there, it will disable it
             * 
             * syntaxe would look like this :
             * botActions:
             * OR
             * botActions:[VERIFY]
             * OR
             * botActions:[VERIFY],[DISABLE_VERIFY]
             */
            if (botActions.includes("[VERIFY]")) {
                const buttons = [new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId("feedback_agree")
                            .setLabel("Valider le feedback")
                            .setStyle(1)
                            .setEmoji("📩")
                            .setDisabled(botActions.includes("[DISABLE_VERIFY]"))
                    )]
                newMessage.components = buttons
            }
            message.delete()
            Client.channels.cache.get(config.channels.feedback).send(newMessage);
        } else {
            return
        }
    }
}
