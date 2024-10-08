import React, { useState } from 'react';

interface SortableTableProps {
  headers: { key: string; label: string; render?: (row: any) => JSX.Element }[];
  data: any[];
  className?: string; 
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data, className }) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedData, setSortedData] = useState(data);

  const handleSort = (key: string) => {
    const order: 'asc' | 'desc' = sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    setSortKey(key);
    setSortOrder(order);
    setSortedData(sorted);
  };

  return (
    <table className={className}> {/* Apply the className prop */}
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key} onClick={() => handleSort(header.key)}>
              {header.label}
              {sortKey === header.key ? (sortOrder === 'asc' ? ' 🔼' : ' 🔽') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i}>
            {headers.map((header) => (
              <td key={header.key}>
                {header.render ? header.render(row) : row[header.key]} {/* Custom render for actions */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
