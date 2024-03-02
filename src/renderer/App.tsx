import 'tailwindcss/tailwind.css'
import '@rStyles/globals.css'
import { MemoryRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppRoutes } from '@rRoutes/AppRoutes'

const client = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  )
}
