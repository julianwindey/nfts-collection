import { CategoryDistribution, TraitFrequency } from "./types";

export default class UnassignedTraitsInCategory {
  public readonly categoryName: string;
  public readonly availableTraitsBeforeAssignment: number;
  private unassignedTraitsFrequencies: TraitFrequency[];
  private ASSIGNMENT_ENDED_ERROR_MESSAGE: string;

  constructor(categoryDistribution: CategoryDistribution) {
    this.categoryName = categoryDistribution.categoryName;
    this.unassignedTraitsFrequencies = categoryDistribution.traitsFrequencies;
    this.availableTraitsBeforeAssignment =
      UnassignedTraitsInCategory.computeAvailableTraitsBeforeAssignment(
        categoryDistribution
      );
    this.ASSIGNMENT_ENDED_ERROR_MESSAGE = `No more traits to assign at category ${this.categoryName}.`;
  }

  private static computeAvailableTraitsBeforeAssignment(
    categoryDistribution: CategoryDistribution
  ) {
    let availableTraitsBeforeAssignment = 0;
    categoryDistribution.traitsFrequencies.forEach((traitFrequency) => {
      availableTraitsBeforeAssignment += traitFrequency.frequency;
    });
    return availableTraitsBeforeAssignment;
  }

  consumeRandomTraitName(): string | never {
    if (this.assignmentEnded())
      throw new Error(this.ASSIGNMENT_ENDED_ERROR_MESSAGE);

    const randomTraitIndex = this.chooseRandomTraitIndex();
    const traitName =
      this.unassignedTraitsFrequencies[randomTraitIndex].traitName;
    this.reduceTraitAvailability(randomTraitIndex);
    return traitName;
  }

  assignmentEnded(): boolean {
    const ended = this.unassignedTraitsFrequencies.length === 0;
    return ended;
  }

  private chooseRandomTraitIndex(): number {
    const availableTraitsAmount = this.unassignedTraitsFrequencies.length;
    const traitIndex = this.chooseRandomIntLowerThan(availableTraitsAmount);
    return traitIndex;
  }

  private chooseRandomIntLowerThan(maxInt: number): number {
    const floatingIndex = Math.random() * maxInt;
    const roundedIndex = Math.floor(floatingIndex);
    return roundedIndex;
  }

  private reduceTraitAvailability(traitIndex: number) {
    const trait = this.unassignedTraitsFrequencies[traitIndex];
    trait.frequency--;
    if (trait.frequency === 0) this.removeTrait(traitIndex);
  }

  private removeTrait(traitIndex: number) {
    this.unassignedTraitsFrequencies.splice(traitIndex, 1);
  }
}
