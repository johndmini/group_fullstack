import { useState, useEffect } from 'react'
import axios from 'axios'
import Submission from './components/Submission'

function App() {
	const [submissions, setSubmissions] = useState([])

	//get all submissions
	const getAllSubmissions = () => {
		axios
			.get('/submissions')
			.then(res => setSubmissions(res.data))
			.catch(err => console.log(err.response.data.errorMessage))
	}

	//post a new Submission
	const addSubmission = newSubmission => {
		axios
			.post('/submissions', newSubmission)
			.then(res =>
				setSubmissions(prevSubmissions => [...prevSubmissions, res.data])
			)
			.catch(err => console.log(err))
	}

	//delete Submission
	const deleteSubmission = submissionId => {
		axios
			.delete(`/submissions/${submissionId}`)
			.then(res => {
				setSubmissions(prevSubmissions =>
					prevSubmissions.filter(submission => submission._id !== submissionId)
				)
			})
			.catch(err => console.log(err))
	}
	//update Submission
	const editSubmission = (updates, submissionId) => {
		axios
			.put(`/submissions/${submissionId}`, updates)
			.then(res => {
				setSubmissions(prevSubmissions =>
					prevSubmissions.map(submission =>
						submission._id !== submissionId ? submission : res.data
					)
				)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getAllSubmissions()
	}, [])

	return (
		<div className='Submission-container'>
			{submissions.map(sub => (
				<Submission
					{...sub}
					key={sub._id}
					deleteSubmission={deleteSubmission}
					editSubmission={editSubmission}
				/>
			))}
		</div>
	)
}

export default App
