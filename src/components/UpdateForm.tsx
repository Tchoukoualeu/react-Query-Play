import { useState } from "react"
import { Button, Container, TextField, Paper } from "@mui/material"
import { StateType } from "../models/orderModels"
import { useUpdateAnOrder } from "../services/useUpdateAnOrder"

export const UpdateForm = ({
  currentStatus,
  id,
}: {
  id: string
  currentStatus?: StateType
}) => {
  const [name, setName] = useState("")

  const { mutation } = useUpdateAnOrder()

  if (currentStatus === "OPEN") {
    return (
      <Container
        component={Paper}
        sx={{ width: 500, margin: "10px auto", padding: "10px 0" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            mutation.mutate({
              _id: id,
              currentState: "IN_PROGRESS",
              createdAt: new Date().toISOString(),
              ...(name && { assignedTo: name }),
            })
          }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <TextField
            required
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            disabled={!name}
            type="submit"
            variant="contained"
          >{`Set as in_progress`}</Button>
        </form>
      </Container>
    )
  }

  if (currentStatus === "IN_PROGRESS") {
    return (
      <Button
        variant="contained"
        onClick={() =>
          mutation.mutate({
            _id: id as string,
            currentState: "COMPLETE",
            createdAt: new Date().toISOString(),
          })
        }
      >{`Set as complete`}</Button>
    )
  }

  return <div />
}
