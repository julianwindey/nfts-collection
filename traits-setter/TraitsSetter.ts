import UnassignedTraitsInCategory from "./UnassignedTraitsInCategory.js";
import { AssignedTraitsOnNFT, CategoryDistribution } from "./types.js";

export default class TraitsSetter {
  private unassignedTraitsInCategories: UnassignedTraitsInCategory[];
  private _assignedTraitsOnNFTs: AssignedTraitsOnNFT[] = [];

  constructor(
    public readonly size: number,
    categoriesDistributions: CategoryDistribution[]
  ) {
    this.unassignedTraitsInCategories = categoriesDistributions.map(
      (category) => new UnassignedTraitsInCategory(category)
    );
    this.validateCategoriesDistributionsForSize(size);
  }

  private validateCategoriesDistributionsForSize(size: number): void {
    this.unassignedTraitsInCategories.forEach((categoryDistribution) => {
      if (categoryDistribution.availableTraitsBeforeAssignment !== size)
        TraitsSetter.throwMalformedCategoryDistributionError(
          categoryDistribution.categoryName
        );
    });
  }

  private static throwMalformedCategoryDistributionError(
    categoryDistributionName: string
  ): never {
    throw new Error(
      `Category ${categoryDistributionName} has a different amount of traits available than the desired size of the collection to be created.`
    );
  }

  setTraits(): void | never {
    if (this.haveTraitsBeenSetted())
      throw new Error("Cateogry already generated");

    for (let ID = 0; ID < this.size; ID++) {
      this.setTraitsOnNFT(ID);
    }
  }

  haveTraitsBeenSetted() {
    const hasBeenGenerated = this._assignedTraitsOnNFTs.length > 0;
    return hasBeenGenerated;
  }

  private setTraitsOnNFT(ID: number): void | never {
    this._assignedTraitsOnNFTs.push({
      ID,
      traits: {},
    });
    this.assignRandomTraitFromEachCategoryToNFT(ID);
  }

  private assignRandomTraitFromEachCategoryToNFT(ID: number): void | never {
    for (let traitsInCategory of this.unassignedTraitsInCategories) {
      const categoryName = traitsInCategory.categoryName;
      const randomTraitName = traitsInCategory.consumeRandomTraitName();
      this._assignedTraitsOnNFTs[ID].traits[categoryName] = randomTraitName;
    }
  }

  get assignedTraitsOnNFTs() {
    return this._assignedTraitsOnNFTs;
  }
}
