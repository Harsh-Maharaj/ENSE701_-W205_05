import React from 'react';
import { render, screen, within, waitFor } from '@testing-library/react';
import ModeratorQueue from '@/pages/moderator/ModeratorQueue';
import '@testing-library/jest-dom';
import axios from 'axios';

// Mock Next.js Link component
jest.mock('next/link', () => {
    const MockLink = ({ children }: { children: React.ReactNode }) => <>{children}</>;
    MockLink.displayName = "MockLink"; // Add displayName
    return MockLink;
});

// Mock SortableTable component
jest.mock('@/components/SortableTable', () => {
    const MockSortableTable = ({ headers, data }: { headers: any; data: any }) => (
        <table data-testid="sortable-table">
            <thead>
                <tr>
                    {headers.map((header: any) => (
                        <th key={header.key}>{header.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row: any) => (
                    <tr key={row.id}>
                        {headers.map((header: any) => (
                            <td key={header.key}>{row[header.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
    MockSortableTable.displayName = "MockSortableTable"; // Add displayName
    return MockSortableTable;
});

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ModeratorQueue Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders a list of articles within the SortableTable when articles are provided', async () => {
        const mockArticles = [
            {
                id: '1',
                title: 'Understanding React Hooks',
                authors: 'Jane Doe, John Smith',
                pubyear: '2024',
                journal: 'Journal of Testing',
                se_practice: 'Test-Driven Development',
                research_type: 'Experiment',
            },
            {
                id: '2',
                title: 'Advanced JavaScript Patterns',
                authors: 'Alice Johnson',
                pubyear: '2023',
                journal: 'JS Monthly',
                se_practice: 'Behavior-Driven Development',
                research_type: 'Case Study',
            },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: mockArticles });

        render(<ModeratorQueue />);

        // Check for loading state
        expect(screen.getByText('Loading articles...')).toBeInTheDocument();

        // Wait for the articles to be loaded
        await waitFor(() => {
            const table = screen.getByTestId('sortable-table');
            expect(table).toBeInTheDocument();
        });

        // Check table headers
        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Authors')).toBeInTheDocument();
        expect(screen.getByText('Publication Year')).toBeInTheDocument();
        expect(screen.getByText('Actions')).toBeInTheDocument();

        // Check table rows
        mockArticles.forEach((article) => {
            expect(screen.getByText(article.title)).toBeInTheDocument();
            expect(screen.getByText(article.authors)).toBeInTheDocument();
            expect(screen.getByText(article.pubyear)).toBeInTheDocument();
        });

        // Check action buttons
        const reviewButtons = screen.getAllByText('Review');
        const passButtons = screen.getAllByText('Pass');
        const rejectButtons = screen.getAllByText('Reject');

        expect(reviewButtons.length).toBe(mockArticles.length);
        expect(passButtons.length).toBe(mockArticles.length);
        expect(rejectButtons.length).toBe(mockArticles.length);
    });

    test('renders "No articles in the moderation queue." when there are no articles', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [] });

        render(<ModeratorQueue />);

        // Wait for the articles to be loaded
        await waitFor(() => {
            expect(screen.getByText('No articles in the moderation queue.')).toBeInTheDocument();
        });

        // Ensure the SortableTable is not rendered
        const table = screen.queryByTestId('sortable-table');
        expect(table).not.toBeInTheDocument();
    });

    test('handles articles with empty authors field gracefully', async () => {
        const mockArticles = [
            {
                id: '3',
                title: 'Empty Authors Field',
                authors: '',
                pubyear: '2022',
                journal: 'Empty Journal',
                se_practice: 'Continuous Integration',
                research_type: 'Survey',
            },
        ];

        mockedAxios.get.mockResolvedValueOnce({ data: mockArticles });

        render(<ModeratorQueue />);

        // Wait for the articles to be loaded
        await waitFor(() => {
            const table = screen.getByTestId('sortable-table');
            expect(table).toBeInTheDocument();
        });

        // Get all rows
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(2); // Header + one data row

        // Access the second row (data row)
        const dataRow = rows[1];

        // Access all cells in the data row
        const cells = within(dataRow).getAllByRole('cell');

        // Assertions for each cell
        expect(cells[0]).toHaveTextContent('Empty Authors Field'); // Title
        expect(cells[1]).toHaveTextContent(''); // Authors - should be empty
        expect(cells[2]).toHaveTextContent('2022'); // Publication Year

        // Check action buttons within the Actions cell
        const actionsCell = cells[3];
        const reviewButton = within(actionsCell).getByText('Review');
        const passButton = within(actionsCell).getByText('Pass');
        const rejectButton = within(actionsCell).getByText('Reject');

        expect(reviewButton).toBeInTheDocument();
        expect(passButton).toBeInTheDocument();
        expect(rejectButton).toBeInTheDocument();
    });
});
