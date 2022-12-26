import UnassignedTraitsInCategory from "./UnassignedTraitsInCategory.js";
import {
  AssignedTraitsFromCategories,
  AssignedTraitsOnNft,
  CategoryDistribution,
} from "../types/types";

export default function setTraitsOnCollection(
  collectionSize: number,
  categoriesDistributions: CategoryDistribution[]
): AssignedTraitsOnNft[] | never {
  const unassignedTraitsInCategories =
    categoriesDistributionsIntoUnassignedTraits(categoriesDistributions);
  validateCategoriesDistributionsForSize(
    unassignedTraitsInCategories,
    collectionSize
  );
  const assignedTraitsOnNfts: AssignedTraitsOnNft[] = distributeTraitsOnNfts(
    collectionSize,
    unassignedTraitsInCategories
  );
  return assignedTraitsOnNfts;
}

function categoriesDistributionsIntoUnassignedTraits(
  categoriesDistributions: CategoryDistribution[]
): UnassignedTraitsInCategory[] | never {
  const unassignedTraitsInCategories = categoriesDistributions.map(
    (category) => new UnassignedTraitsInCategory(category)
  );
  return unassignedTraitsInCategories;
}

function validateCategoriesDistributionsForSize(
  unassignedTraitsInCategories: UnassignedTraitsInCategory[],
  collectionSize: number
): void | never {
  unassignedTraitsInCategories.forEach((categoryDistribution) => {
    if (categoryDistribution.availableTraitsBeforeAssignment !== collectionSize)
      throwMalformedCategoryDistributionError(
        categoryDistribution.categoryName
      );
  });
}

function throwMalformedCategoryDistributionError(
  categoryDistributionName: string
): never {
  throw new Error(
    `Category ${categoryDistributionName} has a different amount of traits available than the desired size of the collection to be created.`
  );
}

function distributeTraitsOnNfts(
  collectionSize: number,
  unassignedTraitsInCategories: UnassignedTraitsInCategory[]
): AssignedTraitsOnNft[] | never {
  const assignedTraitsOnNfts: AssignedTraitsOnNft[] = [];
  for (let nftId = 0; nftId < collectionSize; nftId++) {
    const assignedTraits = assignTraitsOnNft(unassignedTraitsInCategories);
    assignedTraitsOnNfts.push({
      nftId,
      assignedTraits,
    });
  }
  return assignedTraitsOnNfts;
}

function assignTraitsOnNft(
  unassignedTraitsInCategories: UnassignedTraitsInCategory[]
): AssignedTraitsFromCategories | never {
  const assignedTraits = {};
  for (let traitsInCategory of unassignedTraitsInCategories) {
    const categoryName = traitsInCategory.categoryName;
    const randomTraitName = traitsInCategory.consumeRandomTrait();
    assignedTraits[categoryName] = randomTraitName;
  }
  return assignedTraits;
}
