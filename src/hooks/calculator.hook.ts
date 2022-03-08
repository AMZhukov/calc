import { useState } from 'react';
import {
    checkLastSymbolIsOpenBracers,
    checkLastSymbolIsOperator,
    checkStringToHasDot,
    checkSymbolType,
    CLOSE_ROUND_BRACERS,
    customEval, differenceOfQuantityOpenCloseBracers,
    EQUALS_SIGN,
    OPEN_ROUND_BRACERS,
    operators
} from '../helpers/calculatorHelper';

export const useCalculator = () => {

    const digits = ['00', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const dots = ['.', ','];
    const deleteOperators = ['C', 'Backspace', 'Delete'];
    const equal = [EQUALS_SIGN, 'Enter'];
    const roundBracers = [OPEN_ROUND_BRACERS, CLOSE_ROUND_BRACERS];

    const translateMultiply = {old: '*', new: '×'};

    const [resultList, setResultList] = useState<string[]>(['22 - 1 = 21']);
    const [currentValue, setCurrentValue] = useState('');
    const [isNeedClearInput, setIsNeedClearInput] = useState(false);
    const [isNewExpression, setIsNewExpression] = useState(true);

    const refreshLastItemToResultList = (value: string): void => {
        removeItemToResultList();
        addItemToResultList(value);
    };

    const addItemToResultList = (value: string): void => {
        setResultList((prevState => {
            return [...prevState, value];
        }));
    };

    const removeItemToResultList = (): void => {
        if (!!resultList?.at(-1)) {
            setResultList(prevState => {
                const newResultList = [...prevState];
                newResultList.splice(prevState.length - 1, 1);
                return newResultList;
            });
        }
    };

    const addSymbolToCurrentValue = (value: string, isNeedClearCurrentValue?: boolean): void => {
        if (isNeedClearCurrentValue) {
            setCurrentValue(value);
            return;
        }
        setCurrentValue(((prevState) => {
            return prevState + value;
        }));
    };

    const addDigit = (value: string): void => {
        if (isNeedClearInput) {
            addSymbolToCurrentValue(value, isNeedClearInput);
            setIsNeedClearInput(false);
            return;
        }
        addSymbolToCurrentValue(value);
    };

    const addDots = (): void => {
        if (!isNeedClearInput && checkStringToHasDot(currentValue)) {
            return;
        }
        if (isNeedClearInput || currentValue!?.length === 0) {
            addSymbolToCurrentValue('0,', true);
            setIsNeedClearInput(false);
        } else {
            addSymbolToCurrentValue(',');
        }
    };

    const deleteSymbol = (): void => {
        if (currentValue.length > 0) {
            setCurrentValue(((prevState) => {
                return prevState.substring(0, currentValue.length - 1);
            }));
            return;
        } else {
            removeItemToResultList();
            setIsNewExpression(true);
            setIsNeedClearInput(false);
        }
    };

    const addRoundBracer = (value: string): void => {
        const lastResultItem: string = resultList?.at(-1) || '';
        if (isNewExpression && value === OPEN_ROUND_BRACERS) {
            setIsNewExpression(false);
            addItemToResultList(value);
        } else if (differenceOfQuantityOpenCloseBracers(lastResultItem) > 0 || value === OPEN_ROUND_BRACERS) {
            if (value === CLOSE_ROUND_BRACERS) {
                refreshLastItemToResultList(lastResultItem + ' ' + currentValue + ' ' + CLOSE_ROUND_BRACERS);
                setIsNeedClearInput(true);
            } else if (checkLastSymbolIsOperator(lastResultItem) && value === OPEN_ROUND_BRACERS) {
                refreshLastItemToResultList(lastResultItem + ' ' + value);
                setIsNeedClearInput(true);
            }
        }
    };

    const addOperator = (value: string): void => {
        const newOperator: string = value === translateMultiply.old ? translateMultiply.new : value;
        const lastResultItem: string | undefined = resultList?.at(-1);
        if (!!lastResultItem && checkLastSymbolIsOperator(lastResultItem?.at(-1)) && isNeedClearInput) {
            const newLastResultItem: string = lastResultItem.substring(0, lastResultItem.length - 1) + newOperator;
            refreshLastItemToResultList(newLastResultItem);
            setIsNeedClearInput(true);
        } else if (isNewExpression && currentValue !== '') {
            setIsNewExpression(false);
            addItemToResultList(currentValue + ' ' + newOperator);
            setIsNeedClearInput(true);
        } else if (isNeedClearInput && currentValue !== '') {
            refreshLastItemToResultList(lastResultItem + ' ' + currentValue + ' ' + newOperator);
            setIsNeedClearInput(true);
        } else if (!isNewExpression) {
            refreshLastItemToResultList(lastResultItem + ' ' + currentValue + ' ' + newOperator);
            setIsNeedClearInput(true);
        }
        return;
    };

    const symbolHandler = (value: string): void => {
        if (checkSymbolType(digits, value)) {
            addDigit(value);
            return;
        }
        if (checkSymbolType(dots, value)) {
            addDots();
            return;
        }
        if (checkSymbolType(deleteOperators, value)) {
            deleteSymbol();
            return;
        }
        if (checkSymbolType(operators, value)) {
            addOperator(value);
            return;
        }
        if (checkSymbolType(roundBracers, value)) {
            addRoundBracer(value);
            return;
        }
        if (checkSymbolType(equal, value)) {
            toCalculate();
            return;
        }
    };

    const preparationOfStringToCalculate = (lastResultItem: string): string => {
        let newLastResultItem: string = '';
        if (checkLastSymbolIsOperator(lastResultItem) && isNeedClearInput) {
            newLastResultItem += lastResultItem?.substring(0, lastResultItem?.length - 2);
        } else if (!isNeedClearInput
            && (checkLastSymbolIsOperator(lastResultItem)
                || checkLastSymbolIsOpenBracers(lastResultItem))) {
            newLastResultItem = lastResultItem + ' ' + currentValue;
        } else {
            newLastResultItem = lastResultItem ? lastResultItem : ' ';
        }
        return newLastResultItem;
    }

    const toCalculate = (): void => {
        const lastResultItem = resultList?.at(-1);
        if (lastResultItem!?.length > 0 && !isNewExpression) {
            // @ts-ignore: Disable the false message about the possible incorrect value of the 'lastResultItem'
            let newLastResultItem: string = preparationOfStringToCalculate(lastResultItem);
            refreshLastItemToResultList((newLastResultItem));

            for (let i = 0; i < differenceOfQuantityOpenCloseBracers(resultList?.at(-1)); i++) {
                newLastResultItem += ' ' + CLOSE_ROUND_BRACERS;
            }

            const calculatedResult = customEval(newLastResultItem).toString().replaceAll('.', ',');
            const newLastResultItemEval = newLastResultItem + ' ' + EQUALS_SIGN + ' ' + calculatedResult;
            refreshLastItemToResultList(newLastResultItemEval);
            setCurrentValue(calculatedResult);

            setIsNewExpression(true);
        }
    };

    return {resultList, currentValue, symbolHandler};
};