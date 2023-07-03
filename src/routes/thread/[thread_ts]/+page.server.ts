import type { PageServerLoad } from './$types';
import { getPaginatedData } from '$lib/data';
import { supabase } from "$lib/supabaseClient";
import type { QueryFunction } from '$lib/data';

const queryThreadMessages: QueryFunction = async ({ params, page, itemsPerPage }) => {
    return await supabase
        .from("messages")
        .select('*, users(id, image_original)').eq('thread_ts', params.thread_ts)
        .order('ts', { ascending: true })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);
}

export const load: PageServerLoad = async ({ params, url, platform, setHeaders }) => {
    return getPaginatedData({
        queryFunction: queryThreadMessages,
        params,
        url,
        platform,
        itemsPerPage: 20,
        setHeaders,
    });
}
