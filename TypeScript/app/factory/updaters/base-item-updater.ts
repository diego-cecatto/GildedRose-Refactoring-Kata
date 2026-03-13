import type { InventoryItem, ItemUpdater } from './item-updater';

export abstract class BaseItemUpdater implements ItemUpdater {
  protected constructor(protected readonly rate: number) { }

  abstract update(item: InventoryItem): InventoryItem;

  protected clampQuality(quality: number): number {
    if (quality < 0) {
      return 0;
    }
    if (quality > 50) {
      return 50;
    }
    return quality;
  }

  protected getAdjustedRate(sellIn: number): number {
    if (sellIn < 0) {
      return this.rate * 2;
    }
    return this.rate;
  }
}
