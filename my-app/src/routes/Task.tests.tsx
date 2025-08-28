import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tasks from './tasks';

jest.mock('../index.css', () => ({}));

describe('Tasks Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should render initial tasks', () => {
        render(<Tasks />);

        expect(screen.getByDisplayValue('Work')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Study')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Shop')).toBeInTheDocument();

        const deleteButtons = screen.getAllByText('Delete ✕');
        expect(deleteButtons).toHaveLength(3);
    });

    test('should update task name when input changes', async () => {
        const user = userEvent.setup();
        render(<Tasks />);

        // Используем более точный селектор для input'ов задач
        const taskInputs = screen.getAllByDisplayValue(/Work|Study|Shop/);
        const firstTaskInput = taskInputs[0];

        await user.clear(firstTaskInput);
        await user.type(firstTaskInput, 'New Task Name');

        expect(firstTaskInput).toHaveValue('New Task Name');
    });

    test('should delete a task when delete button is clicked', async () => {
        const user = userEvent.setup();
        render(<Tasks />);

        // Проверяем начальное количество задач по значению
        expect(screen.getByDisplayValue('Work')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Study')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Shop')).toBeInTheDocument();

        // Нажимаем кнопку удаления первой задачи
        const deleteButtons = screen.getAllByText('Delete ✕');
        await user.click(deleteButtons[0]);

        // Проверяем, что задача удалилась
        expect(screen.queryByDisplayValue('Work')).not.toBeInTheDocument();
        expect(screen.getByDisplayValue('Study')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Shop')).toBeInTheDocument();

        // Проверяем количество оставшихся задач по кнопкам удаления
        const remainingDeleteButtons = screen.getAllByText('Delete ✕');
        expect(remainingDeleteButtons).toHaveLength(2);
    });

    test('should add a new task when add button is clicked', async () => {
        const user = userEvent.setup();
        render(<Tasks />);

        const addInput = screen.getByPlaceholderText('Add new task...');
        const addButton = screen.getByText('Add');

        // Добавляем новую задачу
        await user.type(addInput, 'New Task');
        await user.click(addButton);

        // Проверяем, что задача добавилась
        expect(screen.getByDisplayValue('New Task')).toBeInTheDocument();

        // Проверяем общее количество задач по кнопкам удаления
        const deleteButtons = screen.getAllByText('Delete ✕');
        expect(deleteButtons).toHaveLength(4);
    });

    test('should add a new task when Enter key is pressed', async () => {
        const user = userEvent.setup();
        render(<Tasks />);

        const addInput = screen.getByPlaceholderText('Add new task...');

        await user.type(addInput, 'New Task{Enter}');
        expect(screen.getByDisplayValue('New Task')).toBeInTheDocument();

        const deleteButtons = screen.getAllByText('Delete ✕');
        expect(deleteButtons).toHaveLength(4);
    });

    test('should not add empty task', async () => {
        const user = userEvent.setup();
        render(<Tasks />);

        const addInput = screen.getByPlaceholderText('Add new task...');
        const addButton = screen.getByText('Add');

        await user.type(addInput, '   ');
        await user.click(addButton);

        // Проверяем, что количество задач не изменилось
        const deleteButtons = screen.getAllByText('Delete ✕');
        expect(deleteButtons).toHaveLength(3);
    });

    test('should show empty state when all tasks are deleted', async () => {
        const user = userEvent.setup();
        render(<Tasks />);

        // Удаляем все задачи
        const deleteButtons = screen.getAllByText('Delete ✕');
        for (const button of deleteButtons) {
            await user.click(button);
        }

        expect(screen.getByText('Ты всё сделал, дурачок... 🎉')).toBeInTheDocument();

        // Проверяем, что не осталось задач (кнопок удаления)
        expect(screen.queryByText('Delete ✕')).not.toBeInTheDocument();
    });

    test('should show motivational header when there are tasks', () => {
        render(<Tasks />);
        expect(screen.getByText('Может хватит?')).toBeInTheDocument();
    });

    test('should show lazy header when there are no tasks', async () => {
        const user = userEvent.setup();
        render(<Tasks />);

        const deleteButtons = screen.getAllByText('Delete ✕');
        for (const button of deleteButtons) {
            await user.click(button);
        }

        expect(screen.getByText('Накидай-ка себе задач, лентяй...')).toBeInTheDocument();
    });

    test('should maintain unique IDs when adding multiple tasks', async () => {
        const user = userEvent.setup();
        render(<Tasks />);

        const addInput = screen.getByPlaceholderText('Add new task...');
        const addButton = screen.getByText('Add');

        await user.type(addInput, 'Task 1');
        await user.click(addButton);

        await user.type(addInput, 'Task 2');
        await user.click(addButton);

        await user.type(addInput, 'Task 3');
        await user.click(addButton);

        expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Task 2')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Task 3')).toBeInTheDocument();

        // Проверяем общее количество задач
        const deleteButtons = screen.getAllByText('Delete ✕');
        expect(deleteButtons).toHaveLength(6);
    });
});



// √ Должен отображать начальные задачи (44 мс)
// √ Должен обновлять название задачи при изменении ввода (307 мс)
// √ Должен удалять задачу при нажатии кнопки удаления (69 мс)
// √ Должен добавлять новую задачу при нажатии кнопки добавления (215 мс)
// √ Должен добавлять новую задачу при нажатии клавиши Enter (183 мс)
// √ Не должен добавлять пустую задачу (132 мс)
// √ Должен показывать состояние пустого списка при удалении всех задач (148 мс)
// √ Должен показывать мотивационный заголовок при наличии задач (5 мс)
// √ Должен показывать ленивый заголовок при отсутствии задач (116 мс)
// √ Должен сохранять уникальные ID при добавлении нескольких задач (556 мс)