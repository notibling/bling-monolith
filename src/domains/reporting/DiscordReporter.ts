import { IBlingErrorReporting, IReport } from "./BlingErrorReporterBase";
import { Channels, DiscordBot } from "@/domains/tools/DiscordBot/DiscordBot";

class DiscordReporter implements IBlingErrorReporting {
  discordBot: DiscordBot;

  static #instance?: DiscordReporter;


  constructor() {
    this.discordBot = DiscordBot.getInstance()
  }


  static getInstance() {
    if (!DiscordReporter.#instance)
      DiscordReporter.#instance = new DiscordReporter();

    return DiscordReporter.#instance;
  }

  async simpleReport(text: string) {
    await this.discordBot.sendChannelMessage(Channels.reporting, text)
  }
  async report(_report: IReport) {

    await this.discordBot.sendEmbed(Channels.reporting,
      {
        title: 'Error Report',
        url: 'https://github.com/blinguy/blinguy-monolith/issues/new',
        description: _report.text,
        thumbnail: 'https://cdn.pixabay.com/photo/2021/07/21/12/50/website-6482988_1280.png',
        author: {
          name: 'BlingBot',
        },
        fields: [
          {
            name: 'Usuario afectado',
            value: _report.meta?.user?.firstName + ' ' + _report.meta?.user?.lastName
          },
          {
            name: 'Corre electrónico',
            value: _report.meta?.user?.email ?? '',
            inline: true
          },
          {
            name: 'Tipo de usuario',
            value: _report.meta?.user?.type ?? '',
            inline: true
          },

          {
            name: '---',
            value: '---'
          },
          {
            name: 'IP',
            value: _report.meta?.ip ?? '',
            inline: true
          },
          {
            name: 'Navegador',
            value: _report.meta?.userAgent ?? '',
            inline: true
          },
          {
            name: 'Error Dump',
            value: _report.errorDump ?? '',
            inline: false
          }
        ],
        image: 'https://bling.uy/wp-content/uploads/2024/01/BLING-WHITE-SVG.svg'
      }
    );
  }
}

export { DiscordReporter }