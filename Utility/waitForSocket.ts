export default async function waitFor(socket: any, event: string): Promise<any> {
    return new Promise<any>((resolve) => {
        socket.once(event, (data: any) => {
            resolve(data);
        });
    });
}
