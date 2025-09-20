import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import App from './page';

describe('App component', () => {

    it('Deve renderizar o children', async () => {
        render(<App />);
        expect(screen.getByRole('heading', { name: 'App Calculadora de Custo Real por Hora para Freelancers' })).toBeInTheDocument();
    });

});