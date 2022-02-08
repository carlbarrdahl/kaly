// import {
//   isBefore,
//   setHours,
//   setMinutes,
//   setSeconds,
//   addMinutes,
//   setMilliseconds,
// } from "date-fns";

// const setTime = (x, h = 0, m = 0, s = 0, ms = 0) =>
//   setHours(setMinutes(setSeconds(setMilliseconds(x, ms), s), m), h);

// // Provide an array of availability with slot duration

// export function createTimeslot(start, end, duration, availability) {
//   const timeslots = availability.rules.map((rule) => {});
//   const from = setTime(new Date(), 9);
//   const to = setTime(new Date(end), 17);
//   const step = (x) => addMinutes(x, 30);

//   const blocks = [];
//   let cursor = from;

//   while (isBefore(cursor, to)) {
//     blocks.push(cursor);
//     cursor = step(cursor);
//   }
// }

export {};
