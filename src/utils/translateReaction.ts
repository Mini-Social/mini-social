export const translateCount = (count: number) => {
  if (count === 0) {
    return 'No reactions';
  } else if (count >= 1000 && count < 1000000) {
    count = count / 1000;
    return count.toFixed(1).replace('.0', '') + 'K';
  } else if (count >= 1000000) {
    count = count / 1000000;
    return count.toFixed(1).replace('.0', '') + 'M';
  }

  return count;
};
