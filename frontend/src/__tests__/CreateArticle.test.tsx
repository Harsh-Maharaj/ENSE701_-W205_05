// create-article.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import NewDiscussion from '@/pages/articles/create-article';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock window.alert
window.alert = jest.fn();

describe('CreateArticle Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the create article form', () => {
        render(<NewDiscussion />);

        expect(screen.getByText('Submit a New Article')).toBeInTheDocument();
        expect(screen.getByLabelText('Title')).toBeInTheDocument();
        expect(screen.getByText('Authors')).toBeInTheDocument();
        // Continue for all form fields...
    });

    test('allows the user to fill out the form', () => {
        render(<NewDiscussion />);

        // Fill in the title
        const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: 'Test Article Title' } });
        expect(titleInput.value).toBe('Test Article Title');

        // Add an author
        const addAuthorButton = screen.getByText('Add Author');
        fireEvent.click(addAuthorButton);

        const authorInput = screen.getByPlaceholderText('Author 1') as HTMLInputElement;
        fireEvent.change(authorInput, { target: { value: 'Author Name' } });
        expect(authorInput.value).toBe('Author Name');

        // Continue for other fields...
    });

    test('submits the form successfully', async () => {
        mockedAxios.post.mockResolvedValueOnce({ status: 201 });

        render(<NewDiscussion />);

        // Fill in the form fields
        const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: 'Test Article Title' } });

        const addAuthorButton = screen.getByText('Add Author');
        fireEvent.click(addAuthorButton);
        const authorInput = screen.getByPlaceholderText('Author 1') as HTMLInputElement;
        fireEvent.change(authorInput, { target: { value: 'Author Name' } });

        const pubYearInput = screen.getByLabelText('Year of Publication') as HTMLInputElement;
        fireEvent.change(pubYearInput, { target: { value: '2021' } });

        const journalInput = screen.getByLabelText('Journal/Conference Name') as HTMLInputElement;
        fireEvent.change(journalInput, { target: { value: 'Journal of Testing' } });

        const sePracticeInput = screen.getByLabelText('SE Practice') as HTMLInputElement;
        fireEvent.change(sePracticeInput, { target: { value: 'Test-Driven Development' } });

        const claimInput = screen.getByLabelText('Claim') as HTMLTextAreaElement;
        fireEvent.change(claimInput, { target: { value: 'Improves code quality' } });

        const researchTypeSelect = screen.getByLabelText('Type of Research') as HTMLSelectElement;
        fireEvent.change(researchTypeSelect, { target: { value: 'experiment' } });

        const summaryInput = screen.getByLabelText('Summary') as HTMLTextAreaElement;
        fireEvent.change(summaryInput, { target: { value: 'This is a test summary.' } });

        // Continue filling other optional fields if needed

        // Submit the form
        const submitButton = screen.getByText('Submit Article');
        fireEvent.click(submitButton);

        // Wait for the asynchronous actions to complete
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalledWith(
                process.env.ACCESS_URL + `/api/articles`,
                expect.objectContaining({
                    title: 'Test Article Title',
                    authors: ['Author Name'],
                    publication_year: '2021',
                    journal: 'Journal of Testing',
                    se_practice: 'Test-Driven Development',
                    claim: 'Improves code quality',
                    research_type: 'experiment',
                    summary: 'This is a test summary.',
                    // Include other fields as needed
                })
            );
        });

        // Check if the form is cleared
        expect(titleInput.value).toBe('');
        expect(screen.queryByPlaceholderText('Author 1')).not.toBeInTheDocument();
        expect(pubYearInput.value).toBe('');
        // Continue for other fields...

        // Check if success alert was shown
        expect(window.alert).toHaveBeenCalledWith('Article submitted successfully!');
    });

    test('handles form submission error', async () => {
        mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

        render(<NewDiscussion />);

        // Fill in the form fields
        const titleInput = screen.getByLabelText('Title') as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: 'Test Article Title' } });

        const addAuthorButton = screen.getByText('Add Author');
        fireEvent.click(addAuthorButton);
        const authorInput = screen.getByPlaceholderText('Author 1') as HTMLInputElement;
        fireEvent.change(authorInput, { target: { value: 'Author Name' } });

        const pubYearInput = screen.getByLabelText('Year of Publication') as HTMLInputElement;
        fireEvent.change(pubYearInput, { target: { value: '2021' } });

        const journalInput = screen.getByLabelText('Journal/Conference Name') as HTMLInputElement;
        fireEvent.change(journalInput, { target: { value: 'Journal of Testing' } });

        const sePracticeInput = screen.getByLabelText('SE Practice') as HTMLInputElement;
        fireEvent.change(sePracticeInput, { target: { value: 'Test-Driven Development' } });

        const claimInput = screen.getByLabelText('Claim') as HTMLTextAreaElement;
        fireEvent.change(claimInput, { target: { value: 'Improves code quality' } });

        const researchTypeSelect = screen.getByLabelText('Type of Research') as HTMLSelectElement;
        fireEvent.change(researchTypeSelect, { target: { value: 'experiment' } });

        const summaryInput = screen.getByLabelText('Summary') as HTMLTextAreaElement;
        fireEvent.change(summaryInput, { target: { value: 'This is a test summary.' } });

        // Continue filling other optional fields if needed

        // Submit the form
        const submitButton = screen.getByText('Submit Article');
        fireEvent.click(submitButton);

        // Wait for the asynchronous actions to complete
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith(
                'Failed to submit the article. Please try again.'
            );
        });
    });
});
