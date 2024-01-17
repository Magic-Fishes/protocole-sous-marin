const config = require("../config.json")
const { MessageActionRow, MessageButton } = require("discord.js")


module.exports = {
    name: "messageCreate",
    once: false,
    async execute(Client, message) {
        if (message.webhookId && message.channelId == config.channels.feedback && message.content.slice(0, 10) === "botActions") {
            const newMessage = {
                embeds: message.embeds,
            };

            const botActions = message.content.slice(11).split(",")

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
