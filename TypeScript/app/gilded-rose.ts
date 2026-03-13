import { ItemUpdaterFactory } from './factory/item-updater-factory';
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
  private readonly itemUpdaterFactory = new ItemUpdaterFactory();

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items = this.items.map((item) => {
      return this.itemUpdaterFactory.create(item.name).update(item);
    });
    return this.items;
  }
}
