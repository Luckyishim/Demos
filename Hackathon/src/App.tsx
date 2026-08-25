import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { PropertySearchPage } from './pages/PropertySearchPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { ValuationFormPage } from './pages/ValuationFormPage';
import { ValuationProcessingPage } from './pages/ValuationProcessingPage';
import { ValuationResultPage } from './pages/ValuationResultPage';
import { MarketInsightsPage } from './pages/MarketInsightsPage';
import { ValuationReportPage } from './pages/ValuationReportPage';
import { DashboardPage } from './pages/DashboardPage';
import { SavedPropertiesPage } from './pages/SavedPropertiesPage';
import { ValuationHistoryPage } from './pages/ValuationHistoryPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="properties" element={<PropertySearchPage />} />
        <Route path="property/:id" element={<PropertyDetailsPage />} />
        <Route path="valuation" element={<ValuationFormPage />} />
        <Route path="valuation-processing" element={<ValuationProcessingPage />} />
        <Route path="valuation-result" element={<ValuationResultPage />} />
        <Route path="market-insights" element={<MarketInsightsPage />} />
        <Route path="valuation-report" element={<ValuationReportPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="saved" element={<SavedPropertiesPage />} />
        <Route path="history" element={<ValuationHistoryPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
