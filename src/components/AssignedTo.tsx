import { OrderI } from "../models/orderModels"
import { RowSection } from "./RowSection"

export const AssignedTo = ({ data }: { data?: OrderI }) => {
  if (!data) return <div />

  if (data.currentState !== "IN_PROGRESS") return <div />

  const inProgress = data.stateHistory.find(
    (item) => item.state === "IN_PROGRESS"
  )

  return <RowSection label="Assignee" content={inProgress?.assignedTo} />
}
