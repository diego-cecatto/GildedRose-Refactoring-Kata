export enum ItemName {
  AgedBrie = 'Aged Brie',
  BackstagePasses = 'Backstage passes to a TAFKAL80ETC concert',
  Sulfuras = 'Sulfuras, Hand of Ragnaros',
  ConjuredManaCake = 'Conjured Mana Cake',
}

export enum ItemKind {
  Decrease = 'decrease',
  Increase = 'increase',
  Backstage = 'backstage',
  Legendary = 'legendary',
}

export type ItemRule = {
  kind: ItemKind;
  rate: number;
};
