import { lazy, Suspense } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BoldHome } from './components/BoldHome';
import { PageRouteSkeleton } from './components/Skeleton';

// Code-split secondary routes so visitors only download the pages they navigate to
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((mod) => ({ default: mod.AboutPage }))
);
const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((mod) => ({ default: mod.ProductsPage }))
);
const CalculatorPage = lazy(() =>
  import('./pages/CalculatorPage').then((mod) => ({ default: mod.CalculatorPage }))
);
const QuotationPage = lazy(() =>
  import('./pages/QuotationPage').then((mod) => ({ default: mod.QuotationPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((mod) => ({ default: mod.ContactPage }))
);

function AppShell() {
  const { route } = useApp();

  const renderPage = () => {
    switch (route) {
      case '/':
        return <BoldHome />;
      case '/about':
        return <AboutPage />;
      case '/products':
        return <ProductsPage />;
      case '/calculator':
        return <CalculatorPage />;
      case '/request-quotation':
        return <QuotationPage />;
      case '/contact':
        return <ContactPage />;
      default:
        return <BoldHome />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors bg-[#F6F3EC] text-[#1F2720] dark:bg-[#121813] dark:text-[#F4F1E8]">
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageRouteSkeleton />}>{renderPage()}</Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
