import { CommandInteraction, SlashCommandBuilder } from "discord.js";

interface DiscordCommandManager {
  register(command: any): void;
}


interface IDiscordCommand {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<any | void>;
}
export { DiscordCommandManager, IDiscordCommand }