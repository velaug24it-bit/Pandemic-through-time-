/**
 * Pathogen3DViewer.jsx
 * Master 3D Pathogen Viewer routing to the exact unique model for each pandemic.
 * Supports:
 *  - Normal View (PBR rendering + animated idle)
 *  - Cross-Section Cutaway View (Inner RNA/DNA/nucleoid structure)
 *  - Exploded Biological View (Separates envelope, membrane, and inner core)
 *  - Holographic Wireframe Mode
 */
import BlackDeathModel      from './BlackDeathModel';
import SmallpoxModel        from './SmallpoxModel';
import SpanishFluModel      from './SpanishFluModel';
import Covid19Model         from './Covid19Model';
import SarsModel            from './SarsModel';
import MersModel            from './MersModel';
import EbolaModel           from './EbolaModel';
import ZikaModel            from './ZikaModel';
import SwineFluModel        from './SwineFluModel';
import CholeraModel         from './CholeraModel';
import TuberculosisModel    from './TuberculosisModel';
import JustinianPlagueModel from './JustinianPlagueModel';

export default function Pathogen3DViewer({
  pandemic,
  viewMode = 'normal',
  wireframe = false,
  position = [0, 0, 0],
}) {
  if (!pandemic) return null;

  const modelKey = pandemic.exhibitModel || pandemic.id;

  const renderModel = () => {
    switch (modelKey) {
      case 'black-death':
        return <BlackDeathModel viewMode={viewMode} wireframe={wireframe} />;
      case 'smallpox-americas':
      case 'smallpox':
        return <SmallpoxModel viewMode={viewMode} wireframe={wireframe} />;
      case 'spanish-flu':
        return <SpanishFluModel viewMode={viewMode} wireframe={wireframe} />;
      case 'covid-19':
        return <Covid19Model viewMode={viewMode} wireframe={wireframe} />;
      case 'sars-cov-1':
      case 'sars':
        return <SarsModel viewMode={viewMode} wireframe={wireframe} />;
      case 'mers-cov':
      case 'mers':
        return <MersModel viewMode={viewMode} wireframe={wireframe} />;
      case 'ebola-outbreak':
      case 'ebola':
        return <EbolaModel viewMode={viewMode} wireframe={wireframe} />;
      case 'zika-outbreak':
      case 'zika':
        return <ZikaModel viewMode={viewMode} wireframe={wireframe} />;
      case 'h1n1-swine-flu':
      case 'swine-flu':
        return <SwineFluModel viewMode={viewMode} wireframe={wireframe} />;
      case 'cholera-pandemics':
      case 'cholera':
        return <CholeraModel viewMode={viewMode} wireframe={wireframe} />;
      case 'tuberculosis-history':
      case 'tuberculosis':
        return <TuberculosisModel viewMode={viewMode} wireframe={wireframe} />;
      case 'plague-justinian':
      case 'justinian-plague':
        return <JustinianPlagueModel viewMode={viewMode} wireframe={wireframe} />;
      default:
        return <Covid19Model viewMode={viewMode} wireframe={wireframe} />;
    }
  };

  return (
    <group position={position}>
      {renderModel()}
    </group>
  );
}
