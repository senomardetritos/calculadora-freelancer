import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers
import { Modal } from './Modal';
import React from 'react';

describe('Modal component', () => {

    beforeAll(() => {
        // Mock completo do HTMLDialogElement
        HTMLDialogElement.prototype.showModal = jest.fn(function () {
            this.open = true;
            this.setAttribute('open', '');
        });

        HTMLDialogElement.prototype.close = jest.fn(function () {
            this.open = false;
            this.removeAttribute('open');
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('Deve renderizar o children', async () => {
        const handleClose = jest.fn();
        const modalRef = React.createRef<HTMLDialogElement>()
        render(<Modal onClose={handleClose} ref={modalRef}>Teste Modal</Modal>);
        expect(screen.getByText('Teste Modal')).toBeInTheDocument();

        const modalContent = await screen.findByText('Teste Modal');

        modalRef.current?.showModal()
        expect(modalContent).toBeVisible();

        const closeButton = screen.getByRole('button', { name: 'X' });
        fireEvent.click(closeButton);
        await waitFor(() => {
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        })
    });

});