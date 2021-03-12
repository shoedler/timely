import { TimerSnapshot } from "./timer";

export class Stamp {
  public snapshot: TimerSnapshot;
  public name: string;
  public type: string;

  constructor(snapshot: TimerSnapshot, name: string = "", type: string = "") {
    this.snapshot = snapshot;
    this.name = name;
    this.type = type;
  }
}