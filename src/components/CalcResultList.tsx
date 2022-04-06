import React from 'react';

type CalcResultListProps = {
    resultList: string[],
}

export const CalcResultList: React.FC<CalcResultListProps> = ({ resultList }) => {
  return (
    <ul className="calc__result-list" data-testid="resultList">
      {resultList.map((item, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li className="calc__result-item" id={`result-${index}`} key={index}>{item}</li>
        );
      })}
    </ul>
  );
};
