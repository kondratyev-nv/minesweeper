import Field from 'Field';
import { expect } from 'chai';

describe("Field", () => {
    it("uses random to generate tiles when created", () => {
        let timesRandomCalled = 1;
        let f = Field(4, 5, 2, (from, to) => timesRandomCalled++);
        expect(timesRandomCalled).to.be.equal(5);
        expect(f.width()).to.be.equal(4);
        expect(f.height()).to.be.equal(5);
        expect(f.numberOfMines()).to.be.equal(2);
        let expectedField = [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, -1, 1, 0],
            [1, 1, 2, 1],
            [0, 0, 1, -1]
        ];
        for (let y = 0; y < f.height(); ++y) {
            for (let x = 0; x < f.width(); ++x) {
                let t = f.at(x, y);
                expect(t.isOpened()).to.be.false;
                expect(t.isMarked()).to.be.false;
                expect(t.value).to.be.eq(expectedField[y][x]);
            }
        }
    });
    it("can return neighbors of specific cell", () => {
        let timesRandomCalled = 1;
        let f = Field(4, 5, 2, (from, to) => timesRandomCalled++);
        expect(timesRandomCalled).to.be.equal(5);
        expect(f.width()).to.be.equal(4);
        expect(f.height()).to.be.equal(5);
        expect(f.numberOfMines()).to.be.equal(2);
        let expectedNeighbors = [0, 0, 0, 1, 1, 1, -1, 1];
        let actualNeighbors = f.getNeighborsOf(1, 1).sort((t1, t2) => {
            if (t1.y == t2.y) {
                return t1.x - t2.x;
            }
            return t1.y - t2.y;
        });
        expect(actualNeighbors.length).to.be.eq(expectedNeighbors.length);
        for (let i = 0; i < expectedNeighbors.length; ++i) {
            expect(actualNeighbors[i].value).to.be.eq(expectedNeighbors[i]);
        }
    });
    it("can return neighbors for cell on the corner", () => {
        let timesRandomCalled = 1;
        let f = Field(4, 5, 2, (from, to) => timesRandomCalled++);
        expect(timesRandomCalled).to.be.equal(5);
        expect(f.width()).to.be.equal(4);
        expect(f.height()).to.be.equal(5);
        expect(f.numberOfMines()).to.be.equal(2);
        let expectedNeighbors = [2, 1, 1];
        let actualNeighbors = f.getNeighborsOf(3, 4).sort((t1, t2) => {
            if (t1.y == t2.y) {
                return t1.x - t2.x;
            }
            return t1.y - t2.y;
        });
        expect(actualNeighbors.length).to.be.eq(expectedNeighbors.length);
        for (let i = 0; i < expectedNeighbors.length; ++i) {
            expect(actualNeighbors[i].value).to.be.eq(expectedNeighbors[i]);
        }
    });
    it("can return neighbors for cell on the border", () => {
        let timesRandomCalled = 1;
        let f = Field(4, 5, 2, (from, to) => timesRandomCalled++);
        expect(timesRandomCalled).to.be.equal(5);
        expect(f.width()).to.be.equal(4);
        expect(f.height()).to.be.equal(5);
        expect(f.numberOfMines()).to.be.equal(2);
        let expectedNeighbors = [1, 0, 1, 2, 1];
        let actualNeighbors = f.getNeighborsOf(3, 2).sort((t1, t2) => {
            if (t1.y == t2.y) {
                return t1.x - t2.x;
            }
            return t1.y - t2.y;
        });
        expect(actualNeighbors.length).to.be.eq(expectedNeighbors.length);
        for (let i = 0; i < expectedNeighbors.length; ++i) {
            expect(actualNeighbors[i].value).to.be.eq(expectedNeighbors[i]);
        }
    });
    it("does not place mines on same position", () => {
        let timesRandomCalled = 0;
        let f = Field(4, 5, 2, (from, to) => {
            timesRandomCalled++;
            if (timesRandomCalled == 1) {
                return 1;
            } else if (timesRandomCalled == 2) {
                return 2;
            } else if (timesRandomCalled == 3) {
                return 1;
            } else if (timesRandomCalled == 4) {
                return 2;
            } else if (timesRandomCalled == 5) {
                return 2;
            } else if (timesRandomCalled == 6) {
                return 3;
            }
        });
        expect(timesRandomCalled).to.be.equal(6);
        expect(f.width()).to.be.equal(4);
        expect(f.height()).to.be.equal(5);
        expect(f.numberOfMines()).to.be.equal(2);
        let expectedField = [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, -1, 2, 1],
            [1, 2, -1, 1],
            [0, 1, 1, 1]
        ];
        for (let y = 0; y < f.height(); ++y) {
            for (let x = 0; x < f.width(); ++x) {
                let t = f.at(x, y);
                expect(t.isOpened()).to.be.false;
                expect(t.isMarked()).to.be.false;
                expect(t.value).to.be.eq(expectedField[y][x]);
            }
        }
    });
});
