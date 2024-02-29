const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const embedCfg = require('../../embedCfg.json')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('online')
    .setDescription('will show if user is online')
    .addStringOption((option) => option.setName('username').setDescription('username to online check').setRequired(true)),

    async execute(interaction, bot) {
        const username = interaction.options.getString('username')

        const playerCI = bot.players[username]

        if(playerCI) {
            const embed = new EmbedBuilder()
            .setColor(embedCfg.color)
            .setTitle(`${username}'s online check.`)
            .setDescription(`${username} is online! ✅`)

            interaction.reply({ embeds: [embed]})
        } else {
            const embed = new EmbedBuilder()
            .setColor(embedCfg.color)
            .setTitle(`${username}'s online check.`)
            .setDescription(`${username} is not online!`)

            interaction.reply({ embeds: [embed]})
        }
    }
}
