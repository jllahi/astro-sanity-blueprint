import type { DocumentLocationResolver } from 'sanity/presentation'

export const locate: DocumentLocationResolver = ({ id, type }) => {
	// Set up locations for documents of the type "post"
	if (type === 'post') {
		return {
			// '/post' is an example path.
			// Replace it with an actual relative or absolute value
			// depending on your environment
			locations: [
				{ title: `Post #${id}`, href: `/post/${id}` },
				{ title: 'Posts', href: '/posts' },
			],
		}
	}
	return null
}
