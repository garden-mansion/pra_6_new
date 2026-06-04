import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../shared/ui/Layout";
import { HomePage } from "../pages/home";
import { ArticlePage } from "../pages/article";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="article/:slug" element={<ArticlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
