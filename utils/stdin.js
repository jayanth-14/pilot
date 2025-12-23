/* 
Reads all data from stdin (piped data, redirections, etc.)
Returns an empty string if no data is available.
*/

export const readStdin = async () => {
  // Implementing early exit in case its in interactive mode.
  if (Deno.stdin.isTerminal()) return '';

  return 'Not in interactive mode';
}

console.log(await readStdin());
