import { MetricsRange } from 'src/modules/metrics/dto/get-metrics-range.dto';

export function getDateFromRange(range: MetricsRange): Date {
  const now = new Date();
  const d = new Date(now);
  switch (range) {
    case MetricsRange.WEEKLY:
      d.setDate(d.getDate() - 7);
      break;
    case MetricsRange.MONTHLY:
      d.setMonth(d.getMonth() - 1);
      break;
    case MetricsRange.YEARLY:
      d.setFullYear(d.getFullYear() - 1);
      break;
    case MetricsRange.DAILY:
    default:
      d.setDate(d.getDate() - 1);
      break;
  }
  return d;
}

export function formatDurationHuman(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m}m`);
  if (s || parts.length === 0) parts.push(`${s}s`);
  return parts.join(' ');
}
