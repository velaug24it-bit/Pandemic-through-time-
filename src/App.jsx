/**
 * App.jsx
 * Root application component.
 * AAA Cinematic Journey & Multiphase State Machine:
 *  - Stage 0: LOADING (LoadingScreen)
 *  - Stage 1: CINEMATIC_INTRO (MissionBriefing)
 *  - Stage 2: ROCKET_LAUNCH (RocketLaunch 3D)
 *  - Stage 3: SPACE_FLIGHT (Space Flight 3D)
 *  - Stage 4: ORBITAL_STATION (Station Flyby & Docking)
 *  - Stage 5: COMMAND_CENTER (Airlock Walkthrough & Panoramic Window)
 *  - Stage 6: MISSION_CONTROL (Mission Control Dashboard)
 *  - Stage 7: EARTH_VIEW (Phase 2 Interactive Digital Earth)
 *  - Stage 8: TIME_TRAVEL (Phase 3 Time Machine Warp Sequence)
 *  - Stage 9: HISTORICAL_MUSEUM (Phase 3 Historical Pandemic Museum with Unique 3D Pathogens)
 *  - Stage 10: SHRINK_TRANSITION (Phase 4 Miniaturization Shrink Sequence)
 *  - Stage 11: HUMAN_BODY_JOURNEY (Phase 4 3D Microscopic Body World)
 *  - Stage 12: AI_LABORATORY (Phase 5 AI Biomedical Research Laboratory & Vaccine Center)
 *  - Stage 13: OUTBREAK_SIMULATOR (Phase 6 Global Outbreak Simulator & WHO Command Center)
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCENE_STAGES, SIMULATION_SCENARIOS } from './utils/constants';
import { useAudio } from './hooks/useAudio';
import { HISTORICAL_PANDEMICS } from './data/historicalPandemics';
import { SimulationEngine } from './utils/simulationEngine';

// Phase 1 UI & 3D imports
import LoadingScreen from './components/ui/LoadingScreen';
import MissionBriefing from './components/ui/MissionBriefing';
import HUD from './components/ui/HUD';
import MissionControl from './components/missioncontrol/MissionControl';
import MainScene from './scenes/MainScene';

// Phase 2 Interactive Earth imports
import EarthScene from './scenes/EarthScene';
import EarthHUD from './components/ui/EarthHUD';
import SearchBar from './components/ui/SearchBar';
import EarthControlBar from './components/ui/EarthControlBar';
import CountryInfoPanel from './components/ui/CountryInfoPanel';
import EarthStatusPanels from './components/ui/EarthStatusPanels';
import MiniGlobe from './components/ui/MiniGlobe';
import CountrySearchBox from './components/earth/CountrySearchBox';
import CountryProfileDrawer from './components/earth/CountryProfileDrawer';

// Phase 3 Time Machine & Museum imports
import TimeTravelOverlay from './components/timemachine/TimeTravelOverlay';
import MuseumScene from './scenes/MuseumScene';
import MuseumHUD from './components/museum/MuseumHUD';
import PandemicGalleryDrawer from './components/museum/PandemicGalleryDrawer';
import InteractiveTimelineSlider from './components/museum/InteractiveTimelineSlider';
import AchievementsPanel from './components/museum/AchievementsPanel';
import BiologicalInfoPanel from './components/museum/BiologicalInfoPanel';
import PathogenComparisonModal from './components/museum/PathogenComparisonModal';

// Phase 4 Human Body Journey imports
import ShrinkTransitionOverlay from './components/humanbody/ShrinkTransitionOverlay';
import BodyScene from './scenes/BodyScene';
import BodyHUD from './components/humanbody/BodyHUD';
import OrganSelectorBar from './components/humanbody/OrganSelectorBar';
import InfectionControlPanel from './components/humanbody/InfectionControlPanel';
import MicroscopicAIGuide from './components/humanbody/MicroscopicAIGuide';

// Phase 5 AI Research Laboratory imports
import LabScene from './scenes/LabScene';
import LabHUD from './components/researchlab/LabHUD';
import WorkstationSelectorBar from './components/researchlab/WorkstationSelectorBar';
import PathogenAnalysisStation from './components/researchlab/PathogenAnalysisStation';
import GenomeSequencingLab from './components/researchlab/GenomeSequencingLab';
import DigitalMicroscopeStation from './components/researchlab/DigitalMicroscopeStation';
import AIDiagnosticCenter from './components/researchlab/AIDiagnosticCenter';
import DrugDiscoveryLab from './components/researchlab/DrugDiscoveryLab';
import VaccinePipelineCenter from './components/researchlab/VaccinePipelineCenter';
import GlobalResearchDashboard from './components/researchlab/GlobalResearchDashboard';

// Phase 6 Global Outbreak Simulator imports
import OutbreakScene from './scenes/OutbreakScene';
import GlobalMetricsHeader from './components/outbreak/GlobalMetricsHeader';
import SimControlBar from './components/outbreak/SimControlBar';
import PolicyDirectivePanel from './components/outbreak/PolicyDirectivePanel';
import ResourceAllocationDrawer from './components/outbreak/ResourceAllocationDrawer';
import NewsTickerPanel from './components/outbreak/NewsTickerPanel';
import AICommandAdvisor from './components/outbreak/AICommandAdvisor';
import OutbreakSummaryModal from './components/outbreak/OutbreakSummaryModal';
import ScenarioMissionBar from './components/outbreak/ScenarioMissionBar';
import LiveAnalyticsModal from './components/outbreak/LiveAnalyticsModal';
import CountryOutbreakModal from './components/outbreak/CountryOutbreakModal';

// Phase 7 BioShield 2050 Smart City imports
import BioShieldScene from './scenes/BioShieldScene';
import BioShieldHUD from './components/bioshield/BioShieldHUD';
import DigitalTwinDrawer from './components/bioshield/DigitalTwinDrawer';
import EmergencyActionPanel from './components/bioshield/EmergencyActionPanel';
import SmartHospitalModal from './components/bioshield/SmartHospitalModal';
import PublicEducationModal from './components/bioshield/PublicEducationModal';
import GlobalCooperationModal from './components/bioshield/GlobalCooperationModal';
import FinalHallOfKnowledgeModal from './components/bioshield/FinalHallOfKnowledgeModal';
import { BIOSHIELD_BUILDINGS, CHALLENGE_SCENARIOS } from './utils/constants';

// Phase 8 Global Collaboration & Crisis Challenge imports
import ChallengeScene from './scenes/ChallengeScene';
import ChallengeHUD from './components/challenge/ChallengeHUD';
import MissionSelectionModal from './components/challenge/MissionSelectionModal';
import MissionRunnerModal from './components/challenge/MissionRunnerModal';
import KnowledgeQuizModal from './components/challenge/KnowledgeQuizModal';
import PersonalDashboardModal from './components/challenge/PersonalDashboardModal';
import MasterTimelineModal from './components/challenge/MasterTimelineModal';
import GrandCertificateModal from './components/challenge/GrandCertificateModal';

// Phase 9 Global Health Intelligence & Digital Twin Platform imports
import IntelligenceScene from './scenes/IntelligenceScene';
import IntelligenceHUD from './components/intelligence/IntelligenceHUD';
import DigitalTwinEarthModal from './components/intelligence/DigitalTwinEarthModal';
import KnowledgeGraphModal from './components/intelligence/KnowledgeGraphModal';
import MasterTimelineExplorer from './components/intelligence/MasterTimelineExplorer';
import ResearchArchiveModal from './components/intelligence/ResearchArchiveModal';
import AnalyticsDashboardModal from './components/intelligence/AnalyticsDashboardModal';
import AIAssistantLibraryModal from './components/intelligence/AIAssistantLibraryModal';
// Phase 10 WebXR VR Conversion imports
import VRButton from './components/vr/VRButton';




export default function App() {
  const [stage, setStage] = useState(SCENE_STAGES.LOADING);
  const [muted, setMuted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const audio = useAudio();

  /* ── Stage advance helper ── */
  const goTo = useCallback((s) => setStage(s), []);

  // Phase 2 Earth View state
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showShield, setShowShield] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const earthRotYRef = useRef(0);

  // Phase 3 Time Machine & Museum state
  const [activePandemic, setActivePandemic] = useState(HISTORICAL_PANDEMICS[0]);
  const [exploredPandemics, setExploredPandemics] = useState(new Set([HISTORICAL_PANDEMICS[0].id]));
  const [showAchievements, setShowAchievements] = useState(false);
  const [viewMode, setViewMode] = useState('normal');
  const [wireframe, setWireframe] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  // Phase 4 Human Body state
  const [activeOrganId, setActiveOrganId] = useState('bloodstream');
  const [bodyViewMode, setBodyViewMode] = useState('bloodstream');
  const [infectionStep, setInfectionStep] = useState(0);

  // Phase 5 AI Research Lab state
  const [activeStationId, setActiveStationId] = useState('analysis');

  // Phase 6 Outbreak Simulator state
  const [activeScenarioId, setActiveScenarioId] = useState('covid');
  const [simEngine, setSimEngine] = useState(() => new SimulationEngine('covid'));
  const [simState, setSimState] = useState(() => simEngine.getState());
  const [simRunning, setSimRunning] = useState(true);
  const [simSpeed, setSimSpeed] = useState(1);
  const [showSimSummary, setShowSimSummary] = useState(false);
  const [showLiveAnalytics, setShowLiveAnalytics] = useState(false);
  const [selectedCountryProfile, setSelectedCountryProfile] = useState(null);

  // Phase 7 BioShield 2050 Smart City state
  const [isNight, setIsNight] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(BIOSHIELD_BUILDINGS[0]);
  const [activeBioActions, setActiveBioActions] = useState([]);
  const [showSmartHospitalModal, setShowSmartHospitalModal] = useState(false);
  const [showPublicEducationModal, setShowPublicEducationModal] = useState(false);
  const [showGlobalCooperationModal, setShowGlobalCooperationModal] = useState(false);
  const [showFinalHallModal, setShowFinalHallModal] = useState(false);

  const toggleBioAction = useCallback((actionId) => {
    setActiveBioActions(prev =>
      prev.includes(actionId) ? prev.filter(a => a !== actionId) : [...prev, actionId]
    );
  }, []);

  const handleStartBioShield = useCallback(() => {
    audio.playWhoosh();
    goTo(SCENE_STAGES.BIOSHIELD_2050);
  }, [audio, goTo]);

  // Phase 8 Global Challenge Platform state
  const [userName, setUserName] = useState(() => localStorage.getItem('pandemic_username') || 'Commander Director');
  const [completedMissions, setCompletedMissions] = useState(['plague', 'influenza', 'covid']);
  const [activeChallengeScenario, setActiveChallengeScenario] = useState(null);
  const [showMissionWallModal, setShowMissionWallModal] = useState(false);
  const [showMissionRunnerModal, setShowMissionRunnerModal] = useState(false);
  const [showKnowledgeQuizModal, setShowKnowledgeQuizModal] = useState(false);
  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showGrandCertificateModal, setShowGrandCertificateModal] = useState(false);

  const updateUserName = useCallback((newName) => {
    setUserName(newName);
    localStorage.setItem('pandemic_username', newName);
  }, []);

  const handleStartChallengePlatform = useCallback(() => {
    audio.playWhoosh();
    goTo(SCENE_STAGES.CHALLENGE_PLATFORM);
  }, [audio, goTo]);

  const handleSelectChallengeScenario = useCallback((scenario) => {
    setActiveChallengeScenario(scenario);
    setShowMissionWallModal(false);
    setShowMissionRunnerModal(true);
  }, []);

  const handleCompleteMission = useCallback((scenarioId) => {
    setCompletedMissions(prev => Array.from(new Set([...prev, scenarioId])));
    setShowMissionRunnerModal(false);
    setShowKnowledgeQuizModal(true);
  }, []);

  const handleFinishQuiz = useCallback(() => {
    setShowKnowledgeQuizModal(false);
    setShowGrandCertificateModal(true);
  }, []);

  // Phase 9 Global Health Intelligence Platform state
  const [showDigitalTwinModal, setShowDigitalTwinModal] = useState(false);
  const [showKnowledgeGraphModal, setShowKnowledgeGraphModal] = useState(false);
  const [showMasterTimelineModal, setShowMasterTimelineModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showAnalyticsDashboardModal, setShowAnalyticsDashboardModal] = useState(false);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showAccessibilityModal, setShowAccessibilityModal] = useState(false);

  const handleStartIntelligencePlatform = useCallback(() => {
    audio.playWhoosh();
    goTo(SCENE_STAGES.INTELLIGENCE_PLATFORM);
  }, [audio, goTo]);

  const handleSelectScenario = useCallback((scenarioId) => {
    setActiveScenarioId(scenarioId);
    const newEngine = new SimulationEngine(scenarioId);
    setSimEngine(newEngine);
    setSimState(newEngine.getState());
  }, []);

  const resetSimulation = useCallback(() => {
    const newEngine = new SimulationEngine(activeScenarioId);
    setSimEngine(newEngine);
    setSimState(newEngine.getState());
  }, [activeScenarioId]);

  const togglePolicy = useCallback((policy) => {
    simEngine.togglePolicy(policy);
    setSimState(simEngine.getState());
  }, [simEngine]);


  /* ── Loading → Mission Briefing ── */
  const onLoadComplete = useCallback(() => {
    audio.initAudio();
    audio.startSpaceAmbience();
    goTo(SCENE_STAGES.CINEMATIC_INTRO);
  }, [audio, goTo]);

  /* ── Mission Briefing → Rocket Launch ── */
  const onBriefingComplete = useCallback(() => {
    audio.playWhoosh();
    audio.startRocketEngine();
    goTo(SCENE_STAGES.ROCKET_LAUNCH);
  }, [audio, goTo]);

  /* ── Rocket → Space Flight → Orbital Station → Docking → Walkthrough → Mission Control ── */
  const onRocketComplete = useCallback(() => {
    audio.stopRocketEngine();
    audio.playWhoosh();
    audio.playRadioChatter();
    setCountdown(null);
    goTo(SCENE_STAGES.SPACE_FLIGHT);

    // Auto-advance to orbital station after 5s
    setTimeout(() => {
      goTo(SCENE_STAGES.ORBITAL_STATION);

      // Docking sequence
      setTimeout(() => {
        audio.playDockingSound();

        // Auto-advance to command center airlock walkthrough
        setTimeout(() => {
          audio.playPressureRelease();
          audio.playAirlockDoor();
          goTo(SCENE_STAGES.COMMAND_CENTER);

          // Auto-advance to mission control after 3s walkthrough
          setTimeout(() => {
            audio.startComputerHum();
            audio.missionBeep();
            goTo(SCENE_STAGES.MISSION_CONTROL);
          }, 3200);
        }, 2000);
      }, 2500);
    }, 5000);
  }, [audio, goTo]);

  /* ── Launch Time Machine Warp to selected pandemic ── */
  const handleSelectPandemic = useCallback((pandemic) => {
    audio.playWhoosh();
    audio.missionBeep();
    setActivePandemic(pandemic);
    setExploredPandemics((prev) => new Set([...prev, pandemic.id]));
    setViewMode('normal');
    setWireframe(false);
    goTo(SCENE_STAGES.TIME_TRAVEL);
  }, [audio, goTo]);

  /* ── Warp Complete → Museum Hall ── */
  const handleWarpComplete = useCallback(() => {
    goTo(SCENE_STAGES.HISTORICAL_MUSEUM);
  }, [goTo]);

  /* ── Launch Phase 4 Human Body Journey ── */
  const handleStartHumanBodyJourney = useCallback(() => {
    audio.playWhoosh();
    audio.missionBeep();
    goTo(SCENE_STAGES.SHRINK_TRANSITION);
  }, [audio, goTo]);

  /* ── Shrink Complete → 3D Microscopic Body World ── */
  const handleShrinkComplete = useCallback(() => {
    audio.startBloodstreamAudio();
    goTo(SCENE_STAGES.HUMAN_BODY_JOURNEY);
  }, [audio, goTo]);

  /* ── Launch Phase 5 AI Research Laboratory ── */
  const handleStartAILaboratory = useCallback(() => {
    audio.stopBloodstreamAudio();
    audio.playWhoosh();
    audio.startLabAmbience();
    goTo(SCENE_STAGES.AI_LABORATORY);
  }, [audio, goTo]);

  /* ── Launch Phase 6 Global Outbreak Simulator ── */
  const handleStartOutbreakSim = useCallback(() => {
    audio.stopLabAmbience();
    audio.playWhoosh();
    audio.playEmergencySiren();
    goTo(SCENE_STAGES.OUTBREAK_SIMULATOR);
  }, [audio, goTo]);

  /* ── Return handlers ── */
  const handleReturnToMuseum = useCallback(() => {
    audio.stopBloodstreamAudio();
    audio.playWhoosh();
    goTo(SCENE_STAGES.HISTORICAL_MUSEUM);
  }, [audio, goTo]);

  const handleReturnToMissionControl = useCallback(() => {
    audio.stopLabAmbience();
    audio.playWhoosh();
    goTo(SCENE_STAGES.MISSION_CONTROL);
  }, [audio, goTo]);

  /* ── Navigation from Mission Control portal ── */
  const handlePortalNavigate = useCallback((portalId) => {
    if (portalId === 'mission-control') {
      audio.playWhoosh();
      audio.missionBeep();
      goTo(SCENE_STAGES.EARTH_VIEW);
    } else if (portalId === 'timeline') {
      handleSelectPandemic(HISTORICAL_PANDEMICS[0]);
    } else if (portalId === 'human-body') {
      handleStartHumanBodyJourney();
    } else if (portalId === 'laboratory') {
      handleStartAILaboratory();
    } else if (portalId === 'outbreak-sim') {
      handleStartOutbreakSim();
    } else if (portalId === 'bioshield') {
      handleStartBioShield();
    } else if (portalId === 'challenge') {
      handleStartChallengePlatform();
    } else if (portalId === 'intelligence') {
      handleStartIntelligencePlatform();
    }
  }, [audio, goTo, handleSelectPandemic, handleStartHumanBodyJourney, handleStartAILaboratory, handleStartOutbreakSim, handleStartBioShield, handleStartChallengePlatform, handleStartIntelligencePlatform]);

  /* ── Mute toggle ── */
  const toggleMute = useCallback(() => {
    setMuted((m) => {
      audio.setVolume(m ? 0.6 : 0);
      return !m;
    });
  }, [audio]);

  /* ── Phase 6 Simulation Interval ── */
  useEffect(() => {
    if (stage !== SCENE_STAGES.OUTBREAK_SIMULATOR || !simRunning) return;
    const timer = setInterval(() => {
      setSimState(simEngine.step(simSpeed));
    }, 1000);
    return () => clearInterval(timer);
  }, [stage, simRunning, simSpeed, simEngine]);

  /* ── Periodic mission beeps ── */
  useEffect(() => {
    if (stage !== SCENE_STAGES.MISSION_CONTROL && stage !== SCENE_STAGES.EARTH_VIEW && stage !== SCENE_STAGES.HISTORICAL_MUSEUM) return;
    const id = setInterval(() => audio.missionBeep(), 5000);
    return () => clearInterval(id);
  }, [stage, audio]);

  const isEarthView = stage === SCENE_STAGES.EARTH_VIEW;
  const isTimeTravel = stage === SCENE_STAGES.TIME_TRAVEL;
  const isMuseum = stage === SCENE_STAGES.HISTORICAL_MUSEUM;
  const isShrink = stage === SCENE_STAGES.SHRINK_TRANSITION;
  const isBodyJourney = stage === SCENE_STAGES.HUMAN_BODY_JOURNEY;
  const isAILab = stage === SCENE_STAGES.AI_LABORATORY;
  const isOutbreakSim = stage === SCENE_STAGES.OUTBREAK_SIMULATOR;
  const isBioShield = stage === SCENE_STAGES.BIOSHIELD_2050;
  const isChallenge = stage === SCENE_STAGES.CHALLENGE_PLATFORM;
  const isIntelligence = stage === SCENE_STAGES.INTELLIGENCE_PLATFORM;
  const showMissionControl = stage === SCENE_STAGES.MISSION_CONTROL;

  /** Countdown HTML overlay (outside R3F canvas) */
  const CountdownOverlay = () => (
    <AnimatePresence>
      {stage === SCENE_STAGES.ROCKET_LAUNCH && countdown !== null && countdown >= 0 && (
        <motion.div
          key={countdown}
          initial={{ scale: 2.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 400,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 15vw, 10rem)',
            fontWeight: 900,
            color: countdown <= 3 ? '#ff3860' : '#00c8ff',
            textShadow: `0 0 40px ${countdown <= 3 ? 'rgba(255,56,96,0.6)' : 'rgba(0,200,255,0.6)'}`,
            pointerEvents: 'none',
          }}
        >
          {countdown === 0 ? '🚀' : countdown}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div style={{ width: '100vw', height: '100dvh', background: '#010409', overflow: 'hidden', position: 'relative' }}>
      {/* ── Phase 10 WebXR VR Controller Button (Always accessible) ── */}
      <VRButton />

      {/* ── Phase 1 MainScene Canvas (stages 2-6) ── */}
      {stage >= SCENE_STAGES.CINEMATIC_INTRO && !isEarthView && !isTimeTravel && !isMuseum && !isShrink && !isBodyJourney && !isAILab && !isOutbreakSim && !isBioShield && !isChallenge && !isIntelligence && (
        <MainScene stage={stage} onRocketComplete={onRocketComplete} onCountdown={setCountdown} />
      )}

      {/* ── Phase 2 EarthScene Canvas (stage 7) ── */}
      {isEarthView && (
        <EarthScene
          autoRotate={autoRotate}
          showShield={showShield}
          showRoutes={showRoutes}
          showOrbits={showOrbits}
          onCountryHover={() => { }}
          onCountryClick={(country) => {
            audio.missionBeep();
            setSelectedCountry(country);
          }}
          earthRotYRef={earthRotYRef}
        />
      )}

      {/* ── Phase 3 MuseumScene Canvas (stage 9) ── */}
      {isMuseum && (
        <MuseumScene
          currentPandemic={activePandemic}
          viewMode={viewMode}
          wireframe={wireframe}
        />
      )}

      {/* ── Phase 4 BodyScene Canvas (stage 11) ── */}
      {isBodyJourney && (
        <BodyScene
          organId={activeOrganId}
          viewMode={bodyViewMode}
          infectionStep={infectionStep}
        />
      )}

      {/* ── Phase 5 LabScene Canvas (stage 12) ── */}
      {isAILab && (
        <LabScene activeStationId={activeStationId} />
      )}

      {/* ── Phase 6 OutbreakScene Canvas (stage 13) ── */}
      {isOutbreakSim && (
        <OutbreakScene isRunning={simRunning} />
      )}

      {/* ── Phase 7 BioShieldScene Canvas (stage 15) ── */}
      {isBioShield && (
        <BioShieldScene
          isNight={isNight}
          selectedBuildingId={selectedBuilding.id}
          onSelectBuilding={setSelectedBuilding}
        />
      )}

      {/* ── Phase 8 ChallengeScene Canvas (stage 16) ── */}
      {isChallenge && (
        <ChallengeScene />
      )}

      {/* ── Phase 9 IntelligenceScene Canvas (stage 17) ── */}
      {isIntelligence && (
        <IntelligenceScene />
      )}

      {/* ── 1. Premium Loading Screen ── */}
      {stage === SCENE_STAGES.LOADING && (
        <LoadingScreen onComplete={onLoadComplete} />
      )}

      {/* ── 2. Cinematic Mission Briefing ── */}
      {stage === SCENE_STAGES.CINEMATIC_INTRO && (
        <MissionBriefing onStartMission={onBriefingComplete} />
      )}

      {/* ── Standard HUD (Phase 1) ── */}
      {!isEarthView && !isMuseum && !isTimeTravel && !isShrink && !isBodyJourney && !isAILab && !isOutbreakSim && (
        <HUD stage={stage} onMute={toggleMute} muted={muted} />
      )}

      {/* ── Countdown overlay (HTML, outside canvas) ── */}
      <CountdownOverlay />

      {/* ── Mission Control Overlay (Phase 1) ── */}
      <MissionControl
        visible={showMissionControl}
        onNavigate={handlePortalNavigate}
      />

      {/* ── Phase 2 Interactive Earth UI Overlays ── */}
      {isEarthView && (
        <>
          <EarthHUD selectedCountry={selectedCountry} />
          <CountrySearchBox onSelectCountry={(c) => {
            audio.missionBeep();
            setSelectedCountry(c);
          }} selectedCountry={selectedCountry} />
          <CountryProfileDrawer
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
            onWarpToExhibit={(stageId) => {
              audio.playWhoosh();
              goTo(stageId);
            }}
          />
          <EarthStatusPanels />
          <MiniGlobe rotYRef={earthRotYRef} />

          <EarthControlBar
            autoRotate={autoRotate}
            onToggleRotate={() => setAutoRotate(r => !r)}
            showShield={showShield}
            onToggleShield={() => setShowShield(s => !s)}
            showRoutes={showRoutes}
            onToggleRoutes={() => setShowRoutes(r => !r)}
            showOrbits={showOrbits}
            onToggleOrbits={() => setShowOrbits(o => !o)}
            onZoomIn={() => { }}
            onZoomOut={() => { }}
            onReset={() => setSelectedCountry(null)}
            onBack={() => {
              audio.playWhoosh();
              goTo(SCENE_STAGES.MISSION_CONTROL);
            }}
          />
        </>
      )}

      {/* ── Phase 3 Time Machine Warp Overlay (stage 8) ── */}
      {isTimeTravel && (
        <TimeTravelOverlay
          targetPandemic={activePandemic}
          onWarpComplete={handleWarpComplete}
        />
      )}

      {/* ── Phase 3 Museum UI Overlays (stage 9) ── */}
      {isMuseum && (
        <>
          <MuseumHUD
            currentPandemic={activePandemic}
            exploredCount={exploredPandemics.size}
            onOpenAchievements={() => setShowAchievements(true)}
            onStartHumanBodyJourney={handleStartHumanBodyJourney}
            onReturnToMissionControl={() => {
              audio.playWhoosh();
              goTo(SCENE_STAGES.MISSION_CONTROL);
            }}
          />

          <BiologicalInfoPanel
            pandemic={activePandemic}
            viewMode={viewMode}
            onSetViewMode={setViewMode}
            wireframe={wireframe}
            onToggleWireframe={() => setWireframe(w => !w)}
            onOpenCompare={() => setShowCompare(true)}
          />

          <PandemicGalleryDrawer
            pandemic={activePandemic}
            onClose={() => { }}
            onStartHumanBodyJourney={handleStartHumanBodyJourney}
          />

          <InteractiveTimelineSlider
            currentPandemic={activePandemic}
            onSelectPandemic={handleSelectPandemic}
          />

          <AchievementsPanel
            visible={showAchievements}
            exploredCount={exploredPandemics.size}
            onClose={() => setShowAchievements(false)}
          />

          <PathogenComparisonModal
            visible={showCompare}
            currentPathogen={activePandemic}
            onClose={() => setShowCompare(false)}
          />
        </>
      )}

      {/* ── Phase 4 Miniaturization Shrink Overlay (stage 10) ── */}
      {isShrink && (
        <ShrinkTransitionOverlay onShrinkComplete={handleShrinkComplete} />
      )}

      {/* ── Phase 4 Human Body UI Overlays (stage 11) ── */}
      {isBodyJourney && (
        <>
          <BodyHUD
            activeOrganId={activeOrganId}
            activeViewMode={bodyViewMode}
            onSelectViewMode={setBodyViewMode}
            onStartAILaboratory={handleStartAILaboratory}
            onReturnToMuseum={handleReturnToMuseum}
          />

          <OrganSelectorBar
            activeOrganId={activeOrganId}
            onSelectOrgan={setActiveOrganId}
          />

          {bodyViewMode === 'infection' && (
            <InfectionControlPanel
              currentStep={infectionStep}
              onSetStep={setInfectionStep}
            />
          )}

          <MicroscopicAIGuide viewMode={bodyViewMode} />
        </>
      )}

      {/* ── Phase 5 AI Research Lab UI Overlays (stage 12) ── */}
      {isAILab && (
        <>
          <LabHUD
            activeStationId={activeStationId}
            onStartOutbreakSim={handleStartOutbreakSim}
            onReturnToMissionControl={handleReturnToMissionControl}
          />

          <WorkstationSelectorBar
            activeStationId={activeStationId}
            onSelectStation={setActiveStationId}
          />

          {activeStationId === 'analysis' && <PathogenAnalysisStation />}
          {activeStationId === 'sequencing' && <GenomeSequencingLab />}
          {activeStationId === 'microscope' && <DigitalMicroscopeStation />}
          {activeStationId === 'diagnostics' && <AIDiagnosticCenter />}
          {activeStationId === 'drugdiscovery' && <DrugDiscoveryLab />}
          {activeStationId === 'vaccine' && <VaccinePipelineCenter />}
          {activeStationId === 'dashboard' && <GlobalResearchDashboard />}
        </>
      )}

      {/* ── Phase 6 Outbreak Simulator UI Overlays (stage 13) ── */}
      {isOutbreakSim && (
        <>
          <GlobalMetricsHeader
            state={simState}
            onStartBioShield={handleStartBioShield}
            onStartChallenge={handleStartChallengePlatform}
            onExit={() => {
              audio.playWhoosh();
              goTo(SCENE_STAGES.MISSION_CONTROL);
            }}
          />

          <ScenarioMissionBar
            activeScenarioId={activeScenarioId}
            onSelectScenario={handleSelectScenario}
            state={simState}
            isRunning={simRunning}
            speed={simSpeed}
            onTogglePlay={() => setSimRunning(r => !r)}
            onSetSpeed={setSimSpeed}
            onReset={resetSimulation}
            onOpenAnalytics={() => setShowLiveAnalytics(true)}
            onOpenDebrief={() => setShowSimSummary(true)}
          />

          <PolicyDirectivePanel
            activePolicies={simState.activePolicies}
            onTogglePolicy={togglePolicy}
          />

          <ResourceAllocationDrawer />

          <NewsTickerPanel
            day={simState.day}
            icuOccupancy={simState.icuOccupancy}
          />

          <AICommandAdvisor state={simState} />

          <LiveAnalyticsModal
            visible={showLiveAnalytics}
            state={simState}
            onClose={() => setShowLiveAnalytics(false)}
          />

          <CountryOutbreakModal
            visible={!!selectedCountryProfile}
            country={selectedCountryProfile}
            onClose={() => setSelectedCountryProfile(null)}
          />

          <OutbreakSummaryModal
            visible={showSimSummary}
            state={simState}
            onClose={() => setShowSimSummary(false)}
            onAdvanceToBioShield={handleStartBioShield}
            onReturnToMissionControl={() => {
              audio.playWhoosh();
              goTo(SCENE_STAGES.MISSION_CONTROL);
            }}
          />
        </>
      )}

      {/* ── Phase 7 BioShield 2050 UI Overlays (stage 15) ── */}
      {isBioShield && (
        <>
          <BioShieldHUD
            healthIndex={98.5}
            isNight={isNight}
            onToggleNight={() => setIsNight(n => !n)}
            onOpenHospital={() => setShowSmartHospitalModal(true)}
            onOpenEducation={() => setShowPublicEducationModal(true)}
            onOpenGlobal={() => setShowGlobalCooperationModal(true)}
            onOpenFinalHall={() => setShowFinalHallModal(true)}
            onReturnToMissionControl={() => {
              audio.playWhoosh();
              goTo(SCENE_STAGES.MISSION_CONTROL);
            }}
          />

          <DigitalTwinDrawer selectedBuilding={selectedBuilding} />

          <EmergencyActionPanel
            activeActions={activeBioActions}
            onToggleAction={toggleBioAction}
          />

          <SmartHospitalModal
            visible={showSmartHospitalModal}
            onClose={() => setShowSmartHospitalModal(false)}
          />

          <PublicEducationModal
            visible={showPublicEducationModal}
            onClose={() => setShowPublicEducationModal(false)}
          />

          <GlobalCooperationModal
            visible={showGlobalCooperationModal}
            onClose={() => setShowGlobalCooperationModal(false)}
          />

          <FinalHallOfKnowledgeModal
            visible={showFinalHallModal}
            onClose={() => setShowFinalHallModal(false)}
          />
        </>
      )}

      {/* ── Phase 8 Global Collaboration & Challenge Platform UI Overlays (stage 16) ── */}
      {isChallenge && (
        <>
          <ChallengeHUD
            userName={userName}
            completedCount={completedMissions.length}
            onOpenMissions={() => setShowMissionWallModal(true)}
            onOpenDashboard={() => setShowDashboardModal(true)}
            onOpenTimeline={() => setShowTimelineModal(true)}
            onOpenCertificate={() => setShowGrandCertificateModal(true)}
            onReturnToMissionControl={() => {
              audio.playWhoosh();
              goTo(SCENE_STAGES.MISSION_CONTROL);
            }}
          />

          <MissionSelectionModal
            visible={showMissionWallModal}
            completedMissions={completedMissions}
            onSelectScenario={handleSelectChallengeScenario}
            onClose={() => setShowMissionWallModal(false)}
          />

          <MissionRunnerModal
            visible={showMissionRunnerModal}
            scenario={activeChallengeScenario || CHALLENGE_SCENARIOS[0]}
            onCompleteMission={handleCompleteMission}
            onClose={() => setShowMissionRunnerModal(false)}
          />

          <KnowledgeQuizModal
            visible={showKnowledgeQuizModal}
            onFinishQuiz={handleFinishQuiz}
            onClose={() => setShowKnowledgeQuizModal(false)}
          />

          <PersonalDashboardModal
            visible={showDashboardModal}
            userName={userName}
            onUpdateUserName={updateUserName}
            completedCount={completedMissions.length}
            totalScore={980}
            quizAccuracy={95}
            onClose={() => setShowDashboardModal(false)}
          />

          <MasterTimelineModal
            visible={showTimelineModal}
            onNavigateToPhase={(stageId) => {
              audio.playWhoosh();
              goTo(stageId);
            }}
            onClose={() => setShowTimelineModal(false)}
          />

          <GrandCertificateModal
            visible={showGrandCertificateModal}
            userName={userName}
            onUpdateUserName={updateUserName}
            overallScore={980}
            onClose={() => setShowGrandCertificateModal(false)}
          />
        </>
      )}

      {/* ── Phase 9 Global Health Intelligence Platform UI Overlays (stage 17) ── */}
      {isIntelligence && (
        <>
          <IntelligenceHUD
            onOpenDigitalTwin={() => setShowDigitalTwinModal(true)}
            onOpenKnowledgeGraph={() => setShowKnowledgeGraphModal(true)}
            onOpenTimeline={() => setShowMasterTimelineModal(true)}
            onOpenArchive={() => setShowArchiveModal(true)}
            onOpenAnalytics={() => setShowAnalyticsDashboardModal(true)}
            onOpenLibrary={() => setShowLibraryModal(true)}
            onOpenProgress={() => setShowProgressModal(true)}
            onOpenAccessibility={() => setShowAccessibilityModal(true)}
            onReturnToMissionControl={() => {
              audio.playWhoosh();
              goTo(SCENE_STAGES.MISSION_CONTROL);
            }}
          />

          <DigitalTwinEarthModal
            visible={showDigitalTwinModal}
            onClose={() => setShowDigitalTwinModal(false)}
          />

          <KnowledgeGraphModal
            visible={showKnowledgeGraphModal}
            onClose={() => setShowKnowledgeGraphModal(false)}
          />

          <MasterTimelineExplorer
            visible={showMasterTimelineModal}
            onNavigateToStage={(stageId) => {
              audio.playWhoosh();
              goTo(stageId);
            }}
            onClose={() => setShowMasterTimelineModal(false)}
          />

          <ResearchArchiveModal
            visible={showArchiveModal}
            onClose={() => setShowArchiveModal(false)}
          />

          <AnalyticsDashboardModal
            visible={showAnalyticsDashboardModal}
            onClose={() => setShowAnalyticsDashboardModal(false)}
          />

          <AIAssistantLibraryModal
            visible={showLibraryModal}
            onClose={() => setShowLibraryModal(false)}
          />

          <ProgressAccessibilityModal
            visible={showProgressModal || showAccessibilityModal}
            onClose={() => {
              setShowProgressModal(false);
              setShowAccessibilityModal(false);
            }}
          />
        </>
      )}

      {/* ── Sleek Mission Launch Dock (Floating Action Buttons in Mission Control) ── */}
      {showMissionControl && (
        <div className="responsive-dock mobile-scroll-dock" style={{
          position: 'fixed',
          bottom: 85,
          right: 24,
          zIndex: 350,
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center',
          pointerEvents: 'all',
          overflowX: 'auto',
          maxWidth: '94vw',
        }}>
          {/* Launch Time Machine Button */}
          <button
            onClick={() => handleSelectPandemic(HISTORICAL_PANDEMICS[0])}
            id="btn-launch-time-machine"
            style={{
              background: 'linear-gradient(135deg, rgba(123,47,247,0.45), rgba(0,200,255,0.3))',
              border: '1px solid #7b2ff7',
              borderRadius: 8,
              padding: '0.65rem 1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(123,47,247,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            ⏳ LAUNCH TIME MACHINE ▶
          </button>

          {/* Launch Human Body Button */}
          <button
            onClick={handleStartHumanBodyJourney}
            id="btn-launch-human-body"
            style={{
              background: 'linear-gradient(135deg, rgba(255,23,68,0.45), rgba(123,47,247,0.3))',
              border: '1px solid #ff1744',
              borderRadius: 8,
              padding: '0.65rem 1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(255,23,68,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            🔬 HUMAN BODY JOURNEY ▶
          </button>

          {/* Launch AI Research Lab Button */}
          <button
            onClick={handleStartAILaboratory}
            id="btn-launch-ai-lab"
            style={{
              background: 'linear-gradient(135deg, rgba(0,200,255,0.45), rgba(0,255,157,0.3))',
              border: '1px solid #00c8ff',
              borderRadius: 8,
              padding: '0.65rem 1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0,200,255,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            🧬 ENTER AI LAB ▶
          </button>

          {/* Launch Global Outbreak Simulator Button */}
          <button
            onClick={handleStartOutbreakSim}
            id="btn-launch-outbreak-sim"
            style={{
              background: 'linear-gradient(135deg, rgba(255,56,96,0.45), rgba(255,183,0,0.3))',
              border: '1px solid #ff3860',
              borderRadius: 8,
              padding: '0.65rem 1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(255,56,96,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            🚨 OUTBREAK SIMULATOR ▶
          </button>

          {/* Launch BioShield 2050 Button */}
          <button
            onClick={handleStartBioShield}
            id="btn-launch-bioshield"
            style={{
              background: 'linear-gradient(135deg, rgba(0,255,157,0.45), rgba(0,200,255,0.3))',
              border: '1px solid #00ff9d',
              borderRadius: 8,
              padding: '0.65rem 1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0,255,157,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            🛡️ BIOSHIELD 2050 ▶
          </button>

          {/* Launch Crisis Challenge Platform Button */}
          <button
            onClick={handleStartChallengePlatform}
            id="btn-launch-challenge-platform"
            style={{
              background: 'linear-gradient(135deg, rgba(123,47,247,0.45), rgba(255,56,96,0.3))',
              border: '1px solid #7b2ff7',
              borderRadius: 8,
              padding: '0.65rem 1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(123,47,247,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            🏆 CHALLENGE PLATFORM ▶
          </button>

          {/* Launch Global Health Intelligence Platform Button */}
          <button
            onClick={handleStartIntelligencePlatform}
            id="btn-launch-intelligence-platform"
            style={{
              background: 'linear-gradient(135deg, rgba(0,200,255,0.45), rgba(0,255,157,0.3))',
              border: '1px solid #00c8ff',
              borderRadius: 8,
              padding: '0.65rem 1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0,200,255,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            🌐 INTELLIGENCE PLATFORM ▶
          </button>

          {/* Launch Digital Earth Button */}
          <button
            onClick={() => {
              audio.playWhoosh();
              audio.missionBeep();
              goTo(SCENE_STAGES.EARTH_VIEW);
            }}
            id="btn-launch-digital-earth"
            style={{
              background: 'linear-gradient(135deg, rgba(0,150,255,0.45), rgba(0,255,157,0.3))',
              border: '1px solid #00c8ff',
              borderRadius: 8,
              padding: '0.65rem 1.2rem',
              color: '#ffffff',
              fontFamily: 'var(--font-display)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0,200,255,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            🌍 LAUNCH DIGITAL EARTH ▶
          </button>
        </div>
      )}

      {/* ── Time Machine Button when inside Earth View ── */}
      {isEarthView && (
        <button
          onClick={() => handleSelectPandemic(HISTORICAL_PANDEMICS[0])}
          id="btn-launch-time-machine-earth"
          style={{
            position: 'fixed',
            top: 75,
            right: 24,
            zIndex: 350,
            background: 'linear-gradient(135deg, rgba(123,47,247,0.45), rgba(0,200,255,0.3))',
            border: '1px solid #7b2ff7',
            borderRadius: 8,
            padding: '0.5rem 1.1rem',
            color: '#ffffff',
            fontFamily: 'var(--font-display)',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(123,47,247,0.4)',
          }}
        >
          ⏳ TIME MACHINE ▶
        </button>
      )}

      {/* ── Skip button (dev helper / accessibility) ── */}
      {stage >= SCENE_STAGES.ROCKET_LAUNCH && stage < SCENE_STAGES.MISSION_CONTROL && (
        <button
          onClick={() => {
            audio.stopRocketEngine();
            audio.startComputerHum();
            audio.missionBeep();
            setCountdown(null);
            setStage(SCENE_STAGES.MISSION_CONTROL);
          }}
          id="btn-skip-to-mc"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 300,
            background: 'rgba(0,10,25,0.7)',
            border: '1px solid rgba(0,200,255,0.25)',
            borderRadius: 6,
            padding: '0.4rem 1rem',
            color: 'rgba(0,200,255,0.5)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}
        >
          SKIP TO MISSION CONTROL →
        </button>
      )}
    </div>
  );
}
