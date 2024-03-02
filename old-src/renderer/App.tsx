import 'tailwindcss/tailwind.css'
import '@styles/globals.css'
import { AppRoutes } from '@routes/AppRoutes'
import { MemoryRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

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
