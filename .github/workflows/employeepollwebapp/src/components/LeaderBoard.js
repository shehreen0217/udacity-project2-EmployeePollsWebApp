import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { usePreviousProps } from "@mui/utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const LeaderBoard = () => {
  const allUsers = useSelector((state) => state.user.allUsers);
  const users = Object.keys(allUsers).map((key) => {
    return allUsers[key];
  });
  users.sort((a, b) => {
    return Object.keys(b.answers).length - Object.keys(a.answers).length;
  });

  useEffect(() => {}, [allUsers]);

  return (
    <div>
      <Paper>
        <TableContainer component={Paper}>
          <Table
            align="center"
            sx={{ minWidth: 300, width: 1000 }}
            aria-label="customized table"
          >
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Users</StyledTableCell>
                <StyledTableCell align="right">Answered</StyledTableCell>
                <StyledTableCell align="right">Created</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {users.map((u) => (
                <StyledTableRow key={u.id}>
                  <StyledTableCell>
                    {
                      <>
                        <Avatar
                          alt="Current User avatar"
                          src={u.avatarURL}
                          sx={{ width: 50, height: 50 }}
                        />
                        <h3 style={styles.name}>{u.name}</h3>
                        <h4 style={styles.username}>{u.id}</h4>
                      </>
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {Object.keys(u.answers).length}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {u.questions.length}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

const styles = {
  name: {
    marginTop: "-3px",
  },
  username: {
    marginTop: "-19px",
    mrginBottom: "-15px",
  },
};

export default LeaderBoard;
