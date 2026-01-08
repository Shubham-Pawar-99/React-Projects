import Header from "./components/layout/Header"
import AppRoutes from "./routes/AppRoutes"

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </div>
  )
}

export default App