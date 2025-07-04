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

  static async filterLocatorByName(
    locator: Locator,
    productName: string | string[]
  ) {
    console.log("All textcontent: " + (await locator.allInnerTexts()));
    if (typeof productName === "string") {
      productName = productName.trim() === "" ? [] : [productName];
    }
    const uniqueList = this.removeDuplicates(productName);

    for (let i = 0; i < uniqueList.length; i++) {
      console.log("Filter for: " + uniqueList[i]);
      const count = await locator.filter({ hasText: uniqueList[i] }).count();
      if (count != 1) return false;
    }
    return true;
  }

  static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
