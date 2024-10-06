import React from "react";
import { TableHead, TableRow, TableCell } from "@mui/material"; // Nhớ import các component từ MUI

type Props = {
  UserHeader: { label: string; order: number }[]; // Thêm kiểu cho ProductHeader
};

const TableHeadUser: React.FC<Props> = ({ UserHeader }) => {
  return (
    <TableHead sx={{ backgroundColor: "#a0a0a0" }}>
      <TableRow>
        {UserHeader.map((header) => (
          <TableCell
            sx={{ fontWeight: "bold", letterSpacing: "0.06rem" }}
            key={header.order}
          >
            {header.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadUser;
