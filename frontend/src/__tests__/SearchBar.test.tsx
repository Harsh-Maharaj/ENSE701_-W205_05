// Search Bar Test
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import { jest } from '@jest/globals';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('should render the search input field', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Type to search by title, author or date...');
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onSearch with the entered search term on input change', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Type to search by title, author or date...');
    fireEvent.change(inputElement, { target: { value: 'React' } });
    expect(mockOnSearch).toHaveBeenCalledWith('React');
  });

  it('should not call onSearch if input is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Type to search by title, author or date...');
    fireEvent.change(inputElement, { target: { value: '' } });
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('should call onSearch with trimmed input value', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Type to search by title, author or date...');
    fireEvent.change(inputElement, { target: { value: '  JavaScript  ' } });
    expect(mockOnSearch).toHaveBeenCalledWith('JavaScript');
  });

  it('should call onSearch with case-insensitive input value', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Type to search by title, author or date...');
    fireEvent.change(inputElement, { target: { value: 'ReAct' } });
    expect(mockOnSearch).toHaveBeenCalledWith('ReAct');
  });
});
