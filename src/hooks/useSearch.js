import { useEffect, useRef, useState } from 'react'

export function useSearch() {
	const [search, updateSearch] = useState('')
	const [error, setError] = useState(null)
	const isFirstInput = useRef(true)

	useEffect(() => {
		if (isFirstInput.current) {
			isFirstInput.current = search === ''
			return
		}

		if (search === '') {
			setError('Input empty')
			return
		}

		if (search.match(/^\d+$/)) {
			setError('Cant search a movie with number')
			return
		}

		if (search.length < 3) {
			setError('The search must have at least 3 characters')
			return
		}

		setError(null)
	}, [search])

	return { search, updateSearch, error }
}
