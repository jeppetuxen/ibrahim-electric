import { tourDates } from '../src/data/tours.js';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function formatIcalDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}${m}${d}`;
}

function escapeIcal(str) {
  return str.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
}

const upcoming = tourDates.filter(t => t.status === 'upcoming');

const events = upcoming.map(tour => {
  const start = formatIcalDate(tour.date);
  // All-day event ends next day
  const end = formatIcalDate(new Date(tour.date.getTime() + 86400000));
  const summary = tour.festival
    ? `Ibrahim Electric @ ${tour.festival}`
    : tour.venue
      ? `Ibrahim Electric @ ${tour.venue}`
      : `Ibrahim Electric`;
  const location = [tour.venue, tour.location].filter(Boolean).join(', ');
  const uid = `${tour.id}@ibrahimelectric.com`;

  const lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escapeIcal(summary)}`,
    `LOCATION:${escapeIcal(location)}`,
  ];

  if (tour.ticketLink) {
    lines.push(`URL:${tour.ticketLink}`);
  }

  lines.push('END:VEVENT');
  return lines.join('\r\n');
});

const ical = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Ibrahim Electric//Tour Dates//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'X-WR-CALNAME:Ibrahim Electric Tour Dates',
  'X-WR-CALDESC:Live dates for Ibrahim Electric',
  ...events,
  'END:VCALENDAR',
].join('\r\n');

const outPath = join(__dirname, '../public/calendar.ics');
writeFileSync(outPath, ical, 'utf8');
console.log(`Calendar written to public/calendar.ics (${upcoming.length} events)`);
