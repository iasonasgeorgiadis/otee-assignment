import type { FC, useState } from 'react';
import './App.css';
import { OTeeAssignment } from './pages/OTeeAssignment';
import { OTeeAssignment2 } from './pages/OTeeAssignment2';
import { Button } from './components/Button';

const App: FC = () => {
  const [showVersion2, setShowVersion2] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Version toggle button - positioned absolutely in top-right */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '8px',
        padding: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Button
          variant="neutral"
          size="small"
          onClick={() => setShowVersion2(!showVersion2)}
        >
          {showVersion2 ? 'Show V1' : 'Show V2'}
        </Button>
      </div>

      {/* Main content */}
      {showVersion2 ? <OTeeAssignment2 /> : <OTeeAssignment />}
    </div>
  );
};

export default App;
