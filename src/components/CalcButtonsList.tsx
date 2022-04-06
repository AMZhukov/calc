import React from 'react';

type CalcButtonsListProps = {
    buttonsContent: string[],
    // eslint-disable-next-line no-unused-vars
    onClickButton: (event: React.SyntheticEvent<HTMLButtonElement>) => void
}

export const CalcButtonsList: React.FC<CalcButtonsListProps> = ({ buttonsContent, onClickButton }) => {
  return (
    <ul className="calc__action-buttons-list" data-testid="calculatorButtons">
      {buttonsContent.map((item) => {
        return (
          <li className="calc__action-button-wrapper" key={item}>
            <button
              className="calc__action-button"
              value={item}
              onClick={onClickButton}
              type="button"
            >
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
