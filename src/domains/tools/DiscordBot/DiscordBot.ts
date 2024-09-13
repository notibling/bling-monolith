import { Client, Collection, ColorResolvable, EmbedBuilder, Events, GatewayIntentBits, TextChannel } from "discord.js";
import { Environment } from "@/common/Environment";
import commands from "./commands";

enum Channels {
  'reporting' = '1257855778333917255'
}

interface IEmbedPayload {
  title: string;
  description: string;
  color?: ColorResolvable;
  url: string;
  author: {
    name: string;
    iconURL?: string;
    url?: string;
  };
  thumbnail?: string;
  image?: string,
  fields: {
    name: string;
    value: string;
    inline?: boolean
  }[]
}

class DiscordBot {
  static #instance: DiscordBot;
  private commands = new Collection<any, any>();
  private token = Environment.getEnv('DISCORD_TOKEN') ?? '';
  readonly discord: Client;
  private constructor() {
    this.discord = new Client({
      intents: [
        GatewayIntentBits.Guilds
      ],
    });
    this.discord.login(this.token);
    this.listenCommands();
  }

  static getInstance() {
    if (!DiscordBot.#instance) {
      DiscordBot.#instance = new DiscordBot();
    }

    return DiscordBot.#instance;
  }

  private async getChannel<T>(channel: Channels) {
    const _channel = await this.discord.channels.cache.get(channel);

    if (!_channel) throw new Error(`Channel ${channel} not found`);

    return _channel as T;
  }


  async sendEmbed(channel: Channels, embedData: IEmbedPayload) {
    const _channel = await this.getChannel<TextChannel>(channel);

    const embed = new EmbedBuilder()
      .setColor(embedData?.color ?? '#FFCC00')
      .setTitle(embedData.title)
      .setURL(embedData.url)
      .setAuthor({ name: 'BlingBot' })
      .setDescription(embedData.description)
      .addFields(...embedData.fields)
      .setTimestamp()


    if (embedData.thumbnail) embed.setThumbnail(embedData.thumbnail)
    if (embedData.image) embed.setImage(embedData.image)

    await _channel.send({ embeds: [embed] });
  }

  async sendChannelMessage(channel: Channels, message: string) {
    const _channel = await this.getChannel<TextChannel>(channel);
    _channel.send(message);
  }


  listenCommands() {
    commands.map((command) => this.commands.set(command.data.name, command));

    this.discord.on(Events.InteractionCreate, async interaction => {
      if (!interaction.isChatInputCommand()) return;

      const command = this.commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
      }
    });
  }

}


export { DiscordBot, Channels }