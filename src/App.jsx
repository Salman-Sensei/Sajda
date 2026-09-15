import { useState } from 'react'
import Splash from './screens/Splash'
import PersonSelection from './screens/PersonSelection'
import PinEntry from './screens/PinEntry'
import Dashboard from './screens/Dashboard'
import History from './screens/History'
import MyProgress from './screens/MyProgress'
import GroupProgress from './screens/GroupProgress'
import NavBar from './components/NavBar'

const STAGE = {
  SPLASH: 'splash',
  PERSON: 'person',
  PIN: 'pin',
  APP: 'app',
}

export default function App() {
  const [stage, setStage] = useState(STAGE.SPLASH)
  const [name, setName] = useState('')
  const [personId, setPersonId] = useState(null)
  const [tab, setTab] = useState('home')

  if (stage === STAGE.SPLASH) {
    return <Splash onDone={() => setStage(STAGE.PERSON)} />
  }

  if (stage === STAGE.PERSON) {
    return (
      <PersonSelection
        onSelect={(selected) => {
          setName(selected)
          setStage(STAGE.PIN)
        }}
      />
    )
  }

  if (stage === STAGE.PIN) {
    return (
      <PinEntry
        name={name}
        onBack={() => setStage(STAGE.PERSON)}
        onSuccess={(id) => {
          setPersonId(id)
          setStage(STAGE.APP)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      <NavBar active={tab} onNavigate={setTab} />
      {tab === 'home' && <Dashboard name={name} personId={personId} />}
      {tab === 'history' && <History personId={personId} />}
      {tab === 'progress' && <MyProgress personId={personId} />}
      {tab === 'group' && <GroupProgress />}
    </div>
  )
}
