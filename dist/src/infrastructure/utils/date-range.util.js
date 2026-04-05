"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateFromRange = getDateFromRange;
exports.formatDurationHuman = formatDurationHuman;
const get_metrics_range_dto_1 = require("../../modules/metrics/dto/get-metrics-range.dto");
function getDateFromRange(range) {
    const now = new Date();
    const d = new Date(now);
    switch (range) {
        case get_metrics_range_dto_1.MetricsRange.WEEKLY:
            d.setDate(d.getDate() - 7);
            break;
        case get_metrics_range_dto_1.MetricsRange.MONTHLY:
            d.setMonth(d.getMonth() - 1);
            break;
        case get_metrics_range_dto_1.MetricsRange.YEARLY:
            d.setFullYear(d.getFullYear() - 1);
            break;
        case get_metrics_range_dto_1.MetricsRange.DAILY:
        default:
            d.setDate(d.getDate() - 1);
            break;
    }
    return d;
}
function formatDurationHuman(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    const parts = [];
    if (h)
        parts.push(`${h}h`);
    if (m)
        parts.push(`${m}m`);
    if (s || parts.length === 0)
        parts.push(`${s}s`);
    return parts.join(' ');
}
//# sourceMappingURL=date-range.util.js.map