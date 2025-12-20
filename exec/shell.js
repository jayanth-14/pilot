export function runShell(command) {
  if (!command || !command.trim()) {
    console.error("Refusing to execute empty command");
    Deno.exit(1);
  }

  const proc = new Deno.Command("zsh", {
    args: ["-c", command],
    stdout: Deno.stdout.rid,
    stderr: Deno.stderr.rid,
    stdin: Deno.stdin.rid,
  });

  proc.outputSync();
}

