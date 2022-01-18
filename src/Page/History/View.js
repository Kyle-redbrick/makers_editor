import React from "react";
import Layout from "../../Common/Component/Layout";
import "./index.scss";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function View(props) {
  // properties

  // Table
  const columns = [
    { id: "date", label: "날짜", minWidth: 170 },
    { id: "description", label: "내용", minWidth: 300 },
    {
      id: "point",
      label: "포인트",
      minWidth: 170,
      align: "right",
      format: row => {
        return row.isUpSymbol + row.point;
      }
    }
  ];

  function createData(date, description, point, isUp) {
    const isUpSymbol = isUp === "up" ? "+" : "-";
    return { date, description, point, isUpSymbol };
  }

  const rows = [
    createData("2020.04.10", "위즈랩에 가입하셨습니다.", 100, "up"),
    createData("2020.04.10", "튜토리얼을 완수하였습니다.", 50, "up"),
    createData(
      "2020.04.10",
      "실버로 등급 업그레이드를 하였습니다.",
      500,
      "down"
    ),
    createData("2020.04.10", "4월 10일 활동으로 30포인트 획득", 30, "up"),
    createData("2020.04.10", "위즈랩에 가입하셨습니다.", 100, "up"),
    createData("2020.04.10", "튜토리얼을 완수하였습니다.", 50, "up"),
    createData(
      "2020.04.10",
      "실버로 등급 업그레이드를 하였습니다.",
      500,
      "down"
    ),
    createData("2020.04.10", "4월 10일 활동으로 30포인트 획득", 30, "up"),
    createData("2020.04.10", "위즈랩에 가입하셨습니다.", 100, "up"),
    createData("2020.04.10", "튜토리얼을 완수하였습니다.", 50, "up"),
    createData(
      "2020.04.10",
      "실버로 등급 업그레이드를 하였습니다.",
      500,
      "down"
    ),
    createData("2020.04.10", "4월 10일 활동으로 30포인트 획득", 30, "up")
  ];

  // styles
  const useStyles = makeStyles({
    tableRoot: {
      width: "100%"
    },
    containerRoot: {
      backgroundColor: "#424242"
    },

    hover: {
      opacity: "0.6"
    },

    tableCommon: {
      borderBottom: "1px solid rgba(81, 81, 81, 1)",
      color: "white"
    },

    tableHeader: {
      backgroundColor: "#11111170",
      fontWeight: "bold"
    },
    tableBody: {
      backgroundColor: "#424242"
    },

    cellUp: {
      color: "red"
    },

    cellDown: {
      color: "blue"
    }
  });

  const classes = useStyles();
  return (
    <Layout>
      <div className="Page--History">
        <div className="History-inner">
          <section className="History_Overview">
            <h3>Overview</h3>
            <div className="History_Overview-total">수익 전체 : +{7000}</div>
            <div className="History_Overview-total">이번 주 수익 : -{3000}</div>
            <div className="History_Overview-total">
              이번 달 수익 : +{10000}
            </div>
          </section>

          <section className="History_Table">
            <TableContainer className={classes.containerRoot}>
              <Table className={classes.tableRoot} stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        className={`${classes.tableCommon} ${classes.tableHeader}`}
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => {
                    return (
                      <TableRow hover key={index}>
                        {columns.map(column => {
                          const value = row[column.id];
                          const isUp = row["isUpSymbol"] === "+";
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              className={`${classes.tableCommon} ${
                                classes.tableBody
                              } ${
                                column.id === "point"
                                  ? isUp
                                    ? classes.cellUp
                                    : classes.cellDown
                                  : {}
                              }`}
                            >
                              {column.format && typeof value === "number"
                                ? column.format(row)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </div>
      </div>
    </Layout>
  );
}
