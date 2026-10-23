import { Point } from "#models/Point.js";
describe("class Point", () => {
  let point;
  beforeEach(() => {
    point = new Point(1, 1);
  });
  it("has x and y properties", () => {
    expect(point.x).toBe(1);
    expect(point.y).toBe(1);
  });
  it("implements isEqual() method", () => {
    let point1 = new Point(1, 2);
    let point2 = new Point(2, 2);
    let point3 = new Point(1, 1);
    let point4 = new Point(4, 4);
    let point5 = new Point(1, 1);
    expect(point1.isEqual(point2)).toBe(false);
    expect(point3.isEqual(point5)).toBe(true);
    expect(point4.isEqual(point5)).toBe(false);
  });
});
