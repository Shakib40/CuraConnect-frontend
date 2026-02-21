import React from 'react';

export default function CommonTable({
  columns,
  rows,
  keyField = 'id',
  tableClassName = 'min-w-full divide-y divide-table-line',
  bodyClassName = 'divide-y divide-table-line',
  containerClassName = 'min-w-full',
  scrollClassName =
    'overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-track]:bg-scrollbar-track [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb',
}) {
  return (
    <div className={containerClassName}>
      <div className={scrollClassName}>
        <table className={tableClassName}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={
                    c.thClassName ||
                    'px-6 py-3 text-start text-xs font-medium text-muted-foreground-1 uppercase'
                  }
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={bodyClassName}>
            {rows.map((r) => (
              <tr key={r[keyField]}>
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={
                      c.tdClassName ||
                      'px-6 py-4 whitespace-nowrap text-sm text-foreground'
                    }
                  >
                    {typeof c.render === 'function' ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
