const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const HEADERS = {
	'Content-type': 'application/json; charset=UTF-8',
};

export type ResultBody = {
	id: number;
	title: string;
	body: string;
}

export type PostBody = Omit<ResultBody, 'id'>;

export async function getAllPosts() {
	const response = await fetch(`${POSTS_URL}`);

	if (!response.ok) {
		throw new Error('Failed to get all posts');
	}

	const result: ResultBody[] = await response.json();

	return result;
}

export async function getPost(id: number) {
	const response = await fetch(`${POSTS_URL}/${id}`);

	if (!response.ok) {
		throw new Error('Failed to get post');
	}

	const result: ResultBody = await response.json();

	return result;
}

export async function createPost({ title, body }: PostBody) {
	const response = await fetch(`${POSTS_URL}`, {
		method: 'POST',
		body: JSON.stringify({
			title: title,
			body: body,
			userId: 0,
		}),
		headers: HEADERS,
	});

	if (!response.ok) {
		throw new Error('Failed to create post');
	}

	const result: ResultBody = await response.json();

	return result;
}

export async function updatePost(id: number, { title, body }: PostBody) {
	const response = await fetch(`${POSTS_URL}/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({
			title: title,
			body: body,
		}),
		headers: HEADERS,
	});

	if (!response.ok) {
		throw new Error('Failed to update post');
	}

	const result: ResultBody = await response.json();

	return result;
}

export async function deletePost(id: number) {
	const response = await fetch(`${POSTS_URL}/${id}`, {
		method: 'DELETE',
	});

	if (!response.ok) {
		throw new Error('Failed to delete post');
	}

	return response.json();
}