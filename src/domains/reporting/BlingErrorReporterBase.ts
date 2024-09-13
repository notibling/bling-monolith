import { IUser } from "@/models/User";

interface IMeta {
  user: Partial<IUser>;
  ip: string;
  userAgent: string;
  url: string;
}

interface IReport {
  errorCode: number;
  text: string;
  timestamp: number;
  errorDump?: string;
  meta?: Partial<IMeta>;
}
interface IBlingErrorReporting {
  simpleReport(text: string): Promise<void>;
  report(data: IReport): Promise<void>;
}

export {
  type IReport,
  type IBlingErrorReporting
}