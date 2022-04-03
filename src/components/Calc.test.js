import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import { Calc } from "./Calc";

test('render Calculator', () => {
    render(<Calc />);
    const calculator = screen.getByTestId('calc');
    expect(calculator).toBeInTheDocument();
    expect(calculator).toMatchSnapshot();
});
