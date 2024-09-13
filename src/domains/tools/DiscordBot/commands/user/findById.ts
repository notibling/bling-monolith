import dayjs from 'dayjs';
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

import { IDiscordCommand } from "../../CommandManager";
import { UserObjectionModel } from '@/models/User/UserObjectionModel';
import { IUser } from "@/models/User";
import { GeneralUtils } from "@/utils";

export default {
  data: new SlashCommandBuilder()
    .setName('user-find')
    .setDescription('Search discordjs.guide!')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Phrase to search for')
        .setAutocomplete(false)),
        
  execute: async (interaction: CommandInteraction) => {
    const param = interaction.options.get('query');
    if (!param)
      return await interaction.reply('No has ingresado una query valida! por ej: id:107 o email:devs@bling.uy ::estructura:: [fieldname]:[eq:value]');
    const { name, value } = param;
    const [field, _value] = String(value).split(':');

    const data = await UserObjectionModel.query()
      .where(field, _value)

    const users = data.map((user) => user?.toJSON() as IUser)

    if (!users.length) return await interaction.reply('No se encontro el usuario');

    return await interaction.reply(
      '```' + GeneralUtils.generateTable(users.map(user => (
        {
          ID: user.id,
          Nombre: user.firstName + ' ' + user.lastName,
          Email: user.email,
          Tipo: user.type,
          Pais: user.country,
          Reside: user.residenceCountry,
        }))
      ) + '```'
    );
  }
} as IDiscordCommand;