/* Music sample contract implementation for Art-Fineurs 
 * using Massa Labs SDK
 * */
import { Storage, generateEvent, Args, Address } from "@massalabs/massa-as-sdk";
import { SampleAttributes } from "./sample-attributes";



export function initialize(): void {
  Storage.set("sample_count", "0");
}

export function createSample(_args: string): void {
  let sample_count = parseInt(Storage.get("sample_count"));

  // Increment the sample count
  sample_count += 1;
  Storage.set("sample_count", sample_count.toString());

  let args_object = new Args(_args);

  let author = args_object.nextString();
  let uri = args_object.nextString();

  if (sample_count == 1) {
    let sample_map = new Map<string, SampleAttributes>();
    sample_map[uri] = new SampleAttributes();
    Storage.set(author, sample_map.toString());
    return;
  }

  let parents = new Map<string, Array<string>>();
  let len_parents = args_object.nextI32();
  for (let i = 0; i < len_parents; i++) {
    let parent_author = args_object.nextString();
    let len_uris = args_object.nextI32();
    let parent_uris = new Array<string>();

    // let parent_map: Map<string, SampleAttributes> = JSON.parse(Storage.get(parent_author));

    // To add child, we need to get the parent's map
    let keyValuePairs = Storage.get(parent_author).slice(1, -1) //remove first and last character
      .split(/\s*,\s*/)                     //split with optional spaces around the comma
      .map(chunk => chunk.split("="));      //split key=value

    // Cast to Map<string, SampleAttributes>
    let parent_map = new Map<string, SampleAttributes>();
    for (let i = 0; i < keyValuePairs.length; i++) {
      let key = keyValuePairs[i][0];
      let value = keyValuePairs[i][1];
      parent_map[key] = JSON.parse(value);
    }
    parent_map.toString();

    for (let j = 0; j < len_uris; j++) {
      let parent_uri = args_object.nextString();
      parent_uris.push(parent_uri);


      let parent_sample_attributes = parent_map[parent_uri];
      parent_sample_attributes.addChild(author, uri);
    }

    parents.set(parent_author, parent_uris);
  }

  let sample_attributes = new SampleAttributes(parents);
  let sample_map: Map<string, SampleAttributes> = new Map<string, SampleAttributes>();
  sample_map[uri] = sample_attributes;

  // Check if the author already exists in the storage
  let author_samples: Map<string, SampleAttributes> = JSON.parse(Storage.get(author));

  // If the author does not exist, create a new sample
  if (author_samples == null) {
    Storage.set(author, sample_map.toString());
  }
  else {
    author_samples[uri] = sample_attributes;
    Storage.set(author, author_samples.toString());
  }

  // Generate an event
  generateEvent("SampleCreated: " + author.toString() + " - " + uri.toString());
}
