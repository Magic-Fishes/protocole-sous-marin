module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(Client, interaction) {
        if (interaction.isCommand()) {
            const cmd = Client.commands.get(interaction.commandName)
            if (!cmd) return interaction.reply("Cette commande n'existe pas Sale Mongole")

            cmd.runSlash(Client, interaction)
        } else if (interaction.isButton()) {
            const btn = Client.buttons.get(interaction.customId);
            if (!btn) return interaction.reply("Ce bouton n'existe pas")

            btn.runInteraction(Client, interaction);
        } else if (interaction.isSelectMenu()) {
            const slct = Client.selects.get(interaction.customId);
            if (!slct) return interaction.reply("Ce menu de séléction n'existe pas")

            slct.runInteraction(Client, interaction);
        }
    }
}