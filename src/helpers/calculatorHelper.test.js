import { calculate, checkStringToHasDot, customEval, operators } from './calculatorHelper';

describe('Check behavior operators for function `calculate`', () => {
    test('summation', () => {
        expect(calculate('+', 20 , 40)).toBe(60)
    })
    test('subtraction', () => {
        expect(calculate('-', 20 , 10)).toBe(10)
    })
    test('division', () => {
        expect(calculate('/', 20 , 40)).toBe(0.5)
    })
    test('multiplication ', () => {
        expect(calculate('×', 20 , 40)).toBe(800)
    })
    test('unknown operator ', () => {
        expect(calculate('%%', 20 , 40)).toBe(0)
    })
})

describe('Check behavior operators for function `customEval`', () => {
    test('Check summation ', () => {
        expect(customEval('20 + 20')).toBe(40)
    })
    test('Check summation between float numbers', () => {
        expect(customEval('0.01 + 0.02')).toBe(0.03)
    })
    test('Check multiplication ', () => {
        expect(customEval('20 × 20')).toBe(400)
    })
    test('Check subtraction ', () => {
        expect(customEval('20 - 20')).toBe(0)
    })
    test('Check summation with round bracer ', () => {
        expect(customEval('( 20 + 20 )')).toBe(40)
    })
    test('Check summation and division with round bracer ', () => {
        expect(customEval('20 + ( 20 / 20 )')).toBe(21)
    })
    test('Check summation with round bracer ', () => {
        expect(customEval('20 + ( 20 × 20 )')).toBe(420)
    })
    test('Check summation with round bracer, without space between digits, operators and round bracer ', () => {
        expect(customEval('20+(20×20)')).toBe('20+(20×20)');
    })
})

describe('Check behavior function `checkStringToHasDot`', () => {
    test('Check correctly example ', () => {
        expect(checkStringToHasDot('0,5')).toBe(true);
    })
    test('Check incorrectly example ', () => {
        expect(checkStringToHasDot('5')).toBe(false);
    })
})

describe('Check behavior function `checkSymbolType`', (operators, ) => {
    test('Check correctly example ', () => {
        expect(checkStringToHasDot('0,5')).toBe(true);
    })
    test('Check incorrectly example ', () => {
        expect(checkStringToHasDot('5')).toBe(false);
    })
})

