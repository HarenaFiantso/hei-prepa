export class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  public equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public toString(): string {
    return `(${this.x},${this.y})`;
  }
}
