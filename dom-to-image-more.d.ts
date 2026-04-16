declare module "dom-to-image-more" {
  const domtoimage: {
    toBlob(node: Node, options?: { scale?: number }): Promise<Blob>;
    toPng(node: Node, options?: { scale?: number }): Promise<string>;
  };
  export default domtoimage;
}
