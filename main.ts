import SharpImageComposer from "./image-composer/SharpImageComposer.js";
import HttpClientIpfsDeployer from "./ipfs-deployer/HttpClientIpfsDeployer.js";
import categoriesDistributionsTemplate from "./categories-distributions-template.js";
import CollectionBuilder from "./collection-builder/CollectionBuilder.js";

const COLLECTION_SIZE = 60;
const LAYER_IMAGES_DIRECTORY = "./media/algoskulls/";
const COMPOSED_IMAGES_OUTPUT_DIRECTORY = "./media/processed-images/";
const nftCollectionBuilder = new CollectionBuilder(
  COLLECTION_SIZE,
  LAYER_IMAGES_DIRECTORY,
  COMPOSED_IMAGES_OUTPUT_DIRECTORY,
  categoriesDistributionsTemplate
);

const sharpComposer = new SharpImageComposer(1872, 1872);
const host = "127.0.0.1";
const port = 5001;
const authorization = "CAESIHRt0mBcoweEnM84UQ8A/WfNJp/KQmjNbgv6zrJBPoq5";
const httpClientIpfsDeployer = new HttpClientIpfsDeployer(
  host,
  port,
  authorization
);
nftCollectionBuilder.build(sharpComposer, httpClientIpfsDeployer);
