import { GameState } from "./GameState.ts";

export class MenuState extends GameState {
  public async update(): Promise<void> {
    const choice = (await this.askQuestion("New game? (y/n) :")).trim()
      .toLowerCase();

    if (choice === "y") {
      console.log("The game is starting");
    } else if (choice === "n") {
      Deno.exit(0);
    } else {
      console.log("Invalid choice. Please enter 'y' or 'n'");
      await this.update();
    }
  }

  public render() {
    console.log("Welcome to this snake game made by Fiantso Harena\n");
  }

  private async askQuestion(query: string): Promise<string> {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode(query));
    const n = <number> await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n)).trim();
  }
}
