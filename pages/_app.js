import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Pour s'assurer que les icônes FA s'affichent bien

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;