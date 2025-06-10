import { GameState } from "./GameState.ts";
import { RunningState } from "./RunningState.ts";

export class GameOverState extends GameState {
  public async update(): Promise<void> {
    const choice = await this.askQuestion("Game Over! Play again? (y/n): ");

    if (choice.toLowerCase() === "y") {
      this.game.reset();
      await this.game.setState(new RunningState(this.game));
    } else if (choice.toLowerCase() === "n") {
      Deno.exit(0);
    } else {
      console.log("Invalid choice. Please enter 'y' or 'n'.");
      await this.update();
    }
  }

  public render(): void {
    console.log(`--- GAME OVER ---`);
    console.log(`Final Score: ${this.game.getScore()}`);
  }

  private async askQuestion(query: string): Promise<string> {
    const buf = new Uint8Array(1024);
    await Deno.stdout.write(new TextEncoder().encode(query));
    const n = <number> await Deno.stdin.read(buf);
    return new TextDecoder().decode(buf.subarray(0, n)).trim();
  }
}
