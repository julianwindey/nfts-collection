export interface TraitFrequency {
  traitName: string;
  frequency: number;
}

export interface CategoryDistribution {
  categoryName: string;
  traitsFrequencies: TraitFrequency[];
}

export interface AssignedTraitsOnNft {
  nftId: number;
  assignedTraits: AssignedTraitsFromCategories;
}

export interface AssignedTraitsFromCategories {
  [categoryName: string]: Trait;
}

type Trait = string;
