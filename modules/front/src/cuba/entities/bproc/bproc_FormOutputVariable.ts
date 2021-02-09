import {BprocFormOutcome} from "./bproc_FormOutcome";

export class BprocFormOutputVariable {
  static NAME = "bproc_FormOutputVariable";

  name?: string | null;
  type?: any | null;
  outcome?: BprocFormOutcome | null;
}