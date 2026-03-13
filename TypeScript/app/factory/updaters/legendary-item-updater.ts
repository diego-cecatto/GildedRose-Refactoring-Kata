import type { InventoryItem, ItemUpdater } from './item-updater';

export class LegendaryItemUpdater implements ItemUpdater {
  update(item: InventoryItem): InventoryItem {
    return item;
  }
}
