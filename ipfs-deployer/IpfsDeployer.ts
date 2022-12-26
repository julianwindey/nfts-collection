import NftMetadata from "../nft-metadata/NftMetadata";

type IpfsDeployer = {
  addImage(imagePath: string): Promise<string>;
  addMetadata(nftMetadata: NftMetadata): Promise<string>;
};

export default IpfsDeployer;
