import type { LayoutServerLoad } from './$types';
import { supabase } from "$lib/supabaseClient";

export const load = (async ({ platform, url }) => {
	const data = await platform?.env?.CFKV.get('layout_data');
	if (data) {
		return JSON.parse(data)
	}
	const response = await supabase
		.from("channels_by_msg")
		.select('id, name, total_ms_count');
	const response2 = await supabase
		.from("total_reactions")
		.select('name, count')
	const ret = {
		all_channels: response.error ? [] : response.data,
		all_reactions: response2.error ? [] : response2.data
	};
    let secondsFromNow = 60*60*24*7;
	await platform?.env?.CFKV.put('layout_data', JSON.stringify(ret), {expirationTtl: secondsFromNow});
	return ret;
}) satisfies LayoutServerLoad;