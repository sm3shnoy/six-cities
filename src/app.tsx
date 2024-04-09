import MainPage from './pages/main-page';
import { TPreviewOffer } from './types/preview-offer';

const App = ({ offers }: { offers: TPreviewOffer[] }) => (
  <MainPage offers={offers} />
);

export default App;
