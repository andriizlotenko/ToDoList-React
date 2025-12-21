import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import TodoList from './components/TodoList';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Testimonials from './pages/Testimonials';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="testimonials" element={<Testimonials />} />

          <Route path="todo-list" element={<TodoList />} />

          <Route path="*" element={<h2>404 Not Found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}