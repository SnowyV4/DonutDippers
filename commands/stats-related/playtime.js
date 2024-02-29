const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const registry = require('prismarine-registry')('1.19')
const ChatMessage = require('prismarine-chat')(registry)
const cfg = require('../../embedCfg.json')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('playtime')
    .setDescription('will show user playtime')
    .addStringOption((option) => option.setName('username').setDescription('username to playtime check').setRequired(true)),

    async execute(interaction, bot) {
        const username = interaction.options.getString('username')

        await bot.chat(`/stats ${username}`)

        bot.once('windowOpen', (window) => {
            let playtime = new ChatMessage(JSON.parse(window.slots[14].customLore[0]))

            const embed = new EmbedBuilder()
            .setColor(cfg.color)
            .setTitle(`Playtime for ${username}`)
            .setDescription(`${username}'s ${playtime.toString()}`)
    
            interaction.reply({ embeds: [embed] })
        })

        bot.on('messagestr', async(message) => {
            if(message.includes('User does not exist.')) {
                const embed = new EmbedBuilder()
                .setColor(embedCfg.color)
                .setTitle(`Palytime for ${username}`)
                .setDescription(`${username} has never played DonutSMP!`)

                return interaction.reply({ embeds: [embed] })
            }
        })
    }
}
