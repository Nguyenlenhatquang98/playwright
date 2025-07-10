import { expect, Locator } from "@playwright/test";

export class CommonUtils {
  static isSorted(texts: string[], sorting: "greater" | "less"): boolean {
    const nums = texts.map((t) => parseFloat(t.replace(/[^0-9.-]+/g, "")));

    return !nums
      .slice(0, -1)
      .some((n, i) =>
        sorting === "greater" ? n < nums[i + 1] : n > nums[i + 1]
      );
  }

  static removeDuplicates<T>(list: T[]): T[] {
    return [...new Set(list)];
  }

  static normalizeProductList(list: string[]): string[] | string {
    const cleanedList = list.map((item) =>
      item.replace(/\s*×\s*\d+$/, "").trim()
    );
    return cleanedList.length === 1 ? cleanedList[0] : cleanedList;
  }

  static getRandomNumber(
    min: number,
    max: number,
    quantity?: number
  ): number | number[] {
    const rand = () => Math.floor(Math.random() * (max - min + 1)) + min;
    if (quantity === undefined || quantity === 1) return rand();
    if (quantity === 0) return [];
    if (quantity > max - min + 1) {
      throw new Error(
        "Quantity exceeds the number of unique values in the range."
      );
    }

    const result = new Set<number>();
    while (result.size < quantity) result.add(rand());

    return [...result].sort((a, b) => a - b);
  }

  static getItemsByIndexes<T>(list: T[], indexes: number | number[]): T | T[] {
    if (Array.isArray(indexes)) {
      const items = indexes.map((i) => list[i]);
      return items.length === 1 ? items[0] : items;
    }

    return list[indexes];
  }

  static getRandomString(length: number): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }
}
