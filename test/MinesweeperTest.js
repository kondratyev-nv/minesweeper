import Field from 'Field';
import Minesweeper from 'Minesweeper';
import { expect } from 'chai';

describe("Minesweeper", () => {
    let g;
    let gameWonNotifyCounter = 0, mineFoundNotifyCounter = 0;
    beforeEach(() => {
        gameWonNotifyCounter = 0;
        mineFoundNotifyCounter = 0
        let timesRandomCalled = 1;
        g = new Minesweeper(
            Field(4, 5, 2, (from, to) => timesRandomCalled++)
        );
        g.onWin.add(() => gameWonNotifyCounter++);
        g.onMineFound.add(() => mineFoundNotifyCounter++);
    });
    it("initializes game from a field", () => {
        expect(g.width()).to.be.equal(4);
        expect(g.height()).to.be.equal(5);
        expect(g.getTotalMinesCount()).to.be.equal(2);
        expect(g.getMarkInfo().left).to.be.equal(2);
        expect(g.getMarkInfo().total).to.be.equal(2);
        g.checkComplete();
        expect(gameWonNotifyCounter).to.be.equal(0);
        expect(mineFoundNotifyCounter).to.be.equal(0);
        let expectedField = [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, -1, 1, 0],
            [1, 1, 2, 1],
            [0, 0, 1, -1]
        ];
        for (let y = 0; y < g.height(); ++y) {
            for (let x = 0; x < g.width(); ++x) {
                expect(g.canOpen(x, y)).to.be.true;
            }
        }
    });
});
