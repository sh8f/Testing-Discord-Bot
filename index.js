require('dotenv').config();

const {Client, Events, GatewayIntentBits, EmbedBuilder, 
       SlashCommandBuilder, PermissionsBitField, Permission} 
       = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on(Events.ClientReady, (x) => {
    console.log(`${x.user.tag} is ready!`);
    client.user.setActivity('heyo');

    const ping = new SlashCommandBuilder()
    .setName ('ping')
    .setDescription('This is the ping command');

    const hello = new SlashCommandBuilder()
    .setName ('hello')
    .setDescription('This is the hello command')
    .addUserOption(option => 
        option
        .setName ('user')
        .setDescription('The user to say hi to')
        .setRequired(false)
    )

    const add = new SlashCommandBuilder()
    .setName ('add')
    .setDescription('This is the add command')
    .addNumberOption(option => 
    option
    .setName ('first_number')
    .setDescription('first number')
    )
    .addNumberOption(option => 
        option
        .setName ('second_number')
        .setDescription('second number')
    )

    client.application.commands.create(ping);
    client.application.commands.create(hello);
    client.application.commands.create(add);
})

client.on('interactionCreate',(interaction) => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName === 'ping'){
        interaction.reply('HEYO');
    }

    if(interaction.commandName === 'hello'){
        const userOption = interaction.options.getUser('user');
        if(userOption) {
            interaction.reply(`Hello, ${userOption.toString()}!`)
        }
        else{
            interaction.reply('HELLO');
        }
    }

    if(interaction.commandName === 'add'){
        const firstNumber = interaction.options.getNumber('first_number');
        const secondNumber = interaction.options.getNumber('second_number');

        if(isNaN(firstNumber) || isNaN(secondNumber)){
            interaction.reply('please enter a valid input!');
        }
        else{
            const result = firstNumber + secondNumber;
            interaction.reply(`sum = ${result}`);
        }
    }
});

client.login(process.env.TOKEN);