import debounce from 'just-debounce-it'
import { useCallback, useState } from 'react'
import { Movies } from './components/Movies.jsx'
import { useMovies } from './hooks/useMovies.js'
import { useSearch } from './hooks/useSearch.js'
import './styles/App.css'

function App() {
	const [sort, setSort] = useState(false)
	const { search, updateSearch, error } = useSearch()
	const { movies, getMovies, loading } = useMovies({ search, sort })

	const debouncedGetMovies = useCallback(
		debounce((search) => {
			console.log('search', search)
			getMovies({ search })
		}, 300),
		[],
	)

	const handleSubmit = (event) => {
		event.preventDefault()
		getMovies({ search })
	}

	const handleChange = (event) => {
		const newSearch = event.target.value
		updateSearch(newSearch)
		debouncedGetMovies(newSearch)
	}

	const handleSort = () => {
		setSort(!sort)
	}

	return (
		<main className="container">
			<h1>Movie Search</h1>
			<div>
				<form onSubmit={handleSubmit} className="form">
					<input
						style={{
							borderColor: error ? 'red' : 'transparent',
						}}
						type="text"
						onChange={handleChange}
						value={search}
						placeholder="Name movie do you want ..."
					/>
					<input
						style={{ marginBottom: 10 }}
						type="checkbox"
						onChange={handleSort}
						checked={sort}
					/>
					<button type="submit">Search</button>
				</form>
				{error && (
					<p
						style={{
							color: 'red',
						}}
					>
						{error}
					</p>
				)}
			</div>

			<section>
				{loading ? <progress>Loading</progress> : <Movies movies={movies} />}
			</section>
		</main>
	)
}

export default App
