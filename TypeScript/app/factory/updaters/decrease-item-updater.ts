import { BaseItemUpdater } from './base-item-updater';
import type { InventoryItem } from './item-updater';

export class DecreaseItemUpdater extends BaseItemUpdater {
  constructor(rate: number) {
    super(rate);
  }

  update(item: InventoryItem): InventoryItem {
    const nextSellIn = item.sellIn - 1;
    item.quality = this.clampQuality(
      item.quality - this.getAdjustedRate(nextSellIn)
    );
    item.sellIn = nextSellIn;
    return item;
  }
}
