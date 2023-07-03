
import type { PageServerLoad } from './$types';
import { getPaginatedData } from '$lib/data';
import { supabase } from "$lib/supabaseClient";
import type { QueryFunction } from '$lib/data';

const queryMostCommentedThreads: QueryFunction = async ({ params, page, itemsPerPage }) => {
    return await supabase.from('most_commented_threads').select()
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

