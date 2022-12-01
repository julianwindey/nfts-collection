import categoriesDistributionsTemplate from "./categories-distributions-template.js";
import ImageComposer from "./image-composer/ImageComposer.js";
import IPFSDeployer, { NFTMetadata } from "./ipfs-deployer/IpfsDeployer.js";
import TraitsSetter from "./traits-setter/TraitsSetter.js";
import { create } from "ipfs-core";
import { NFTStorage, File } from "nft.storage";

async function generateCollection() {
  const NFT_STORAGE_KEY = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFiRjk3QTYyM2Q4MzcyMEU1NDEzQjkyOWIzMDVjNDg5OWIzNTI5RkYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2OTc2MDQzMTYyMywibmFtZSI6IkFsZ28gc2t1bGxzIHRlc3QgY29sbGVjdGlvbiJ9.e5rPlOfljbLf_knPeOGEKLiiyEf5Wrh_Lhc4ALFYyl0",
  };
  const NFTStorageInstance = new NFTStorage(NFT_STORAGE_KEY);

  const metadataTemplate: NFTMetadata = {
    name: "",
    description: "Trantorian official pack",
    image: "",
    image_mimetype: "img/png",
    properties: {},
  };

  const traitsSetter = new TraitsSetter(60, categoriesDistributionsTemplate);
  traitsSetter.setTraits();
  const imageComposer = new ImageComposer(traitsSetter.assignedTraitsOnNFTs);
  imageComposer.compose();

  const ipfs = await create();
  const ipfsDeployer = new IPFSDeployer(
    traitsSetter.assignedTraitsOnNFTs,
    "./media/processed-images/",
    metadataTemplate,
    ipfs,
    NFTStorageInstance
  );
  const paths = await ipfsDeployer.deploy();

  console.log(paths);
}

generateCollection();
