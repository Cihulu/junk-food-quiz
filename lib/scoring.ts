import { FOODS, QUESTIONS, DIM, type FoodVector } from "./data";

// 用户答完所有题后，计算每个维度的平均分
export function computeUserVector(answers: Record<number, number>): FoodVector {
  const sums: Record<string, number[]> = {
    ACTIVATION: [],
    SOCIAL: [],
    CONTRAST: [],
    ENERGY: [],
  };

  QUESTIONS.forEach((q) => {
    const optionIndex = answers[q.id];
    if (optionIndex === undefined) return;
    const option = q.options[optionIndex];
    const score = option.scores[q.dimension];
    if (score !== undefined) {
      sums[q.dimension].push(score);
    }
  });

  const avg = (arr: number[]) =>
    arr.length === 0 ? 1 : arr.reduce((a, b) => a + b, 0) / arr.length;

  return [
    avg(sums.ACTIVATION),
    avg(sums.SOCIAL),
    avg(sums.CONTRAST),
    avg(sums.ENERGY),
  ];
}

// 欧氏距离
function euclidean(a: FoodVector, b: FoodVector): number {
  return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}

// 找最近的食物（平局时随机选）
export function findNearestFood(userVector: FoodVector) {
  let candidates: typeof FOODS = [];
  let minDist = Infinity;

  for (const food of FOODS) {
    const dist = euclidean(userVector, food.vector);
    if (dist < minDist - 1e-9) {
      minDist = dist;
      candidates = [food];
    } else if (dist < minDist + 1e-9) {
      candidates.push(food);
    }
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}
