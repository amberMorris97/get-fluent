import { afterEach, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router';
import generatePhrase from '../../utils/generatePhrase';

vi.mock('../common/Card', () => ({
    default: ({ type, phrase, flipped, onClick }) => (
        <div data-testid="card">Card</div>
    )
}));

vi.mock('../Modal', () => ({
    default: ({ children, open, onClose }) => 
        open ? (
        <div data-testid="modal">
            <button data-testid="modal-button" onClick={onClose}>
                Close
            </button>
            {children}
        </div>
    ) : null,
}));

vi.mock('..common/Button', () => ({
    default: ({ label, className, onClick }) => (
        <button data-testid="button" onClick={onClick}>Button</button>
    )
}));

vi.mock('../../utils/generatePhrase', () => ({
    default: vi.fn(),
}));

const renderHomePage = (props = {}) => 
    render(
        <MemoryRouter>
            <HomePage 
              allPhrases={props.allPhrases ?? []}
              setCurrentPhrase={props.setCurrentPhrase ?? vi.fn()}
              currentPhrase={props.currentPhrase ?? null}
            />
        </MemoryRouter>
    );

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        localStorage.clear();
    });

    it('shows a loading state if the current phrase is not available', () => {
        renderHomePage({ currentPhrase: null });
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders the phrase content when current phrase is available', () => {
        const phrase = { phrase: 'test phrase', translation: 'test translation' };
        renderHomePage({ currentPhrase: phrase });
        expect(screen.getByText("Pick up a new phrase everyday")).toBeInTheDocument();
        expect(screen.getByTestId("card")).toBeInTheDocument();
    });

    it('generates phrase when next phrase button is clicked', () => {
        const allPhrases = [
            { 
                phrase: 'test phrase',
                translation: 'test translation', 
                pronunciation: 'test pronunciation',
            }
        ];

        const newPhrase = { 
            phrase: "new phrase",
            translation: "new translation",
            pronunciation: 'new pronunciation',
        };

        const setCurrentPhrase = vi.fn();

        generatePhrase.mockReturnValue(newPhrase);

        renderHomePage({
            currentPhrase: { phrase: 'test phrase' },
            allPhrases,
            setCurrentPhrase,
        });

        fireEvent.click(screen.getByText('Next phrase'));

        expect(generatePhrase).toHaveBeenCalledWith(allPhrases);
        expect(setCurrentPhrase).toHaveBeenCalledWith(newPhrase);
    });
});