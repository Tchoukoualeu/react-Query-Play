import axios from "axios"
import { OrderI, UpdatePayload } from "../models/orderModels"

export function useUpdateAnOrder() {
  const updateOrder = (data: UpdatePayload) =>
    axios
      .post("http://localhost:3001/orders/update", data)
      .then((res) => res.data.data as OrderI[])

  return { updateOrder }
}
