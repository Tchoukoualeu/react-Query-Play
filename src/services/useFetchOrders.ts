import axios from "axios"
import { OrderI } from "../models/orderModels"

export function useFetchOrders() {
  const fetchOrder = () =>
    axios
      .get("http://localhost:3001/orders")
      .then((res) => res.data.data as OrderI[])

  const fetchOrderById = (id: string) =>
    axios
      .get(`http://localhost:3001/orders/${id}`)
      .then((res) => res.data.data as OrderI)

  return { fetchOrder, fetchOrderById }
}
