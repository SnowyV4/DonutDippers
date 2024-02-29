const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, createMessageComponentCollector } = require('discord.js')
const embedCfg = require('../../embedCfg.json')

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('gives bot commands and information'),

    async execute(interaction) {
        const stringSelect = new StringSelectMenuBuilder()
        .setCustomId('menu')
        .setPlaceholder('Select something')
        .addOptions(
            {
                label: 'DonutSMP commands',
                description: 'Shows all DonutSMP commands.',
                value: 'menu1'
            },
            {
                label: 'Other commands',
                description: 'Shows every other command.',
                value: 'menu2'
            }
        )
        const helpmenu = new ActionRowBuilder()
        .addComponents(stringSelect)

        const inv = new ButtonBuilder()
        .setLabel('Invite me')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.com/oauth2/authorize?client_id=1211456474396622898&permissions=8&scope=applications.commands+bot')

        const invButton = new ActionRowBuilder()
        .addComponents(inv)

        const back = new ButtonBuilder()
        .setCustomId('back')
        .setLabel('Back')
        .setStyle(ButtonStyle.Success)

        const backButton = new ActionRowBuilder()
        .addComponents(back)

        const embed = new EmbedBuilder()
        .setColor(embedCfg.color)
        .setDescription('Donut Dippers is the **best** public DonutSMP integrated bot out there! It is developed by snowyv4/0comment')

        const donutEmbed = new EmbedBuilder()
        .setColor(embedCfg.color)
        .setDescription("`/bal`: Shows player money\n`/shards`: Shows player shards\n`/playtime`: Shows player playtime\n`/online`: Shows if player is online\n`/stats`: Shows every of the player's stat")

        const otherEmbed = new EmbedBuilder()
        .setColor(embedCfg.color)
        .setDescription("`/help`: Shows bot info and commands\n`/discord`: Shows bot's official discord")

        const reply = await interaction.reply({ embeds: [embed], components: [helpmenu, invButton] })

        const collector = await reply.createMessageComponentCollector()

        collector.on('collect', async(i) => {
            if(i.customId==='menu') {
                const value = i.values[0]
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can interact with the select menu!`, ephemeral: true})
                }

                if(value==='menu1') {
                    await i.update({ embeds: [donutEmbed], components: [backButton, invButton] })
                } else if(value==='menu2') {
                    await i.update({ embeds: [otherEmbed], components: [backButton, invButton] })
                }
            }

            if(i.customId==='back') {
                if (i.user.id !== interaction.user.id) {
                    return await i.reply({ content: `Only ${interaction.user.tag} can interact with the select menu!`, ephemeral: true})
                }

                await i.update({ embeds: [embed], components: [helpmenu, invButton] })
            }
        })
    }
}
