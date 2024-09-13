import { REST, Routes } from "discord.js";
import commands from ".";
import { Environment } from "@/common/Environment";

const token = Environment.getEnv('DISCORD_TOKEN') ?? '';
const clientId = Environment.getEnv('DISCORD_CLIENT_ID') ?? '';
const serverId = Environment.getEnv('DISCORD_SERVER_ID') ?? '';
const rest = new REST().setToken(token);

(async function deployCommands() {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, serverId),
      { body: commands.map((command) => command.data.toJSON()) },
    ) as any
    console.log('DISCORD', data)
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();