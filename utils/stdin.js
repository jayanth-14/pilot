/* 
Reads all data from stdin (piped data, redirections, etc.)
Returns an empty string if no data is available.
*/

export const readStdin = async () => {
  // Implementing early exit in case its in interactive mode.
  if (Deno.stdin.isTerminal()) return '';

  const decoder = new TextDecoder();
  let input = '';
  
  // decoding each chunk from the input stream
  for await(const chunk of Deno.stdin.readable) {
    input += decoder.decode(chunk, { stream : true });
  }
  // flushing any reamaing bytes
  input += decoder.decode();

  return input;
}

