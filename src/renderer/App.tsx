import 'tailwindcss/tailwind.css';
import '@rStyles/globals.css';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppRoutes } from '@rRoutes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@rComponents/ui/toaster';

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <AppRoutes />
      </Router>

      <Toaster />

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
