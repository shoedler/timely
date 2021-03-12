export type TimerOptions = {
  delay: number;
};

export class Timer {
  private duration: number;
  private prevTime: number = 0;
  private options: TimerOptions;
  private interval: NodeJS.Timeout | null = null;

  constructor(options: TimerOptions) {
    this.options = options;
    this.duration = 0;
  }

  static fromSnapshot(snapshot: TimerSnapshot): Timer {
    const timer = new Timer(snapshot.options);
    timer.duration = snapshot.duration;
    return timer;
  }

  static getTimeComponents(
    ms: number
  ): { hours: number; minutes: number; seconds: number; miliseconds: number } {
    const hours = Math.floor(ms / 3.6e6);
    const minutes = Math.floor((ms / 3.6e6 - hours) * 60);
    const seconds = Math.floor(((ms / 3.6e6 - hours) * 60 - minutes) * 60);
    const miliseconds = ms % 1000;
    return { hours, minutes, seconds, miliseconds };
  }

  static timeComponentStringBuilder = (t: number, nz: number): string =>
    t.toString().padStart(nz, "0");

  public get hours(): number {
    return Math.floor(this.duration / 3.6e6);
  }
  public get minutes(): number {
    return Math.floor((this.duration / 3.6e6 - this.hours) * 60);
  }
  public get seconds(): number {
    return Math.floor(
      ((this.duration / 3.6e6 - this.hours) * 60 - this.minutes) * 60
    );
  }
  public get miliseconds(): number {
    return this.duration % 1000;
  }

  public get time(): string {
    const f = (t: number, nz: number): string => t.toString().padStart(nz, "0");
    const t = Timer.getTimeComponents(this.duration);

    if (t.hours == 0 && t.minutes == 0) return `${t.seconds} sec`;
    else if (t.hours == 0)
      return `${t.minutes}' ${Timer.timeComponentStringBuilder(
        t.seconds,
        2
      )} sec`;
    else
      return (
        Timer.timeComponentStringBuilder(t.hours, 2) +
        ":" +
        Timer.timeComponentStringBuilder(t.minutes, 2) +
        ":" +
        Timer.timeComponentStringBuilder(t.seconds, 2)
      );
  }

  public makeSnapshot(): TimerSnapshot {
    return new TimerSnapshot(this.duration, Date.now(), this.options);
  }

  public start(): void {
    if (!this.interval) {
      this.prevTime = Date.now();
      this.interval = setInterval(this.update.bind(this), this.options.delay);
    }
  }

  public stop(): TimerSnapshot | null {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      return this.makeSnapshot();
    }
    return null;
  }

  public clear(): void {
    this.stop();
    this.duration = 0;
  }

  private update(): void {
    const now = Date.now();
    const Δti = now - this.prevTime;
    this.duration += Δti;
    this.prevTime = now;
  }

  public get isRunning(): boolean {
    return this.interval != null;
  }
}

export class TimerSnapshot {
  public duration: number;
  public options: TimerOptions;
  public end: number;

  constructor(duration: number, end: number, options: TimerOptions) {
    this.duration = duration;
    this.end = end;
    this.options = options;
  }

  public get time(): string {
    const t = Timer.getTimeComponents(this.duration);
    return (
      Timer.timeComponentStringBuilder(t.hours, 2) +
      ":" +
      Timer.timeComponentStringBuilder(t.minutes, 2) +
      ":" +
      Timer.timeComponentStringBuilder(t.seconds, 2)
    );
  }
  public get startDate(): Date {
    return new Date(this.end - this.duration);
  }
}
