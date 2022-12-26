import { AssignedTraitsFromCategories } from "../types/types";

export default class NftMetadata {
  name: string;
  description = "Trantorian official pack";
  image_mimetype = "png";
  image: string;
  properties: AssignedTraitsFromCategories;
  constructor(
    nftId: number,
    imageIpfsCid: string,
    assignedTraits: AssignedTraitsFromCategories
  ) {
    this.name = "Pack" + nftId;
    this.image = "ipfs://" + imageIpfsCid;
    this.properties = assignedTraits;
  }
}
