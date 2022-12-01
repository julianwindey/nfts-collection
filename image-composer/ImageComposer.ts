import sharp, { OverlayOptions } from "sharp";
import { AssignedTraitsOnNFT } from "../traits-setter/types.js";

interface Locations {
  inputs: string[];
  output: string;
}

export default class ImageComposer {
  locations: Locations[] = [];
  constructor(assignedTraitsOnNFTs: AssignedTraitsOnNFT[]) {
    assignedTraitsOnNFTs.forEach((assignedTraitsOnNFT) => {
      const NFTIndex = assignedTraitsOnNFT.ID;
      const NFTTraits = assignedTraitsOnNFT.traits;

      this.locations[NFTIndex] = {
        inputs: [],
        output: `./media/processed-images/${NFTIndex}.png`,
      };

      for (let category in NFTTraits) {
        const layerImagePath = `./media/algoskulls/${category}/${NFTTraits[category]}.png`;
        this.locations[NFTIndex].inputs.push(layerImagePath);
      }
    });
  }

  compose() {
    this.locations.forEach((loc) => {
      this.composeWithLocations(loc);
    });
  }

  private composeWithLocations(locations: Locations) {
    const baseImageLocation = locations.inputs.shift();
    const sharpInstance = sharp(baseImageLocation);
    const overlayingImages = this.generateOverlayingOptions(locations.inputs);
    sharpInstance.composite(overlayingImages).toFile(locations.output);
  }

  private generateOverlayingOptions(inputs: string[]): OverlayOptions[] {
    const overlayingImages: OverlayOptions[] = [];
    for (let input of inputs) {
      overlayingImages.push({ input, left: 0, top: 0 });
    }
    return overlayingImages;
  }
}
