interface PersistApi {
	hasHydrated?: () => boolean;
	rehydrate?: () => unknown;
	onFinishHydration?: (cb: () => void) => () => void;
}

export async function waitForSettingsHydration(
	useSettingsStore: unknown,
	timeoutMs = 1500,
	forceRehydrate = false
): Promise<void> {
	const persistApi = (useSettingsStore as { persist?: PersistApi }).persist;
	if (!persistApi) return;
	if (persistApi.hasHydrated?.() && !forceRehydrate) return;

	await new Promise<void>((resolve) => {
		let done = false;
		const timeout = window.setTimeout(() => {
			if (done) return;
			done = true;
			resolve();
		}, timeoutMs);

		const unsub = persistApi.onFinishHydration?.(() => {
			if (done) return;
			done = true;
			window.clearTimeout(timeout);
			if (unsub) unsub();
			resolve();
		});

		try {
			persistApi.rehydrate?.();
		} catch {
			// ignore
		}
	});
}
