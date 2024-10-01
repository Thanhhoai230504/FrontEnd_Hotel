import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material"; // Nhớ import các component từ MUI

type Props = {
  ProductHeader: { label: string; order: number }[]; // Thêm kiểu cho ProductHeader
};

const TableHeadComponent: React.FC<Props> = ({ ProductHeader }) => {
  return (
    <TableHead sx={{ backgroundColor: "#a0a0a0" }}>
      <TableRow>
        {ProductHeader.map((header) => (
          <TableCell sx={{ fontWeight: "bold" }} key={header.order}>
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadComponent;
