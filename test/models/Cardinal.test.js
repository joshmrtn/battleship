import { Cardinal } from "#models/Cardinal.js";

describe("class Cardinal", () => {
  it("provides static access to cardinal directions", () => {
    expect(Cardinal.NORTH).toBe("NORTH");
    expect(Cardinal.SOUTH).toBe("SOUTH");
    expect(Cardinal.EAST).toBe("EAST");
    expect(Cardinal.WEST).toBe("WEST");
    let ship1Direction = Cardinal.NORTH;
    let ship2Direction = Cardinal.WEST;
    let ship3Direction = Cardinal.WEST;
    expect(ship1Direction != ship2Direction).toBe(true);
    expect(ship1Direction).toBe("NORTH");
    expect(ship2Direction).toBe("WEST");
    expect(ship2Direction === ship3Direction).toBe(true);
  });
});
