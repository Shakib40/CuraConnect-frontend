import React from 'react';

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <button
        className="rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-800"
        onClick={onPrev}
        disabled={page <= 1}
      >
        Prev
      </button>
      <div className="text-sm text-gray-700 dark:text-gray-200">
        Page {page} / {totalPages}
      </div>
      <button
        className="rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-800"
        onClick={onNext}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
