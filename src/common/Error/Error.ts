import { IErrorMessage } from "./Messages";
import { BlingReporterSystem } from "@/domains/reporting";

class ErrorHandler {
  static #instance: ErrorHandler;


  static getInstance() {
    if (!ErrorHandler.#instance) {
      ErrorHandler.#instance = new ErrorHandler();
    }
    return ErrorHandler.#instance;
  }

  async throwRequestError(req: Express.Request, error: IErrorMessage, extra?: string | Record<string, any>) {
    const [errorCode, errorMessage] = error;

    await BlingReporterSystem.report({
      errorCode, text: errorMessage, timestamp: Date.now(),
      errorDump: JSON.stringify(extra),
      meta: {
        ip: JSON.stringify(req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress),
        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        user: req.user,
        userAgent: req.headers['user-agent'] ?? 'not defined',
      }
    });

  }

  async throw(error: IErrorMessage, extra?: string, throwIt?: boolean) {
    const [errorCode, errorMessage] = error;
    const log = `Error: Code ${errorCode}, Message: ${errorMessage} :: ${extra}`;

    console.log(log);
    if (throwIt) throw new Error(log);

    // * TODO: implement error handling
    await BlingReporterSystem.simpleReport(log);
    return Promise.resolve(true);
  }
}

export { ErrorHandler }