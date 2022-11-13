import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Table } from "./components/Table"
import { Order } from "./components/Order"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router basename={process.env.REACT_APP_CUSTOM_PATH}>
          <Routes>
            <Route path="/order/:id" element={<Order />}></Route>
            <Route path="/orders" element={<Table />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App
