export enum StatusType {
    success, failure
}

export default interface JsonResponse<T> {
    status: {
        type: StatusType;
        message: string;
    };
    content: T;
}
