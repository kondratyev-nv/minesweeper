import Tile from 'Tile';
import { expect } from 'chai';

describe("Tile", () => {
    it("is closed when created", () => {
        expect(Tile(1, 2, 1).isOpened()).to.be.false;
    });
    it("is not marked when created", () => {
        expect(Tile(1, 2, 1).isMarked()).to.be.false;
    });
    it("can return value", () => {
        expect(Tile(1, 2, 1).value).to.be.equals(1);
    });
    it("can return position", () => {
        var tile = Tile(1, 2, 1);
        expect(tile.x).to.be.equals(1);
        expect(tile.y).to.be.equals(2);
    });
    it("once open remains opened", () => {
        var tile = Tile(1, 2, 1);
        var value = tile.open();
        expect(tile.isOpened()).to.be.true;
        expect(value).to.be.equals(1);
    });
    it("can be marked and unmarked", () => {
        var tile = Tile(1, 2, 1);
        tile.mark();
        expect(tile.isMarked()).to.be.true;
        tile.unmark();
        expect(tile.isMarked()).to.be.false;
    });
    it("becomes unmarked once opened", () => {
        var tile = Tile(1, 2, 1);
        tile.mark();
        expect(tile.isMarked()).to.be.true;
        tile.open();
        expect(tile.isMarked()).to.be.false;
    });
});
