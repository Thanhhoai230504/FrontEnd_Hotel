import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material"; // Nhớ import các component từ MUI

type Props = {
  OrderTable: { label: string; order: number }[];
};

const TableHeadOrder: React.FC<Props> = ({ OrderTable }) => {
  return (
    <TableHead sx={{ backgroundColor: "#a0a0a0" }}>
      <TableRow>
        {OrderTable.map((header) => (
          <TableCell sx={{ fontWeight: "bold" }} key={header.order}>
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadOrder;
