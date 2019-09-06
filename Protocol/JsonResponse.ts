enum StatusType {
    succes, failure
}

interface JsonResponse<T> {
    status: {
        type: StatusType;
        message: string;
    };
    content: T;
}
