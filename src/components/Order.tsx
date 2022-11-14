import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Divider, Paper } from "@mui/material"
import { useFetchOrders } from "../services/useFetchOrders"
import { RowSection } from "./RowSection"
import { formatDate } from "../utils/format"
import { UpdateForm } from "./UpdateForm"

export const Order = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  function goBack() {
    navigate(`/`)
  }

  const { fetchOrderById } = useFetchOrders()

  const { isLoading, data } = useQuery(["fect-order-by-id"], () =>
    fetchOrderById(id as string)
  )

  if (!id) return <>{"An error has occurred"}</>

  if (isLoading) return <>"Loading..."</>

  return (
    <>
      <Button onClick={() => goBack()}>Back</Button>
      <Container
        component={Paper}
        sx={{ width: 500, margin: "10px auto", padding: "10px 0" }}
      >
        <div className="Spacer">
          <RowSection label="Order id" content={data?._id} />
          <RowSection
            label="Created at"
            content={formatDate(data?.createdAt)}
          />
          <RowSection
            label="Customer"
            content={`${data?.customer.fname} ${data?.customer.lname}`}
          />
          <RowSection label="Current Status" content={data?.currentState} />
        </div>

        <Divider />

        <div className="Spacer">Products</div>
        {data?.lineItems.map((item, index) => (
          <RowSection
            key={item._id}
            label={(index + 1).toString()}
            content={item.name}
          />
        ))}

        <Divider />

        <div className="Spacer">History</div>
        <div style={{ backgroundColor: "#eee" }}>
          {data?.stateHistory.map((item) => (
            <RowSection
              key={item._id}
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
