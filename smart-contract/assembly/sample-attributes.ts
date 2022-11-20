export class SampleAttributes {
  parents: Map<string, Array<string>>;
  children: Map<string, Array<string>>;
  download_count: number;

  constructor(parents: Map<string, Array<string>> = new Map<string, Array<string>>()) {
    this.parents = parents;
    this.children = new Map<string, Array<string>>();
    this.download_count = 0;
  }

  addChild(parent: string, uri: string): void {
    let uris = this.children.get(parent);
    if (uris == null) {
      this.children.set(parent, [uri]);
    }
    else {
      uris.push(uri);
      this.children.set(parent, uris);
    }
  }

  toString(): string {
    return JSON.stringify({
      parents: this.parents,
      children: this.children,
      download_count: this.download_count,
    });
  }
}