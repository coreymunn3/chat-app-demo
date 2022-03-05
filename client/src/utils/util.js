export const calculateRelativeTime = (differenceInMs) => {
  let relativeTime = '';
  if (differenceInMs < 60 * 1000) {
    relativeTime = parseInt(differenceInMs / 1000);
    return `${relativeTime} seconds`;
  }
  if (differenceInMs < 60 * 60 * 1000) {
    relativeTime = parseInt(differenceInMs / (1000 * 60));
    return `${relativeTime} minutes`;
  }
  if (differenceInMs < 24 * 60 * 60 * 1000) {
    relativeTime = parseInt(differenceInMs / (1000 * 60 * 60));
    return `${relativeTime} hours`;
  }
  if (differenceInMs < 7 * 24 * 60 * 60 * 1000) {
    relativeTime = parseInt(differenceInMs / (1000 * 60 * 60 * 24));
    return `${relativeTime} days`;
  }
  return differenceInMs;
};
