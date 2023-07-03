interface QueryFunctionArgs {
    params: Partial<Record<string, string>>;
    page: number;
    itemsPerPage: number;
}

export type QueryFunction = (args: QueryFunctionArgs) => Promise<any>;

interface GetPaginatedDataArgs {
    queryFunction: QueryFunction;
    params: Partial<Record<string, string>>;
    url: URL;
    platform?: any; // adjust if necessary
    itemsPerPage?: number;
    setHeaders?: (headers: Record<string, string>) => void;
}

// TODO: https://github.com/dijonmusters/supabase-data-at-the-edge/tree/main/07-cache-supabase-response-at-the-edge-with-kv-storage
async function getPaginatedData({
    queryFunction,
    params,
    url,
    platform,
    itemsPerPage = 50,
    setHeaders,
}: GetPaginatedDataArgs) {
    setHeaders?.({ 'cache-control': 'public, max-age=${60*60*24*7}' });

    const data = await platform?.env?.CFKV.get(url.href);
    if (data) {
        return JSON.parse(data);
    }

    let pageParam = url.searchParams.get('page');
    let page: number = pageParam ? parseInt(pageParam) : 1;

    const response = await queryFunction({
        params: params as Record<string, string>,
        page,
        itemsPerPage,
    });
    const { data: rpcData, error } = response;
    if (error) {
        return { status: 500, error };
    }

    const ret = { messages: rpcData };
    let secondsFromNow = 60*60*24*7;
    await platform?.env?.CFKV.put(url.href, JSON.stringify(ret), {expirationTtl: secondsFromNow});
    return ret;
}

export { getPaginatedData };
