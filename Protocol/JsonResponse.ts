enum StatusType {
    succes, failure
}

interface JsonResponse {
    status: {
        type: StatusType;
        message: string;
    };
    content: any;
}
