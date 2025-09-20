import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { Loader } from './Loader';

describe('Loader component', () => {

    it('Deve renderizar o children', async () => {
        render(<Loader />);
        const dots = await screen.findAllByText('●')
        expect(dots).toBeTruthy();
        expect(dots.length).toBe(3);
    });

});