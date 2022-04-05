import React from 'react';

type CalcResultList = {
    resultList: string[],
}

export const CalcResultList: React.FC<CalcResultList> = ({resultList}) => {
    return (
        <ul className="calc__result-list" data-testid="resultList">
            {resultList.map((item, index) => {
                return (
                    <li className="calc__result-item" id={'result-' + index} key={index}>{item}</li>
                );
            })}
        </ul>
    );
};