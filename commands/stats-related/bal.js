const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('bal')
    .setDescription('get bal of user')
    .addStringOption((option) => option.setName('username').setDescription('username to get bal of').setRequired(true)),

    async execute(interaction, bot) {
        const username = interaction.options.getString('username')

        await bot.chat(`/bal ${username}`)

        bot.on('messagestr', async(message) => {
            if(message.includes(`${username} currently has`)) {
                const mon = message.match(/\$\d+/);

                const embed = new EmbedBuilder()
                .setColor(embedCfg.color)
                .setTitle(`${username}'s Balance!`)
                .setDescription(`${username} has ${mon[0]}`)

                await interaction.reply({ embeds: [embed] })
            }

            if(message.includes(`That player does not exist.`)) {

                const embed = new EmbedBuilder()
                .setColor(embedCfg.color)
                .setTitle(`${username}'s Balance!`)
                .setDescription(`${username} has never played DonutSMP!`)

                await interaction.reply({ embeds: [embed] })
            }
        })
    }
}
