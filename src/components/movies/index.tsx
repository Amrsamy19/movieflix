import { Trending } from "./Trending"
import { Recommended } from "./Recommended"
import { Popular } from "./Popular"
import { Search } from "./Search"

export const Movies = () => {
	return (
		<div className="grid grid-cols-11 gap-4 px-8">
			<div className='col-span-3'>
				<Trending />
			</div>
			<div className='col-span-5'>
				<Recommended />
				<Popular />
			</div>
			<div className='col-span-3'>
				<Search />
			</div>
		</div>
	)
}