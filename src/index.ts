export const handler = async (event: any = {}): Promise<any> => {
    console.log('lambda invoked');
    const response = JSON.stringify(event);
    return response;
}