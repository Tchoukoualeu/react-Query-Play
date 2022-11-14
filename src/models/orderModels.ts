export interface OrderI {
  _id: string
  lastUpdatedAt: string
  createdAt: string
  customer: {
    fname: string
    lname: string
  }
  lineItems: [
    {
      _id: string
      sku: string
      name: string
    }
  ]
  currentState: StateType
  stateHistory: [
    {
      _id: string
      state: StateType
      createdAt: string
      assignedTo: string
    }
  ]
}

export type StateType = "OPEN" | "IN_PROGRESS" | "COMPLETE"

export type UpdatePayload = {
  _id: string
  currentState: StateType
  createdAt: string
  assignedTo?: string
}
