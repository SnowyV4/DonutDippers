const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const embedCfg = require('../../embedCfg.json')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('discord')
    .setDescription('gives main discord inv'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
        .setColor(embedCfg.color)
        .setDescription('Our discord is: `https://discord.gg/9KTFWsV23S`')
        
        await interaction.reply({ embeds: [embed] })
    }
}
