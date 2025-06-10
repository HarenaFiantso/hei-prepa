import figlet from "npm:figlet";

export class SnakeGameApp {
  run(): void {
    figlet("Snake Game!", (err: unknown, data: string | undefined) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    });
  }
}
