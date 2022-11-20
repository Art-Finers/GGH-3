/* Music sample contract implementation for Art-Fineurs 
 * using Massa Labs SDK
 * */

import { Storage, generateEvent, Args, Address } from "@massalabs/massa-as-sdk";
import { JSON } from "json-as/assembly";

class Sample {
  id: number;
  ownerIndex: number;
  uri: string;
  parentsAuthorsIndexes: Array<number>;
  parentsUrisIndexes: Array<number>;
  childrenAuthorsIndexes: Array<number>;
  childrenUrisIndexes: Array<number>;

  constructor(id: number, ownerIndex: number, uri: string, parentsAuthorsIndexes: Array<number> = new Array<number>(), parentsUrisIndexes: Array<number> = new Array<number>(), childrenAuthorsIndexes: Array<number> = new Array<number>(), childrenUrisIndexes: Array<number> = new Array<number>()) {
    this.id = id;
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
}

export function initialize(_args: string): void {
  Storage.set("sample_count", "0");
  Storage.set("authors", new Array<String>().toString());
}

export function createSample(_args: string): void {
  let sample_count = parseInt(Storage.get("sample_count"));
  let authors = JSON.parse(Storage.get("authors")) as Array<string>;

  // Increment the sample count
  sample_count += 1;
  Storage.set("sample_count", sample_count.toString());

  // Get sample data from args
  let args_object = new Args(_args);
  let author = args_object.nextString();
  let uri = args_object.nextString();
  let parents_authors_json = args_object.nextString();
  let parents_uris_json = args_object.nextString();
  let parents_authors_indexes = JSON.parse(parents_authors_json) as Array<number>;
  let parents_uris_indexes = JSON.parse(parents_uris_json) as Array<number>;

  // Get the author index
  let author_index = authors.indexOf(author);

  // If the author is not in the list
  if (author_index == -1) {
    // Deduce its index
    author_index = authors.length;

    // Add it
    authors.push(author);

    // Save the list
    Storage.set("authors", JSON.stringify(authors));
  }

  // Get the author's samples
  let author_samples = JSON.parse(Storage.get(author)) as Array<Sample>;

  // Check if the author already exists in the storage
  if (author_samples == null) {
    // If the author does not exist, create a new sample array
    author_samples = new Array<Sample>();
  }

  // Deduce the sample index
  let sample_index = author_samples.length;

  // Create the sample
  let sample = new Sample(sample_index, author_index, uri, parents_authors_indexes, parents_uris_indexes);

  // Add the sample to the author's samples
  author_samples.push(sample);

  // Store the author's samples
  Storage.set(author, JSON.stringify(author_samples));

  // Update the parents' children
  for (let i = 0; i < parents_authors_indexes.length; i++) {
    // Get the parent author
    let parent_author = authors[parents_authors_indexes[i]];

    // Get the parent author's samples
    let parent_author_samples = JSON.parse(Storage.get(parent_author)) as Array<Sample>;

    // Get the parent sample
    let parent_sample = parent_author_samples[parents_uris_indexes[i]];

    // Add the child to the parent
    parent_sample.addChild(author_index, author_samples.length - 1);

    // Store the parent author's samples
    Storage.set(parent_author, JSON.stringify(parent_author_samples));
  }

  // Generate an event
  generateEvent("SampleCreated: " + JSON.stringify(sample) + " / Storage: " + JSON.stringify(Storage));
}
