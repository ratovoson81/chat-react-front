export function BorderRoundedMe(
  meId: number,
  currentId: number,
  prev: number,
  next: number,
  diffPrev: number,
  diffNext: number
) {
  let data = "";
  if (currentId === meId && prev !== currentId && next !== currentId) {
    data = `${data} rounded-br-lg`;
  }
  if (
    currentId === meId &&
    prev !== currentId &&
    next === currentId &&
    diffNext >= 3
  ) {
    data = `${data} rounded-br-lg`;
  }
  if (
    currentId === meId &&
    prev === currentId &&
    next === currentId &&
    diffPrev >= 3 &&
    diffNext < 3
  ) {
    data = `${data} rounded-tr-lg`;
  }
  if (
    currentId === meId &&
    prev === currentId &&
    next === currentId &&
    diffPrev <= 3 &&
    diffNext >= 3
  ) {
    data = `${data} rounded-br-lg`;
  }
  if (
    currentId === meId &&
    prev !== currentId &&
    next === currentId &&
    diffNext <= 3
  ) {
    data = `${data} rounded-tr-lg`;
  }
  if (
    currentId === meId &&
    prev === currentId &&
    next === currentId &&
    diffPrev >= 3 &&
    diffNext >= 3
  ) {
    data = `${data} rounded-br-lg`;
  }
  if (currentId === meId && prev === currentId && next !== currentId) {
    data = `${data} rounded-br-lg`;
  }
  return data;
}

export function BorderRoundedReceive(
  meId: number,
  currentId: number,
  prev: number,
  next: number,
  diffPrev: number,
  diffNext: number
) {
  let data = "";
  if (currentId !== meId && prev !== currentId && next !== currentId) {
    data = `${data} rounded-bl-lg`;
  }
  if (
    currentId !== meId &&
    prev !== currentId &&
    next === currentId &&
    diffNext >= 3
  ) {
    data = `${data} rounded-bl-lg`;
  }
  if (
    currentId !== meId &&
    prev === currentId &&
    next === currentId &&
    diffPrev >= 3 &&
    diffNext < 3
  ) {
    data = `${data} rounded-tl-lg`;
  }
  if (
    currentId !== meId &&
    prev === currentId &&
    next === currentId &&
    diffPrev <= 3 &&
    diffNext >= 3
  ) {
    data = `${data} rounded-bl-lg`;
  }
  if (
    currentId !== meId &&
    prev !== currentId &&
    next === currentId &&
    diffNext <= 3
  ) {
    data = `${data} rounded-tl-lg`;
  }
  if (
    currentId !== meId &&
    prev === currentId &&
    next === currentId &&
    diffPrev >= 3 &&
    diffNext >= 3
  ) {
    data = `${data} rounded-bl-lg`;
  }
  if (currentId !== meId && prev === currentId && next !== currentId) {
    data = `${data} rounded-bl-lg`;
  }
  return data;
}
