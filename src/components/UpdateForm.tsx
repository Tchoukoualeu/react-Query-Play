import { Button, Container, TextField, Paper } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { StateType, UpdatePayload } from "../models/orderModels"
import { useUpdateAnOrder } from "../services/useUpdateAnOrder"

export const UpdateForm = ({
  currentStatus,
  id,
}: {
  id?: string
  currentStatus?: StateType
}) => {
  const [name, setName] = useState("")

  const { updateOrder } = useUpdateAnOrder()

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: UpdatePayload) => updateOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fect-order-by-id"],
      })
    },
  })

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
              _id: id as string,
              currentState: "IN_PROGRESS",
              createdAt: new Date().toDateString(),
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
            createdAt: new Date().toDateString(),
          })
        }
      >{`Set as complete`}</Button>
    )
  }

  return <div />
}
