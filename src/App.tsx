import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';

// Layout & Sections
import Preloader from './components/layout/Preloader';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import GradualBlur from './components/GradualBlur';
import Projects from './components/sections/Projects';
import Team from './components/sections/Team';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';
import Anniversary from './components/sections/Anniversary';
import ProjectPageLoader from './components/sections/Projects/ProjectPageLoader';
import './App.css';

const StepIntoIndustry = lazy(() => import('./components/sections/Projects/StepIntoIndustry'));
const EventDetailsPage = lazy(() => import('./components/sections/Projects/EventDetailsPage'));

const RouteAwareHeader = () => {
    const { pathname } = useLocation();
    const isEventPage = pathname === '/step-into-industry' || pathname.startsWith('/projects/');

    return isEventPage ? null : <Header />;
};

const RouteAwareFooter = () => {
    const { pathname } = useLocation();
    const isEventPage = pathname === '/step-into-industry' || pathname.startsWith('/projects/');

    return isEventPage ? null : (
        <div className="relative z-50 bg-[#00040a]">
            <Footer />
        </div>
    );
};

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Preloader onLoadingComplete={handleLoadingComplete} />

            <div
                className={`App ${!isLoading ? 'app-slide-in' : ''}`}
                style={{ display: !isLoading ? 'block' : 'none' }}
            >
                <Router>
                    {/* Added a flex column layout wrapper to ensure proper footer pushing */}
                    <div className="relative flex flex-col min-h-screen">
                        <RouteAwareHeader />
                        
                        {/* Main content takes up available flex space */}
                        <main className="flex-grow">
                            <Routes>
                                {/* Main Landing Page Route */}
                                <Route path="/" element={
                                    <>
                                        <Anniversary />
                                        <Hero />
                                        <About />
                                        <Projects />
                                        <Team />
                                        <FAQ />
                                        <Contact />
                                    </>
                                } />

                                <Route
                                    path="/step-into-industry"
                                    element={
                                        <Suspense fallback={<ProjectPageLoader />}>
                                            <StepIntoIndustry />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path="/projects/:eventSlug"
                                    element={
                                        <Suspense fallback={<ProjectPageLoader />}>
                                            <EventDetailsPage />
                                        </Suspense>
                                    }
                                />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </main>

                        {/* 
                          GLOBAL STICKY BOTTOM BLUR 
                          fixed, stays at the bottom, pointer-events-none ensures it doesn't block clicks
                          z-40 puts it just under the footer (which is z-50)
                        */}
                        <div className="fixed bottom-0 inset-x-0 z-40 pointer-events-none">
                            <GradualBlur
                                target="parent"
                                position="bottom"
                                height="7rem"
                                strength={2}
                                divCount={5}
                                curve="bezier"
                                exponential
                                opacity={1}
                            />
                        </div>

                        {/* 
                          FOOTER WRAPPER
                          relative and z-50 ensures the footer scrolls *over* the fixed blur
                        */}
                        <RouteAwareFooter />

                        <ScrollToTop />
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;
