import sharp, { OverlayOptions } from "sharp";
import ImageComposer from "./ImageComposer";

export default class SharpImageComposer implements ImageComposer {
  constructor(
    private readonly pixelsWidth: number,
    private readonly pixelsHeight: number
  ) {}

  async composeInputsImagesIntoOutput(
    inputs: string[],
    output: string
  ): Promise<string> {
    const pngSharp = this.pngSharpFactory();
    const imagesOverlayOptions = this.generateImagesOverlayOptions(inputs);
    await pngSharp.composite(imagesOverlayOptions).toFile(output);
    return output;
  }

  private pngSharpFactory() {
    return sharp({
      create: {
        width: this.pixelsWidth,
        height: this.pixelsHeight,
        channels: 3,
        background: { r: 255, g: 255, b: 255 },
      },
    }).png();
  }

  private generateImagesOverlayOptions(inputs: string[]): OverlayOptions[] {
    const imagesOverlayOptions: OverlayOptions[] = [];
    for (let input of inputs) {
      imagesOverlayOptions.push({ input, left: 0, top: 0 });
    }
    return imagesOverlayOptions;
  }
}
