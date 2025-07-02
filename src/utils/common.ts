import { Locator } from "@playwright/test";

export class CommonUtils {
  static isSorted(texts: string[], sorting: "greater" | "less"): boolean {
    const nums = texts.map((t) => parseFloat(t.replace(/[^0-9.-]+/g, "")));

    return !nums
      .slice(0, -1)
      .some((n, i) =>
        sorting === "greater" ? n < nums[i + 1] : n > nums[i + 1]
      );
  }

  static filterLocatorByName(locator: Locator, productName: string) {
    return locator.filter({ hasText: `${productName}` });
  }
}
