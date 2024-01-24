const config = require("../../config.json")
module.exports = {
    name: "feedback_agree",
    async runInteraction(_, interaction) {
        const message = { ...interaction.message.toJSON(), components: [] }
        for (i in message) {
            if (!message[i]) {
                delete message[i]
            } else if (i === "embeds") {
                message[i] = message[i].map((e) => ({...e, author: undefined}))
            }
        }

        const headers = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        const body = JSON.stringify(message);
        
        fetch(config.webhook.verified_feedback, {
            method: "POST",
            body: body,
            headers: headers
        })
        .then(() => {
            interaction.reply("Le feedback a bien été validé")
        })
        .catch(() => {
            interaction.reply("Le feedback n'a pas pu être envoyé")
        })
    }
}