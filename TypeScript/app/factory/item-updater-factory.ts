import { ItemKind, ItemName } from '../item-types';
import type { ItemRule } from '../item-types';
import { BackstageItemUpdater } from './updaters/backstage-item-updater';
import { DecreaseItemUpdater } from './updaters/decrease-item-updater';
import { IncreaseItemUpdater } from './updaters/increase-item-updater';
import { LegendaryItemUpdater } from './updaters/legendary-item-updater';
import type { ItemUpdater } from './updaters/item-updater';

export class ItemUpdaterFactory {
  private static readonly defaultItemRule: ItemRule = {
    kind: ItemKind.Decrease,
    rate: 1,
  };

  private static readonly itemRulesByName: Record<string, ItemRule> = {
    [ItemName.AgedBrie]: { kind: ItemKind.Increase, rate: 1 },
    [ItemName.BackstagePasses]: { kind: ItemKind.Backstage, rate: 1 },
    [ItemName.Sulfuras]: { kind: ItemKind.Legendary, rate: 0 },
    [ItemName.ConjuredManaCake]: { kind: ItemKind.Decrease, rate: 2 },
  };

  create(itemName: string): ItemUpdater {
    const rule =
      ItemUpdaterFactory.itemRulesByName[itemName] ??
      ItemUpdaterFactory.defaultItemRule;

    switch (rule.kind) {
      case ItemKind.Increase:
        return new IncreaseItemUpdater(rule.rate);
      case ItemKind.Backstage:
        return new BackstageItemUpdater(rule.rate);
      case ItemKind.Legendary:
        return new LegendaryItemUpdater();
      case ItemKind.Decrease:
        return new DecreaseItemUpdater(rule.rate);
    }
  }
}
