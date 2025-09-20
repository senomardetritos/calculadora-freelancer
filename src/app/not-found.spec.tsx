import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import NotFound from './not-found';

describe('NotFound component', () => {

    it('Deve renderizar o children', async () => {
        render(<NotFound />);
        expect(screen.getByRole('heading', { name: '404 - Página não encontrada' })).toBeInTheDocument();
    });

});