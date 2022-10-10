import { Navbar } from "@/components/Navbar"
import { Movies } from "@/components/movies"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Movie } from "@/components/movie"
import { Actors } from "@/components/actors"
import { Actor } from "@/components/actor"



export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/home" element={<Movies />} />
        <Route path="/people" element={<Actors />} />
        <Route path="/person/:id" element={<Actor />} />
      </Routes>
    </BrowserRouter>
  )
}
