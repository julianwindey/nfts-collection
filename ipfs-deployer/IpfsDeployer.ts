import fs from "fs";
import path from "path";
import { IPFS } from "ipfs-core";
import { NFTStorage, File, Blob } from "nft.storage";

import {
  AssignedTraitsFromCategories,
  AssignedTraitsOnNFT,
} from "../traits-setter/types";

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  image_mimetype: string;
  properties: AssignedTraitsFromCategories;
}

export default class IPFSDeployer {
  constructor(
    private readonly assignedTraitsOnNFTs: AssignedTraitsOnNFT[],
    private readonly imagesDirectory: string,
    private metadataTemplate: NFTMetadata,
    private readonly IPFSInstance: IPFS,
    private readonly NFTStorageInstance: NFTStorage
  ) {}

  async deploy() {
    const metadataIPFSPathsPromises = this.getNFTsMetadataIPFSPath();
    const metadataIPFSPaths = await Promise.all(metadataIPFSPathsPromises);
    return metadataIPFSPaths;
  }

  private getNFTsMetadataIPFSPath() {
    const metadataIPFSPathsPromises = this.assignedTraitsOnNFTs.map(
      async (assignedTraitsOnNFT) =>
        this.getNFTMetadataIPFSPath(assignedTraitsOnNFT)
    );
    // const metadataIPFSPathsPromises = [
    //   this.getNFTMetadataIPFSPath(this.assignedTraitsOnNFTs[0]),
    // ];
    return metadataIPFSPathsPromises;
  }

  private async getNFTMetadataIPFSPath(
    assignedTraitsOnNFT: AssignedTraitsOnNFT
  ) {
    const NFTIndex = assignedTraitsOnNFT.ID;
    const NFTImageIPFSPath = await this.deployNFTImage(NFTIndex);
    const NFTMetadata = this.composeNFTMetadataWithTraitsAndImage(
      assignedTraitsOnNFT,
      NFTImageIPFSPath
    );
    const metadataPathIPFS = await this.deployMetadataAsJSON(NFTMetadata);
    return "ipfs.io/ipfs/" + metadataPathIPFS;
  }

  private async deployNFTImage(NFTIndex: number) {
    const imagePath = `${this.imagesDirectory}${NFTIndex}.png`;
    const file = fs.readFileSync(imagePath);
    // const imag: BlobPart = new Blob(file);
    // const img = new File(file, NFTIndex + ".png", { type: "img/png" });
    const { path } = await this.IPFSInstance.add(file);
    return path;
  }

  private composeNFTMetadataWithTraitsAndImage(
    assignedTraitsOnNFT: AssignedTraitsOnNFT,
    imagePathIPFS: string
  ) {
    const NFTIndex = assignedTraitsOnNFT.ID;
    const NFTMetadata = JSON.parse(
      JSON.stringify(this.metadataTemplate)
    ) as NFTMetadata;

    NFTMetadata.name = `Pack ${NFTIndex}`;
    NFTMetadata.image = "ipfs.io/ipfs/" + imagePathIPFS;
    NFTMetadata.properties = assignedTraitsOnNFT.traits;

    return NFTMetadata;
  }

  private async deployMetadataAsJSON(metadataNFT: NFTMetadata) {
    const NFTMetadataJSON = JSON.stringify(metadataNFT);
    const { path } = await this.IPFSInstance.add(NFTMetadataJSON);
    return path as string;
  }
}
