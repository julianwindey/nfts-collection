export interface TraitFrequency {
  traitName: string;
  frequency: number;
}

export interface CategoryDistribution {
  categoryName: string;
  traitsFrequencies: TraitFrequency[];
}

export interface AssignedTraitsOnNFT {
  ID: number;
  traits: AssignedTraitsFromCategories;
}

export interface AssignedTraitsFromCategories {
  [categoryName: string]: string;
}
