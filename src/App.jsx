import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appShell}>
      <Navbar />
      <main className={styles.main}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
