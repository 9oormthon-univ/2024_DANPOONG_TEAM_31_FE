import { Dimensions } from "react-native";

type Position = { top: number; left: number };

const existingPositions: Position[] = [];

export function randomPosition(
  componentSize: number = 65,
  topLimit: [number, number] = [0, 300],
  leftLimit: [number, number] = [0, Dimensions.get("screen").width - 20 * 2 * 2]
): Position {
  const getRandomInRange = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const doesOverlap = (x1: number, y1: number, x2: number, y2: number, size: number): boolean =>
    Math.abs(x1 - x2) < size && Math.abs(y1 - y2) < size;

  let top: number, left: number;

  do {
    top = getRandomInRange(topLimit[0], topLimit[1]);
    left = getRandomInRange(leftLimit[0], leftLimit[1]);
  } while (
    existingPositions.some((pos) => doesOverlap(top, left, pos.top, pos.left, componentSize))
  );

  existingPositions.push({ top, left });
  return { top: top + 20, left };
}
