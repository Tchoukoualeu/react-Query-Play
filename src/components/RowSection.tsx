import { FC, ReactNode } from "react"

export const RowSection: FC<{
  label: string
  content?: string | number | null | ReactNode
}> = ({ label, content }) => (
  <div className="RowSection__Column">
    <div className="RowSection__Label">{label}</div>
    {!!content && <div className="RowSection__Content">{content}</div>}
  </div>
)
