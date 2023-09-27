import ThreadType from '$lib/enums.js'

export function checkType(value) {
	switch (typeof value) {
		case 'string':
			return ThreadType.String;
		case 'number':
			return ThreadType.Number;
		case 'object':
			if (Array.isArray(value)) {
				return ThreadType.Array;
			} else {
				return ThreadType.Object;
			}
		case 'boolean':
			return ThreadType.Boolean;
		case 'function':
			return ThreadType.Function;
		default:
			return null;
	}
}
