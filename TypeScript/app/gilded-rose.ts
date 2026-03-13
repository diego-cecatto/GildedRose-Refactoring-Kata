import { ItemKind, ItemName } from './item-types';
import type { ItemRule } from './item-types';
export { ItemName } from './item-types';
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
export class GildedRose {
  items: Array<Item>;

  private static readonly defaultItemRule: ItemRule = {
    kind: ItemKind.Decrease,
    rate: 1,
  };

  private static readonly itemRulesByName: Record<string, ItemRule> = {
    [ItemName.AgedBrie]: {
      kind: ItemKind.Increase,
      rate: 1
    },
    [ItemName.BackstagePasses]: {
      kind: ItemKind.Backstage,
      rate: 1
    },
    [ItemName.Sulfuras]: {
      kind: ItemKind.Legendary,
      rate: 0
    },
    [ItemName.ConjuredManaCake]: {
      kind: ItemKind.Decrease,
      rate: 2
    },
  };

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      const rule = this.getItemRule(item);
      const currentSellIn = item.sellIn;
      const nextSellIn = this.calculateNextSellIn(currentSellIn, rule);
      item.quality = this.calculateNextQuality(
        item.quality,
        rule,
        currentSellIn,
        nextSellIn
      );
      item.sellIn = nextSellIn;
      return item;
    });
    return this.items;
  }

  private calculateNextQuality(
    currentQuality: number,
    rule: ItemRule,
    currentSellIn: number,
    nextSellIn: number
  ): number {
    switch (rule.kind) {
      case ItemKind.Legendary:
        return currentQuality;
      case ItemKind.Increase:
        return this.clampQuality(
          currentQuality + this.getRateForDay(rule.rate, nextSellIn)
        );
      case ItemKind.Backstage:
        return this.getBackstageQuality(
          currentQuality,
          rule.rate,
          currentSellIn,
          nextSellIn
        );
      case ItemKind.Decrease:
        return this.clampQuality(
          currentQuality - this.getRateForDay(rule.rate, nextSellIn)
        );
    }
  }

  private calculateNextSellIn(sellIn: number, rule: ItemRule): number {
    return rule.kind !== ItemKind.Legendary ? sellIn - 1 : sellIn;
  }

  private getRateForDay(rate: number, sellIn: number): number {
    if (sellIn < 0) {
      return rate * 2;
    }
    return rate;
  }

  private getBackstageQuality(
    currentQuality: number,
    rate: number,
    currentSellIn: number,
    nextSellIn: number
  ): number {
    if (nextSellIn < 0) {
      return 0;
    }
    return this.clampQuality(
      currentQuality + this.getBackstageRate(rate, currentSellIn)
    );
  }

  private getBackstageRate(rate: number, sellIn: number): number {
    if (sellIn < 6) {
      return rate * 3;
    }
    if (sellIn < 11) {
      return rate * 2;
    }
    return rate;
  }

  private clampQuality(quality: number): number {
    if (quality < 0) {
      return 0;
    }
    if (quality > 50) {
      return 50;
    }
    return quality;
  }

  private getItemRule(item: Item): ItemRule {
    return GildedRose.itemRulesByName[item.name] ?? GildedRose.defaultItemRule;
  }
}
