const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('shards')
    .setDescription('get shards of user')
    .addStringOption((option) => option.setName('username').setDescription('username to get shards of').setRequired(true)),

    async execute(interaction, bot) {
        const username = interaction.options.getString('username')

        await bot.chat(`/shards ${username}`)

        bot.on('messagestr', async(message) => {
            if(message.includes(`${username}'s shards:`)) {
                const shards = parseInt(message.split(":")[1].trim())

                const embed = new EmbedBuilder()
                .setColor(embedCfg.color)
                .setTitle(`${username}'s Shards!`)
                .setDescription(`${username} has ${shards} shards.`)

                await interaction.reply({ embeds: [embed] })
            }

            if(message.includes(`User does not exist.`)) {

                const embed = new EmbedBuilder()
                .setColor(embedCfg.color)
                .setTitle(`${username}'s Shards!`)
                .setDescription(`${username} has never played DonutSMP!`)

                await interaction.reply({ embeds: [embed] })
            }
        })
    }
}
