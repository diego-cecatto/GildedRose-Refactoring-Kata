import { BaseItemUpdater } from './base-item-updater';
import type { InventoryItem } from './item-updater';

export class BackstageItemUpdater extends BaseItemUpdater {
  constructor(rate: number) {
    super(rate);
  }

  update(item: InventoryItem): InventoryItem {
    const currentSellIn = item.sellIn;
    const nextSellIn = currentSellIn - 1;
    if (nextSellIn < 0) {
      item.quality = 0;
    } else {
      item.quality = this.clampQuality(
        item.quality + this.getBackstageRate(currentSellIn)
      );
    }
    item.sellIn = nextSellIn;
    return item;
  }

  private getBackstageRate(sellIn: number): number {
    if (sellIn < 6) {
      return this.rate * 3;
    }
    if (sellIn < 11) {
      return this.rate * 2;
    }
    return this.rate;
  }
}
