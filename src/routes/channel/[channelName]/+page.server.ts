import type { PageServerLoad } from './$types';
import { getPaginatedData } from '$lib/data';
import type { QueryFunction } from '$lib/data';
import { supabase } from "$lib/supabaseClient";

const queryMostCommentedThreads: QueryFunction = async ({ params, page, itemsPerPage }) => {
    return await supabase.rpc('get_most_commented_threads', { channel_name_filter: params.channelName })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);
}

export const load: PageServerLoad = async ({ params, url, platform, setHeaders }) => {
    return getPaginatedData({
        queryFunction: queryMostCommentedThreads,
        params,
        url,
        platform,
        setHeaders,
    });
}
