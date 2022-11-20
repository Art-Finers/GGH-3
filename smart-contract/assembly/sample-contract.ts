/* Music sample contract implementation for Art-Fineurs 
 * using Massa Labs SDK
 * */
import { Storage, generateEvent, Args, Address } from "@massalabs/massa-as-sdk";

export function initialize(_args : string): void {
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
