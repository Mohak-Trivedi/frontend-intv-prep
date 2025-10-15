// Problem: https://bigfrontend.dev/problem/find-available-meeting-slots

/**
 * Questions to ask:
 * 1. Is the array sorted?
 * 2. Are there any overlapping intervals? i.e. endTime of prev > startTime of next
 *
 * Yes for both, in this question.
 */

/* Test cases to check:
[
  [[13,15], [11,12], [10,13]], //schedule for member 1
  [[8, 9]], // schedule for member 2
  [[13, 18]] // schedule for member 3
]

[
  [[0,2], [10,24]], //schedule for member 1
  [[8, 9]], // schedule for member 2
]
*/

function findMeetingSlots(schedules) {
  const output = [];

  // flatten into array of schedule arrays and sort in ascending order of starting times.
  const intervals = schedules.flat().sort((s1, s2) => s1[0] - s2[0]);

  let freeStart = 0; // start time of current free interval that we are finding

  for (const [start, end] of intervals) {
    if (start > freeStart) {
      output.push([freeStart, start]);
    }

    freeStart = Math.max(freeStart, end);
  }

  if (freeStart !== 24) {
    output.push([freeStart, 24]);
  }

  return output;
}

