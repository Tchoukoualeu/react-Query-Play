import "./App.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { OrdersPage } from "./pages/OrdersPage"
import { SingleOrder } from "./pages/SingleOrder"

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router basename={process.env.REACT_APP_CUSTOM_PATH}>
          <Routes>
            <Route path="/order/:id" element={<SingleOrder />}></Route>
            <Route path="/" element={<OrdersPage />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App
