
import type { PageServerLoad } from './$types';
import { getPaginatedData } from '$lib/data';
import { supabase } from "$lib/supabaseClient";
import type { QueryFunction } from '$lib/data';

const queryMostCommentedThreads: QueryFunction = async ({ params, page, itemsPerPage }) => {
    const query = supabase.from('most_reacted_messages').select();

    if (params.date_from && params.date_to) {
        const date_from = new Date(params.date_from).getTime().toString();
        const date_to = new Date(params.date_to).getTime().toString();
        query.gte('thread_ts', date_from).lte('thread_ts', date_to);
    }

    const response = await query.order('total_reactions', { ascending: false }).range((page - 1) * itemsPerPage, page * itemsPerPage - 1);
    return response;
}


export const load: PageServerLoad = async ({ params, url, platform, setHeaders }) => {
    params.date_from = url.searchParams.get('date_from');
    params.date_to = url.searchParams.get('date_to');
    return getPaginatedData({
        queryFunction: queryMostCommentedThreads,
        params,
        url,
        platform,
        setHeaders,
        itemsPerPage: 20
    });
}

