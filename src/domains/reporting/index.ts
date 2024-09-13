import { ComposeReporters } from "./ComposeReporters";
import { DiscordReporter } from "./DiscordReporter";


export const BlingReporterSystem = new ComposeReporters([
  DiscordReporter.getInstance(),
], true);