import { useAuth, useAuthCheck } from './hooks/useAuth'
import { AccountPage } from './containers/AccountPage'
import { ActivationPage } from './containers/ActivationPage'
import { RegistrationPage } from './containers/RegistrationPage'
import { RecoveryPage } from './containers/RecoveryPage'
import { ResetPage } from './containers/ResetPage'
import './App.css'
import { Home } from './containers/Home'
import { Todos } from './containers/Todo'
import { Files } from './containers/Files'
import { Route, Routes } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import { TopHeader } from './elements/TopHeader'
import { NavbarSimple } from './elements/NavbarSimple'
import { AuthenticationForm } from './containers/AuthenticationForm'

const App = () => {
  useAuthCheck()
  const auth = useAuth()

  /* CRA: app hooks */
  
  const toplinks = []
  
  if (auth.isAuthenticated) {
    // test
    toplinks.push({ link: '/todos', label: 'Todos' })
    toplinks.push({ link: '/files', label: 'Files' })
    toplinks.push({ link: '/account', label: 'Account' })

    toplinks.push({ link: '/', label: 'Logout', onClick: () => auth.logout() })
  }

  if (!auth.isAuthenticated) {
    toplinks.push({ link: '/login', label: 'Login' })
    toplinks.push({ link: '/register', label: 'Register' })
  }

  // @ts-ignore
  return (
    <AppShell
      padding="md"
      navbar={(!auth.isAuthenticated ? undefined : <></>)}
      header={<TopHeader links={toplinks} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        {/* CRA: routes */}
        <Route path="/files" element={<Files />} />
        <Route path="/login" element={<AuthenticationForm />} />
        <Route path="/recovery" element={<RecoveryPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/activate" element={<ActivationPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </AppShell>
  );
}

export default App
