interface TimeOptions {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

function getMilliseconds({
  years = 0,
  months = 0,
  days = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
}: TimeOptions): number {
  const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;
  const millisecondsPerMonth = 30 * 24 * 60 * 60 * 1000; // Assuming an average month length
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const millisecondsPerHour = 60 * 60 * 1000;
  const millisecondsPerMinute = 60 * 1000;
  const millisecondsPerSecond = 1000;

  const totalMilliseconds =
    years * millisecondsPerYear +
    months * millisecondsPerMonth +
    days * millisecondsPerDay +
    hours * millisecondsPerHour +
    minutes * millisecondsPerMinute +
    seconds * millisecondsPerSecond;

  return totalMilliseconds;
}

class Timer {
  private startTime: any;

  constructor() {
    this.startTime = new Date();
  }

  reset(): void {
    this.startTime = new Date();
  }

  check(options: TimeOptions): boolean {
    const timeInMillis = getMilliseconds(options);
    const currentTime: any = new Date();
    return currentTime - this.startTime >= timeInMillis;
  }
}

getMilliseconds.start = () => new Timer();

export default {
  get: getMilliseconds,
  start: () => new Timer(),
};
