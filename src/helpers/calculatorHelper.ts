export const PLUS = '+';
export const MINUS = '-';
export const EQUALS_SIGN = '=';
export const OPEN_ROUND_BRACERS = '(';
export const CLOSE_ROUND_BRACERS = ')';
export const operators = ['/', '×', '*', MINUS, PLUS];

const checkArrayToHasRoundBrackets = (array: Array<string | number>): boolean => {
    return array.some((item) => {
        return item === '(';
    });
};

export const calculate = (operator: string, left: number | string = 0, right: number | string = 0): number => {
    switch (operator) {
        case '×':
            return ((Number(left) * 100) * (Number(right) * 100)) / 10000;
        case '/':
            return (Number(left) * 100) / (Number(right) * 100);
        case '+':
            return ((Number(left) * 100) + (Number(right) * 100)) / 100;
        case '-':
            return ((Number(left) * 100) - (Number(right) * 100)) / 100;
        default:
            return 0;
    }
};

export const customEval = (expression: string | Array<string | number>): number | string => {
    let array: Array<string | number> = Array.isArray(expression) ?
        [...expression] : expression.replaceAll(',', '.').split(' ');

    if (checkArrayToHasRoundBrackets(array)) {
        let firstSymbolNumber = array.indexOf('(');
        let lastSymbolNumber = array.lastIndexOf(')');
        let numbersDeleteSymbols = lastSymbolNumber - firstSymbolNumber;
        let cutArray = array.slice(firstSymbolNumber + 1, lastSymbolNumber);
        array.splice(firstSymbolNumber, numbersDeleteSymbols + 1, customEval(cutArray));
    }
    operators.forEach((operator) => {
        const items: number[] = [];
        array.forEach((symbol, index) => {
            if (array[index] === operator) {
                items.push(index);
            }
        });
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const coefficientDeleteSymbols = i * 2;
                let j = items[i] - coefficientDeleteSymbols;
                const left: number | string = array[j - 1];
                const right: number | string = array[j + 1];
                const result: number = calculate(operator, left, right);
                array.splice(j - 1, 3, result);
            }
        }
    });
    return array[0];
};

export const checkStringToHasDot = (string: string): boolean => {
    return !!(string.indexOf(',') + 1);
};

export const checkSymbolType = (arrayToCheck: string[], value: string | undefined): boolean => {
    return arrayToCheck.some((item) => item === value);
};

export const numbersOpenBracers = (lastResultItem: string): number => {
    return lastResultItem.split('').filter(i => i === OPEN_ROUND_BRACERS)!?.length;
}

export const numbersCloseBracers = (lastResultItem: string): number => {
    return lastResultItem.split('').filter(i => i === CLOSE_ROUND_BRACERS)!?.length;
}

export const differenceOfQuantityOpenCloseBracers = (lastResultItem: string | undefined): number => {
    if (lastResultItem) {
        return numbersOpenBracers(lastResultItem) - numbersCloseBracers(lastResultItem);
    }
    return 0;
};

export const checkLastSymbolIsOperator = (lastResultItem: string | undefined): boolean => {
    return !!lastResultItem && checkSymbolType(operators, lastResultItem?.at(-1));
};

export const checkLastSymbolIsOpenBracers = (lastResultItem: string | undefined): boolean => {
    return OPEN_ROUND_BRACERS === lastResultItem?.at(-1);
};
