import setTraitsOnNftCollection from "../set-traits-on-collection/setTraitsOnCollection.js";
import ImageComposer from "../image-composer/ImageComposer.js";
import IpfsDeployer from "../ipfs-deployer/IpfsDeployer.js";
import { AssignedTraitsOnNft, CategoryDistribution } from "../types/types.js";
import NftMetadata from "../nft-metadata/NftMetadata.js";

export default class CollectionBuilder {
  private readonly assignedTraitsOnNfts: AssignedTraitsOnNft[];

  constructor(
    public readonly collectionSize: number,
    private readonly inputLayerImagesDirectory: string,
    private readonly outputComposedImagesDirectory: string,
    categoriesDistributions: CategoryDistribution[]
  ) {
    this.assignedTraitsOnNfts = setTraitsOnNftCollection(
      collectionSize,
      categoriesDistributions
    );
  }

  async build(imageComposer: ImageComposer, ipfsDeployer: IpfsDeployer) {
    await this.composeNftsImages(imageComposer);
    await this.deployImagesAndMetadatasToIpfs(ipfsDeployer);
  }

  private async composeNftsImages(imageComposer: ImageComposer) {
    for (let assignedTraitsOnNft of this.assignedTraitsOnNfts) {
      const nftId = assignedTraitsOnNft.nftId;
      const inputsPaths = this.getNftLayerImagesPaths(assignedTraitsOnNft);
      const outputPath = this.outputComposedImagesDirectory + nftId + ".png";
      await imageComposer.composeInputsImagesIntoOutput(
        inputsPaths,
        outputPath
      );
    }
  }

  private getNftLayerImagesPaths(assignedTraitsOnNft: AssignedTraitsOnNft) {
    const nftTraits = assignedTraitsOnNft.assignedTraits;
    const inputsPaths = [];
    for (let category in nftTraits) {
      const inputPath = `${this.inputLayerImagesDirectory}${category}/${nftTraits[category]}.png`;
      inputsPaths.push(inputPath);
    }
    return inputsPaths;
  }

  private async deployImagesAndMetadatasToIpfs(ipfsDeployer: IpfsDeployer) {
    const nftsMetadataCidsPromises = this.assignedTraitsOnNfts.map(
      async (assignedTraitsOnNft: AssignedTraitsOnNft) =>
        this.deployImageAndMetadataToIpfs(ipfsDeployer, assignedTraitsOnNft)
    );
    const nftsMetadataCids = await Promise.all(nftsMetadataCidsPromises);
    console.log(nftsMetadataCids);
  }

  private async deployImageAndMetadataToIpfs(
    ipfsDeployer: IpfsDeployer,
    assignedTraitsOnNft: AssignedTraitsOnNft
  ): Promise<string> {
    const nftId = assignedTraitsOnNft.nftId;
    const imagePath = this.outputComposedImagesDirectory + nftId + ".png";
    const imageCid = await ipfsDeployer.addImage(imagePath);
    const nftMetadata = new NftMetadata(
      nftId,
      imageCid,
      this.assignedTraitsOnNfts[nftId].assignedTraits
    );
    const nftMetadataCid = await ipfsDeployer.addMetadata(nftMetadata);
    return nftMetadataCid;
  }
}
