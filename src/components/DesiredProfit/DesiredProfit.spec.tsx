import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DesiredProfit } from "./DesiredProfit";
import UserModel from "@/models/UserModel";
import { useRouter } from "next/navigation";
import { currencyBRL, percentNumber } from "@/helpers/number-format";

describe('DesiredProfit component', () => {

    it('Deve renderizar o component', async () => {
        const user = await UserModel.findOne({ email: 'teste@teste.com' })
        const dataMock = { ...user, expenses: 3000 }
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: async () => dataMock,
            } as Response)
        );

        render(<DesiredProfit />);
        expect(screen.getByText('Lucro Desejado')).toBeInTheDocument();
        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        })

        await waitFor(async () => {
            const button = screen.getByRole('button', { name: 'Editar' })
            fireEvent.click(button)
            expect(mockPush).toHaveBeenCalled()

            const percentValue = (dataMock.profit * 100 / dataMock.expenses / 100)
            const percent = screen.getByRole('listitem', { name: 'percent' })
            expect(percent).toBeInTheDocument()
            const items1 = percent.querySelector('h4.text-secondary')
            expect(items1?.textContent).toBe(percentNumber(percentValue))
            const profit = screen.getByRole('listitem', { name: 'profit' })
            expect(profit).toBeInTheDocument()
            const items2 = profit.querySelector('h4.text-primary')
            expect(items2?.textContent).toBe(currencyBRL(dataMock.profit))
            const total = screen.getByRole('listitem', { name: 'total' })
            expect(total).toBeInTheDocument()
            const items3 = total.querySelector('h3.text-primary')
            expect(items3?.textContent).toBe(currencyBRL(dataMock.profit + dataMock.expenses))
        })
    })

    it('Deve renderizar o component com expenses = 0', async () => {
        const user = await UserModel.findOne({ email: 'teste@teste.com' })
        const dataMock = { ...user, expenses: 0 }
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: async () => dataMock,
            } as Response)
        );
        render(<DesiredProfit />);
        await waitFor(async () => {
            const percentValue = 0
            const percent = screen.getByRole('listitem', { name: 'percent' })
            expect(percent).toBeInTheDocument()
            const items1 = percent.querySelector('h4.text-secondary')
            expect(items1?.textContent).toBe(percentNumber(percentValue))
        })
    })
});
