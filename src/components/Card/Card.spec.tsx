import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { Card } from './Card';

describe('Card component', () => {
    it('Deve renderizar o children', () => {
        render(<Card>Teste</Card>);
        expect(screen.getByText(/Teste/i)).toBeInTheDocument();
    });
});