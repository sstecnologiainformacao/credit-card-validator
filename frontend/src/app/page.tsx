'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import Validator from "./validator";

const queryClient = new QueryClient()

export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
      <Validator />
    </QueryClientProvider>
  );
}

