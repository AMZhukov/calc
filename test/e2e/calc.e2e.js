const CalcPage = require('../pages/calc.page');

describe('Calculator application', () => {
    it('test', async () => {
        await CalcPage.open();
        await CalcPage.calculate();

        await expect(CalcPage.resultItem1).toHaveTextContaining('9 × 4 = 36');
    });
});


