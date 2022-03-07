import React, { useEffect } from 'react';
import { CalcResultList } from './CalcResultList';
import { CalcButtonsList } from './CalcButtonsList';
import { useCalculator } from '../hooks/calculator.hook';
import { BUTTONS_CONTENT } from '../constants/buttonsContent';
import './Calc.scss';

export const Calc: React.FC = () => {
  const {resultList, currentValue, symbolHandler} = useCalculator();

  const onClickButton = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
      const {value} = event.currentTarget;
      symbolHandler(value);
  }

    useEffect(() => {
        const onKeypress = (e: React.KeyboardEvent): void => symbolHandler(e.key);
        // @ts-ignore: disable false overload report
        document.addEventListener('keyup', onKeypress);
        return () => {
            // @ts-ignore: disable false overload report
            document.removeEventListener('keyup', onKeypress);
        };
    });

  return (
    <section className="calc" data-testid="calc">
      <div className="container calc__container">
        <div className="calc__content">
          <CalcResultList resultList={resultList} />
          <div className="calc__current-value">{currentValue}</div>
          <div className="calc__action-buttons">
            <CalcButtonsList buttonsContent={BUTTONS_CONTENT} onClickButton={onClickButton} />
          </div>
        </div>
      </div>
    </section>
  );
};
