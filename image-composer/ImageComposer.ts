type ImageComposer = {
  composeInputsImagesIntoOutput(
    inputs: string[],
    output: string
  ): Promise<string>;
};

export default ImageComposer;
