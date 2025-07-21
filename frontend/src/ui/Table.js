import React from "react";

export function Table({ children }) {
  return (
    <div className="w-full overflow-auto">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  );
}

export function TableHeader({ children }) {
  return <thead className="border-b">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableFooter({ children }) {
  return <tfoot className="border-t bg-gray-100">{children}</tfoot>;
}

export function TableRow({ children }) {
  return <tr className="border-b hover:bg-gray-50">{children}</tr>;
}

export function TableHead({ children }) {
  return (
    <th className="px-4 py-2 text-left font-semibold text-global-4">
      {children}
    </th>
  );
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 text-gray-700">{children}</td>;
}

export function TableCaption({ children }) {
  return <caption className="text-sm text-gray-500 mt-2">{children}</caption>;
}
