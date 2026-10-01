import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router as WouterRouter, Route, Switch, useLocation } from 'wouter';

import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Loadout } from '@/components/Loadout';
import { RouteTransition } from '@/components/RouteTransition';
import { ScrollToTop } from '@/components/ScrollToTop';
import { LanguageProvider } from '@/i18n';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Courses from '@/pages/Courses';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <ScrollToTop />
      <RouteTransition locationKey={location}>
        <Switch>
          <Route path="/"        component={Home} />
          <Route path="/about"   component={About} />
          <Route path="/courses" component={Courses} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </RouteTransition>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Loadout />
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
}