export type InventoryItem = {
  name: string;
  sellIn: number;
  quality: number;
};

export interface ItemUpdater {
  update(item: InventoryItem): InventoryItem;
}
