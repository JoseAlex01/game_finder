import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage.jsx';
import GameDetail from '../../components/GameDetail/GameDetail.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import { useGameDetail } from '../../hooks/useGameDetail.js';
import styles from './DetailPage.module.css';

function DetailPage() {
  const { gameId } = useParams();
  const { game, loading, error } = useGameDetail(gameId);

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        Volver al catalogo
      </Link>
      {loading ? <Loading label="Cargando detalle..." /> : null}
      {!loading && error ? <ErrorMessage message={error} /> : null}
      {!loading && !error && game ? <GameDetail game={game} /> : null}
    </div>
  );
}

export default DetailPage;
