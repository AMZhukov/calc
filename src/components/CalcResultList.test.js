import { render, screen } from '@testing-library/react';
import { CalcResultList } from './CalcResultList';
import React from 'react';
import '@testing-library/jest-dom/extend-expect'

test('render Calc result list', () => {
    render(<CalcResultList resultList={['1 + 1 = 2', '3 / 2 = 1,5', '10 - 2 = 8']} />);

    const resultList = screen.getByTestId('resultList');
    expect(resultList).toBeInTheDocument();
    expect(resultList).toMatchSnapshot();
})
