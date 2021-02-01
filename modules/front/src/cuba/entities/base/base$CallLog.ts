import { StandardEntity } from "./sys$StandardEntity";
import { DicAts } from "./base$DicAts";
export class CallLog extends StandardEntity {
  static NAME = "base$CallLog";
  callId?: string | null;
  dicAts?: DicAts | null;
  langCode?: string | null;
  atsCode?: string | null;
  durationOfWait?: any | null;
  durationOfTalk?: any | null;
  callDateStart?: any | null;
  callAnswerDate?: any | null;
  callDateEnd?: any | null;
  callStatus?: any | null;
  phoneConversationStart?: any | null;
  userId?: any | null;
  fromNumber?: string | null;
  toNumber?: string | null;
  callType?: string | null;
  parent?: CallLog | null;
  callRecordFileName?: string | null;
  clientId?: any | null;
  duration?: number | null;
  billableSeconds?: number | null;
  description?: string | null;
}
export type CallLogViewName = "_base" | "_local" | "_minimal";
export type CallLogView<V extends CallLogViewName> = V extends "_base"
  ? Pick<
      CallLog,
      | "id"
      | "description"
      | "callId"
      | "langCode"
      | "atsCode"
      | "durationOfWait"
      | "durationOfTalk"
      | "callDateStart"
      | "callAnswerDate"
      | "callDateEnd"
      | "callStatus"
      | "phoneConversationStart"
      | "userId"
      | "fromNumber"
      | "toNumber"
      | "callType"
      | "callRecordFileName"
      | "clientId"
      | "duration"
      | "billableSeconds"
    >
  : V extends "_local"
  ? Pick<
      CallLog,
      | "id"
      | "callId"
      | "langCode"
      | "atsCode"
      | "durationOfWait"
      | "durationOfTalk"
      | "callDateStart"
      | "callAnswerDate"
      | "callDateEnd"
      | "callStatus"
      | "phoneConversationStart"
      | "userId"
      | "fromNumber"
      | "toNumber"
      | "callType"
      | "callRecordFileName"
      | "clientId"
      | "duration"
      | "billableSeconds"
    >
  : V extends "_minimal"
  ? Pick<CallLog, "id" | "description">
  : never;
