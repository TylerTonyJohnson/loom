export class ThreadType {
	static None = new ThreadType('none');
	static Boolean = new ThreadType('boolean');
	static Number = new ThreadType('number');
	static String = new ThreadType('string');
	static Array = new ThreadType('array');
	static Object = new ThreadType('object');
	static Function = new ThreadType('function');
}

export class FlowType {
	static Input = new FlowType('input');
	static Output = new FlowType('output');
}
