export abstract class GameState {
  public abstract update(): Promise<void>;
  public abstract render(): void;
}
