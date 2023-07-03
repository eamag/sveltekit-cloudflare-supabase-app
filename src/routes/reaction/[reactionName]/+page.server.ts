import type { PageServerLoad } from './$types';
import { getPaginatedData } from '$lib/data';
import { supabase } from "$lib/supabaseClient";
import type { QueryFunction } from '$lib/data';
const queryMessagesByReaction: QueryFunction = async ({ params, page, itemsPerPage }) => {
    return await supabase
        .rpc('get_messages_by_reaction4', { reaction_name: params.reactionName })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);
}


export const load: PageServerLoad = async ({ params, url, platform, setHeaders }) => {
    return getPaginatedData({
        queryFunction: queryMessagesByReaction,
        params,
        url,
        platform,
        setHeaders,
    });
}


