import Field from 'Field';
import Minesweeper from 'Minesweeper';
import { expect } from 'chai';

describe("Minesweeper", () => {
    let g;

    let gameWonNotifyCounter = 0;
    let mineFoundNotifyCounter = 0;
    let tileMarkedNotifyCounter = 0;
    let tileUnmarkedNotifyCounter = 0;
    let tileOpenedNotifyCounter = 0;

    beforeEach(() => {
        gameWonNotifyCounter = 0;
        mineFoundNotifyCounter = 0;
        tileMarkedNotifyCounter = 0;
        tileUnmarkedNotifyCounter = 0;
        tileOpenedNotifyCounter = 0;

        /*
         * |0  0  0  0|
         * |1  1  1  0|
         * |1 -1  1  0|
         * |1  1  2  1|
         * |0  0  1 -1|
         */
        let timesRandomCalled = 1;
        g = new Minesweeper(
            Field(4, 5, 2, (from, to) => timesRandomCalled++)
        );
        g.onWin.add(() => gameWonNotifyCounter++);
        g.onMineFound.add(() => mineFoundNotifyCounter++);
        g.onTileOpened.add(() => tileOpenedNotifyCounter++);
        g.onMarkTile.add(() => tileMarkedNotifyCounter++);
        g.onUnmarkTile.add(() => tileUnmarkedNotifyCounter++);
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
        for (let y = 0; y < g.height(); ++y) {
            for (let x = 0; x < g.width(); ++x) {
                expect(g.isInsideField(x, y)).to.be.true;
            }
        }
    });

    it("ends game when tile with mine is opened", () => {
        g.open(1, 2);
        expect(mineFoundNotifyCounter).to.be.equal(2);
        expect(tileOpenedNotifyCounter).to.be.equal(18);
        expect(gameWonNotifyCounter).to.be.equal(0);
        expect(tileMarkedNotifyCounter).to.be.equal(0);
        expect(tileUnmarkedNotifyCounter).to.be.equal(0);
        for (let y = 0; y < g.height(); ++y) {
            for (let x = 0; x < g.width(); ++x) {
                g.open(x, y);
                g.toggleMark(x, y);
                g.checkComplete();
            }
        }
        expect(mineFoundNotifyCounter).to.be.equal(2);
        expect(tileOpenedNotifyCounter).to.be.equal(18);
        expect(gameWonNotifyCounter).to.be.equal(0);
        expect(tileMarkedNotifyCounter).to.be.equal(0);
        expect(tileUnmarkedNotifyCounter).to.be.equal(0);
    });

    it("unmarks tile when it is opened", () => {
        g.toggleMark(2, 1);
        expect(mineFoundNotifyCounter).to.be.equal(0);
        expect(tileOpenedNotifyCounter).to.be.equal(0);
        expect(gameWonNotifyCounter).to.be.equal(0);
        expect(mineFoundNotifyCounter).to.be.equal(0);
        expect(tileMarkedNotifyCounter).to.be.equal(1);
        expect(tileUnmarkedNotifyCounter).to.be.equal(0);
        expect(g.getMarkInfo().left).to.be.equal(1);
        expect(g.getMarkInfo().total).to.be.equal(2);
        
        g.open(2, 1);
        expect(mineFoundNotifyCounter).to.be.equal(0);
        expect(tileOpenedNotifyCounter).to.be.equal(1);
        expect(gameWonNotifyCounter).to.be.equal(0);
        expect(mineFoundNotifyCounter).to.be.equal(0);
        expect(tileMarkedNotifyCounter).to.be.equal(1);
        expect(tileUnmarkedNotifyCounter).to.be.equal(1);
        expect(g.getMarkInfo().left).to.be.equal(2);
        expect(g.getMarkInfo().total).to.be.equal(2);
    });
});
