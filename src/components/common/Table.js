import React from 'react';

export default function Table({ columns, rows, keyField = 'id' }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-950">
          {rows.map((r) => (
            <tr key={r[keyField]} className="border-t border-gray-100 dark:border-gray-900">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">
                  {typeof c.render === 'function' ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
