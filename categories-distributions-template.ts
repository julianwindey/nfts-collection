import { CategoryDistribution } from "./types/types";

const categoriesDistributionsTemplate: CategoryDistribution[] = [
  {
    categoryName: "Background",
    traitsFrequencies: [
      {
        traitName: "Blue",
        frequency: 20,
      },
      {
        traitName: "Green",
        frequency: 20,
      },
      {
        traitName: "Red",
        frequency: 20,
      },
    ],
  },
  {
    categoryName: "BackgroundItem",
    traitsFrequencies: [
      {
        traitName: "Abstract",
        frequency: 40,
      },
      {
        traitName: "Clouds",
        frequency: 17,
      },
      {
        traitName: "Planets",
        frequency: 3,
      },
    ],
  },
  {
    categoryName: "Base",
    traitsFrequencies: [
      {
        traitName: "BoneBowl",
        frequency: 15,
      },
      {
        traitName: "BoneFull",
        frequency: 20,
      },
      {
        traitName: "RubyBowl",
        frequency: 1,
      },
      {
        traitName: "RubyFull",
        frequency: 4,
      },
      {
        traitName: "SapphireBowl",
        frequency: 6,
      },
      {
        traitName: "SapphireFull",
        frequency: 14,
      },
    ],
  },
  {
    categoryName: "Ears",
    traitsFrequencies: [
      {
        traitName: "Pencil",
        frequency: 50,
      },
      {
        traitName: "Window",
        frequency: 10,
      },
    ],
  },

  {
    categoryName: "Eyes",
    traitsFrequencies: [
      {
        traitName: "Emerald",
        frequency: 50,
      },
      {
        traitName: "Marble",
        frequency: 1,
      },
      {
        traitName: "Raptor",
        frequency: 9,
      },
    ],
  },
];

export default categoriesDistributionsTemplate;
