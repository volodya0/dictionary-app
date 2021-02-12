import { useEffect} from 'react'
export function Head(props){
	useEffect(() => {
	}, []);
	return (
		<thead>
				<tr>
					<th scope="col-1">#</th>
					<th scope="col-3">Original</th>
					<th scope="col-3">Translate</th>
					<th scope="col-2">Description</th>
					<th scope="col-1">Date</th>
					<th scope="col-2">Options</th>
				</tr>
			</thead>
	)
}