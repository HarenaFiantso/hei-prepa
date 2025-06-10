import { SnakeGameApp } from "../SnakeGameApp.ts";

export abstract class GameState {
  constructor(protected readonly game: SnakeGameApp) {
  }

  public abstract update(): Promise<void>;
  public abstract render(): void;
}
