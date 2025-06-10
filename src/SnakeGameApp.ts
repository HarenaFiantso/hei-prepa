import figlet from "npm:figlet";
import { GameState } from "./states/GameState.ts";
import { MenuState } from "./states/MenuState.ts";

export class SnakeGameApp {
  private state: GameState;

  constructor() {
    this.state = new MenuState(this);
  }

  public async setState(newState: GameState) {
    this.state = newState;
    await this.runGameLoop();
  }

  public run(): void {
    figlet("Snake Game!", (err: unknown, data: string | undefined) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
      this.runGameLoop().catch((error) =>
        console.log(`The game is not looping: ${error}`)
      );
    });
  }

  private async runGameLoop(): Promise<void> {
    try {
      this.state.render();
      await this.state.update();
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error("Error in game loop:", error);
      Deno.exit(1);
    }
  }
}
