import SharpImageComposer from "./image-composer/SharpImageComposer.js";
import HttpClientIpfsDeployer from "./ipfs-deployer/HttpClientIpfsDeployer.js";
import CollectionBuilder from "./collection-builder/CollectionBuilder.js";

const COLLECTION_SIZE = 60;
const LAYER_IMAGES_DIRECTORY = "./media/algoskulls/";
const COMPOSED_IMAGES_OUTPUT_DIRECTORY = "./media/processed-images/";
const CATEGORIES_DISTRIBUTIONS_INPUT_PATH = "./categories-distributions.js";

const sharpComposer = new SharpImageComposer(1872, 1872);

const HOST = "127.0.0.1";
const PORT = 5001;
const AUTHORIZATION = "CAESIHRt0mBcoweEnM84UQ8A/WfNJp/KQmjNbgv6zrJBPoq5";
const httpClientIpfsDeployer = new HttpClientIpfsDeployer(
  HOST,
  PORT,
  AUTHORIZATION
);

import(CATEGORIES_DISTRIBUTIONS_INPUT_PATH)
  .then((categoriesDistributions) => {
    const nftCollectionBuilder = new CollectionBuilder(
      COLLECTION_SIZE,
      LAYER_IMAGES_DIRECTORY,
      COMPOSED_IMAGES_OUTPUT_DIRECTORY,
      categoriesDistributions.default
    );
    return nftCollectionBuilder.build(sharpComposer, httpClientIpfsDeployer);
  })
  .then(() => {
    console.log("NFTs metadata IPFS CIDs written on output.json");
  })
  .catch(console.error);
