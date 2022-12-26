import fs from "fs";
import { create } from "ipfs-http-client";
import { IPFS } from "ipfs-core-types";
import NftMetadata from "../nft-metadata/NftMetadata";
import IpfsDeployer from "./IpfsDeployer";

export default class HttpClientIpfsDeployer implements IpfsDeployer {
  ipfs: IPFS;
  constructor(host: string, port: number, authorization: string) {
    this.ipfs = create({
      host,
      port,
      headers: { authorization },
    });
  }

  async addImage(imagePath: string): Promise<string> {
    const file = fs.readFileSync(imagePath);
    const cid = (await this.ipfs.add(file)).path;
    return cid;
  }

  async addMetadata(nftMetadata: NftMetadata): Promise<string> {
    const stringifiedNftMetadata = JSON.stringify(nftMetadata);
    const cid = (await this.ipfs.add(stringifiedNftMetadata)).path;
    return cid;
  }
}
