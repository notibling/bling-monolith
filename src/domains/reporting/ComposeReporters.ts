import { IBlingErrorReporting, IReport } from "./BlingErrorReporterBase";


class ComposeReporters {
  constructor(private readonly reporters: IBlingErrorReporting[], private disabled: boolean = false) {
  }

  async report(data: IReport) {
    if (this.disabled) return;
    await Promise.all(this.reporters.map((reporter) => reporter.report(data)))
  }

  async simpleReport(text: string) {
    if (this.disabled) return;
    await Promise.all(this.reporters.map((reporter) => reporter.simpleReport(text)))
  }
}

export { ComposeReporters }