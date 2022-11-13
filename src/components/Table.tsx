import { useQuery } from "@tanstack/react-query"
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Table as MUITable } from "@mui/material"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { useNavigate } from "react-router-dom"
import { useFetchOrders } from "../services/useFetchOrders"
import { formatDate } from "../utils/format"

export const Table = () => {
  const { fetchOrder } = useFetchOrders()
  const { isLoading, error, data } = useQuery(["fetch-orders"], fetchOrder)

  const navigate = useNavigate()

  function navigateToOrder(id: string) {
    navigate(`/order/${id}`)
  }

  if (isLoading) return <>"Loading..."</>

  if (error instanceof Error || !data) return <>{"An error has occurred:"}</>

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 700, margin: "10px auto" }}
      >
        <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Date created</TableCell>
              <TableCell align="right">Customer info</TableCell>
              <TableCell align="right">Number of products in cart</TableCell>
              <TableCell align="right">Current status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                  cursor: "pointer",
                }}
                onClick={() => navigateToOrder(row._id)}
              >
                <TableCell align="left">{formatDate(row.createdAt)}</TableCell>
                <TableCell align="right">
                  {row?.customer?.fname + " " + row?.customer?.lname}
                </TableCell>
                <TableCell align="right">{row?.lineItems?.length}</TableCell>
                <TableCell align="right">{row?.currentState}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      </TableContainer>

      {/* <ReactQueryDevtools initialIsOpen /> */}
    </>
  )
}
