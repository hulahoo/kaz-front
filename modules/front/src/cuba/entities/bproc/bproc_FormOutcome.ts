import {BprocFormOutcomeParam} from "./bproc_FormOutcomeParam";
import {BprocFormOutputVariable} from "./bproc_FormOutputVariable";

export class BprocFormOutcome {
  static NAME = "bproc_FormOutcome";

  id?: string | null;
  caption?: string | null;
  icon?: string | null;
  outcomeParams?: BprocFormOutcomeParam[] | null;
  outputVariables?: BprocFormOutputVariable[] | null;
}