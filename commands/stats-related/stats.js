const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const registry = require('prismarine-registry')('1.19')
const ChatMessage = require('prismarine-chat')(registry)
const cfg = require('../../embedCfg.json')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('stats')
    .setDescription('will show user stats')
    .addStringOption((option) => option.setName('username').setDescription('username to check stats').setRequired(true)),

    async execute(interaction, bot) {
        const username = interaction.options.getString('username')
        let kills
        let deaths
        let blocksPlaced
        let blocksBroken
        let mobsKilled
        let moneySpentOnShop
        let MoneyMadeOnSell

        await bot.chat(`/stats ${username}`)

        bot.once('windowOpen', (window) => {
            kills = new ChatMessage(JSON.parse(window.slots[12].customLore[0]))
            deaths = new ChatMessage(JSON.parse(window.slots[13].customLore[0]))
            blocksPlaced = new ChatMessage(JSON.parse(window.slots[15].customLore[0]))
            blocksBroken = new ChatMessage(JSON.parse(window.slots[16].customLore[0]))
            mobsKilled = new ChatMessage(JSON.parse(window.slots[19].customLore[0]))
            moneySpentOnShop = new ChatMessage(JSON.parse(window.slots[20].customLore[0]))
            MoneyMadeOnSell = new ChatMessage(JSON.parse(window.slots[21].customLore[0]))

            const embed = new EmbedBuilder()
            .setColor(cfg.color)
            .setTitle(`Stats for ${username}`)
            .addFields(
                { name: '**Kills: **', value: kills.toString(), inline: true},
                { name: '**Deaths: **', value: deaths.toString(), inline: true},
                { name: '**Blocks Placed: **', value: blocksPlaced.toString(), inline: true},
                { name: '**Blocks Broken: **', value: blocksBroken.toString(), inline: true},
                { name: '**Mobs Killed: **', value: mobsKilled.toString(), inline: true},
                { name: '**Money Spent on /shop: **', value: moneySpentOnShop.toString(), inline: true},
                { name: '**Money made on /sell: **', value: MoneyMadeOnSell.toString(), inline: true},
            )

            console.log(window.slots)
    
            interaction.reply({ embeds: [embed] })
        })

        bot.on('messagestr', async(message) => {
            if(message.includes('User does not exist.')) {
                const embed = new EmbedBuilder()
                .setColor(embedCfg.color)
                .setTitle(`Stats for ${username}`)
                .setDescription(`${username} has never played DonutSMP!`)

                return interaction.reply({ embeds: [embed] })
            }
        })
    }
}
