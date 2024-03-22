export interface ResponseFormat<T> {
	data: T
	info: {
		limit: number
		offset: number
		total: number
	}
}