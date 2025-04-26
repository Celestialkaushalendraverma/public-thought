import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import WriteBlog from './pages/WriteBlog';
import BlogDetail from './pages/BlogDetail';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header />
      
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/write" element={<WriteBlog />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
