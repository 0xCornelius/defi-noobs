export const defaultBaseFee = 100;
export const defaultPriorityFee = 1.5;

export const HIGH = "fast";
export const MEDIUM = "medium";
export const LOW = "low";

export const ethTransfer = {
  estim: 21000,
  limit: 21000,
};
export const erc20Transfer = {
  estim: 50000,
  limit: 100000,
};

export const cutDecimals = (n) => Number(n.toFixed(4));

export function calculateGas(
  gasLimit,
  gasEstim,
  baseFee = defaultBaseFee,
  priorityFee = defaultPriorityFee
) {
  const highestCost = 2 * baseFee * 1 + priorityFee * 1;
  const minimumCost = baseFee * 1 + priorityFee * 1;

  const max = gasLimit * highestCost * 0.000000001;
  const estimated = ((gasEstim * (highestCost + minimumCost)) / 2) * 0.000000001;

  return {
    max: cutDecimals(max),
    estimated: cutDecimals(estimated),
  };
}

export function getDefaultGas(speed) {
  let multiplier = 1;
  switch (speed) {
    case HIGH:
      multiplier = multiplier + 0.15;
      break;
    case LOW:
      multiplier = multiplier - 0.15;
      break;
    default:
      multiplier = 1;
  }
  return {
    baseFee: cutDecimals(defaultBaseFee * multiplier),
    priorityFee: cutDecimals(defaultPriorityFee * multiplier),
  };
}
