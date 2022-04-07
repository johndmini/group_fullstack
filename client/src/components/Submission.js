import React from 'react'

export default function Submission({
	creator,
	imgUrl,
	title,
	description,
	location,
	likes,
	deleteSubmission,
	editSubmission,
}) {
	return (
		<div style={{ textAlign: 'center' }}>
			{/* testing */}
			<h1>Creator: {creator}</h1>
			<img src={imgUrl} alt={title} />
			<h2>Title:{title}</h2>
			<p>Description:{description}</p>
			<p>Location:{location}</p>
			<p>Number of likes: {likes}</p>
		</div>
	)
}
