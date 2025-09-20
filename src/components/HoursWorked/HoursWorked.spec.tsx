import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HoursWorked } from "./HoursWorked";
import UserModel from "@/models/UserModel";
import { useRouter } from "next/navigation";

describe('HoursWorked component', () => {

    beforeEach(async () => {
        const user = await UserModel.findOne({ email: 'teste@teste.com' })
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                ok: true,
                status: 200,
                json: async () => user,
            } as Response)
        );
    })

    it('Deve renderizar o component', async () => {
        render(<HoursWorked />);
        expect(screen.getByText('Horas Trabalhadas')).toBeInTheDocument();
        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        })

        await waitFor(async () => {
            const button = screen.getByRole('button', { name: 'Editar' })
            fireEvent.click(button)
            expect(mockPush).toHaveBeenCalled()

            const user = await UserModel.findOne({ email: 'teste@teste.com' })
            const hours_per_day = screen.getByRole('listitem', { name: 'hours_per_day' })
            expect(hours_per_day).toBeInTheDocument()
            const items1 = hours_per_day.querySelector('h4.text-secondary')
            expect(items1?.textContent).toBe(user.hours_per_day.toString())

            const days_per_week = screen.getByRole('listitem', { name: 'days_per_week' })
            expect(days_per_week).toBeInTheDocument()
            const items2 = days_per_week.querySelector('h4.text-secondary')
            expect(items2?.textContent).toBe(user.days_per_week.toString())

            const total = screen.getByRole('listitem', { name: 'total' })
            expect(total).toBeInTheDocument()
            const items3 = total.querySelector('h3.text-secondary')
            expect(items3?.textContent).toBe((user.hours_per_day * user.days_per_week * 4).toString())
        })
    })
});
