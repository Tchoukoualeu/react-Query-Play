import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { OrderI, UpdatePayload } from "../models/orderModels"

export function useUpdateAnOrder() {
  const updateOrder = (data: UpdatePayload) =>
    axios
      .post("http://localhost:3001/orders/update", data)
      .then((res) => res.data.data as OrderI[])

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: UpdatePayload) => updateOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fect-order-by-id"],
      })
    },
  })

  return { mutation }
}
