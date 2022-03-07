import React from 'react';

type CalcButtonsList = {
    buttonsContent: string[],
    onClickButton: (event: React.SyntheticEvent<HTMLButtonElement>) => void
}

    export const CalcButtonsList: React.FC<CalcButtonsList> = ({buttonsContent, onClickButton}) => {
    return (
        <ul className="calc__action-buttons-list" data-testid="calculatorButtons">
            {buttonsContent.map((item) => {
                return (
                    <li className="calc__action-button-wrapper " key={item}>
                        <button className="calc__action-button"
                                value={item}
                                onClick={onClickButton}>{item}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};