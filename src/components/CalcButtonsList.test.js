import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react';
import { CalcButtonsList } from "./CalcButtonsList";
import { BUTTONS_CONTENT } from "../constants/buttonsContent";

test('render Calculator buttons', () => {
    render(<CalcButtonsList buttonsContent={BUTTONS_CONTENT} onClickButton={() => {}}/>);

    const calculatorButtons = screen.getByTestId('calculatorButtons');
    expect(calculatorButtons).toBeInTheDocument();
    expect(calculatorButtons).toMatchSnapshot();
})
