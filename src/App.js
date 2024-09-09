import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import HomePage from "./pages/Homepage";
import MovieDetailPage from "./pages/MovieDetail";
import MovieSelectPage from "./pages/MovieSelect";
import MovieSearchPage from "./pages/MovieSearch";
import MovieSortPage from "./pages/MovieSort";
function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/detail/:id" element={<MovieDetailPage />} />
            <Route path="/movie/list" element={<MovieSelectPage />} />
            <Route path="/movie/search" element={<MovieSearchPage />} />
            <Route path="/movie/sort" element={<MovieSortPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
