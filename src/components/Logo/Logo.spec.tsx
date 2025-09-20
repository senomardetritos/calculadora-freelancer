import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { Logo } from './Logo';

describe('Logo component', () => {

    it('Deve renderizar o children', async () => {
        render(<Logo />);
        expect(screen.getByText('CalcFreela')).toBeInTheDocument();
    });

});