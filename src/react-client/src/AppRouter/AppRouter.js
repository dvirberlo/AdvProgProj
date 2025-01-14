import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "../HomePage/HomePage";
import { DummyPage } from "../DummyPage/DummyPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="dummy" element={<DummyPage />} />
      </Routes>
    </BrowserRouter>
  );
};
