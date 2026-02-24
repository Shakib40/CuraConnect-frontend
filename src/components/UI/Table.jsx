import {
  Table as FlowbiteTable,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "flowbite-react";

const Table = ({ columns, data, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="overflow-x-auto shadow-sm rounded-lg border border-slate-200 bg-white">
      <FlowbiteTable hoverable>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableHeadCell key={index} className="!bg-slate-50 !text-slate-700">
                {col.header}
              </TableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="bg-white hover:bg-white transition-colors"
            >
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex} className="text-slate-800">
                  {col.render ? col.render(row) : row[col.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-8 text-slate-500"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </FlowbiteTable>

      {totalPages > 1 && (
        <div className="flex overflow-x-auto justify-between items-center p-4 border-t border-slate-200">
          <span className="text-sm font-normal text-slate-500">
            Showing Page{" "}
            <span className="font-semibold text-slate-900">{currentPage}</span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">{totalPages}</span>
          </span>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
            layout="pagination"
          />
        </div>
      )}
    </div>
  );
};

export default Table;
