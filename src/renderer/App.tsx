import 'tailwindcss/tailwind.css';
import { AppRoutes } from '@routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}
