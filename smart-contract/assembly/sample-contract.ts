/* Music sample contract implementation for Art-Fineurs 
 * using Massa Labs SDK
 * */

import { Storage, generateEvent, Args, Address } from "@massalabs/massa-as-sdk";
// import { JSON } from "json-as/assembly";

class Sample {
  ownerIndex: number;
  uri: string;
  parentsAuthorsIndexes: Array<number>;
  parentsUrisIndexes: Array<number>;
  childrenAuthorsIndexes: Array<number>;
  childrenUrisIndexes: Array<number>;

  constructor(ownerIndex: number, uri: string, parentsAuthorsIndexes: Array<number> = new Array<number>(), parentsUrisIndexes: Array<number> = new Array<number>(), childrenAuthorsIndexes: Array<number> = new Array<number>(), childrenUrisIndexes: Array<number> = new Array<number>()) {
    this.ownerIndex = ownerIndex;
    this.uri = uri;
    this.parentsAuthorsIndexes = parentsAuthorsIndexes;
    this.parentsUrisIndexes = parentsUrisIndexes;
    this.childrenAuthorsIndexes = childrenAuthorsIndexes;
    this.childrenUrisIndexes = childrenUrisIndexes;
  }

  addChild(childAuthorIndex: number, childUriIndex: number): void {
    this.childrenAuthorsIndexes.push(childAuthorIndex);
    this.childrenUrisIndexes.push(childUriIndex);
  }

  toString(): string {
    return this.ownerIndex + ","
      + this.uri + ","
      + this.parentsAuthorsIndexes.length + ","
      + this.parentsAuthorsIndexes + ","
      + this.parentsUrisIndexes + ","
      + this.childrenAuthorsIndexes.length + ","
      + this.childrenAuthorsIndexes + ","
      + this.childrenUrisIndexes;
  }

  static fromString(str: string): Sample {
    let parts = str.split(",");
    let ownerIndex = parseInt(parts[0]);
    let uri = parts[1];
    let parentsLength = parseInt(parts[2]);
    let parentsAuthorsIndexes = new Array<number>();
    for (let i = 0; i < parentsLength; i++) {
      parentsAuthorsIndexes.push(parseInt(parts[3 + i]));
    }
    let parentsUrisIndexes = new Array<number>();
    for (let i = 0; i < parentsLength; i++) {
      parentsUrisIndexes.push(parseInt(parts[3 + parentsLength + i]));
    }
    let childrenLength = parseInt(parts[3 + 2 * parentsLength]);
    let childrenAuthorsIndexes = new Array<number>();
    for (let i = 0; i < childrenLength; i++) {
      childrenAuthorsIndexes.push(parseInt(parts[4 + 2 * parentsLength + i]));
    }
    let childrenUrisIndexes = new Array<number>();
    for (let i = 0; i < childrenLength; i++) {
      childrenUrisIndexes.push(parseInt(parts[4 + 2 * parentsLength + childrenLength + i]));
    }
    return new Sample(ownerIndex, uri, parentsAuthorsIndexes, parentsUrisIndexes, childrenAuthorsIndexes, childrenUrisIndexes);
  }
}

export function initialize(_args: string): void {
  Storage.set("sample_count", "0");
  Storage.set("Authors", new Array<String>().toString());
}

export function createSample(_args: string): void {
  let sample_count = parseInt(Storage.get("sample_count"));

  // Increment the sample count
  sample_count += 1;
  Storage.set("sample_count", sample_count.toString());

  let args_object = new Args(_args);

  let author = args_object.nextString();
  let uri = args_object.nextString();

  // let sample = new Sample(0, "test", [0], [0]);
  // JSON.stringify(sample);

  if (sample_count == 1) {
    let sample_array = new Array<string>();
    sample_array.push(uri);
    Storage.set(author, sample_array.toString());
    return;
  }

  // Check if the author already exists in the storage
  let author_samples: Array<string> = Storage.get(author).split(',');


  // If the author does not exist, create a new sample
  if (author_samples == null) {
    Storage.set(author, new Array<string>().push(uri).toString());
  }
  else {
    author_samples.push(uri);
    Storage.set(author, author_samples.toString());
  }

  // Generate an event
  generateEvent("SampleCreated: " + author.toString() + " - " + uri.toString());
}
