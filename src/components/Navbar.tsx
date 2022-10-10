import { NavLink } from "react-router-dom"

export const Navbar = () => {
	return (
		<>
			<section className="flex items-center justify-around font-Roboto font-black w-2/6 p-12">
				<p className="text-2xl">Movie<span className="text-light-purple">flix</span></p>
				<ul className="flex justify-evenly w-3/6">
					<li className="hover:text-light-purple transition-all cursor-pointer">
						<NavLink to="/home" className={({ isActive }) => isActive ? 'text-light-purple' : 'text-black'}>Movies</NavLink>
					</li>
					<li className="hover:text-light-purple transition-all cursor-pointer">
						<NavLink to="/people" className={({ isActive }) => isActive ? 'text-light-purple' : 'text-black'}>People</NavLink>
					</li>
				</ul>
			</section>
		</>
	)
}