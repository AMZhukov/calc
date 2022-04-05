const Page = require('./page');

class CalcPage extends Page {
    get calcButtons() {
        return $$('.calc__action-button')
    }
    get calcButtons9() {
        return this.calcButtons[6]
    }
    get calcButtonsMultipli() {
        return this.calcButtons[7]
    }
    get calcButtons4() {
        return this.calcButtons[8]
    }
    get calcButtonsEqual() {
        return this.calcButtons[19]
    }

    get resultList() {
        return $$('.calc__result-item');
    }
    get resultItem1() {
        return this.resultList[1];
    }

    async calculate () {
        await this.calcButtons9.click();
        await this.calcButtonsMultipli.click();
        await this.calcButtons4.click();
        await this.calcButtonsEqual.click();
    }

    open() {
        return browser.url(`http://localhost:9000`);
    }
}

module.exports = new CalcPage();
