import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Paper } from "@mui/material"
import { useFetchOrders } from "../services/useFetchOrders"
import { RowSection } from "./RowSection"
import { formatDate } from "../utils/format"
import { UpdateForm } from "./UpdateForm"

export const Order = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  function goBack() {
    navigate(`/orders`)
  }

  const { fetchOrderById } = useFetchOrders()

  const { isLoading, data } = useQuery(["fect-order-by-id"], () =>
    fetchOrderById(id as string)
  )

  if (isLoading) return <>"Loading..."</>

  return (
    <>
      <Button onClick={() => goBack()}>Back</Button>
      <Container
        component={Paper}
        sx={{ width: 500, margin: "10px auto", padding: "10px 0" }}
      >
        <RowSection label="Created at" content={formatDate(data?.createdAt)} />
        <RowSection label="Current Status" content={data?.currentState} />

        <>History</>
        <div style={{ backgroundColor: "#eee" }}>
          {data?.stateHistory.map((item) => (
            <RowSection
              label={item.state}
              content={formatDate(item.createdAt)}
            />
          ))}
        </div>
      </Container>

      <UpdateForm currentStatus={data?.currentState} id={id} />
    </>
  )
}
