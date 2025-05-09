export interface FetchOptions extends RequestInit {
    parse?: "json" | "text" | "none";
    skipErrorHandler?: boolean;
}

/**
 * API リクエスト用の共通 fetch クライアント
 * @param input - URL または Request オブジェクト
 * @param options - fetch のオプション
 */
export async function fetchClient<T>(input: string | URL | Request, options?: FetchOptions): Promise<T> {
    const {parse = "json", skipErrorHandler = false, ...fetchOptions} = options || {};

    const res = await fetch(input, {
        headers: {
            "Content-Type": "application/json",
            ...(fetchOptions.headers || {}),
        },
        ...fetchOptions,
    });

    if (!res.ok) {
        if (!skipErrorHandler) {
            console.error(`[fetchClient] エラー: ${res.status} ${res.statusText}`);
        }
        throw new Error(`HTTP error: ${res.status}`);
    }
    switch (parse) {
        case "json":
            return res.json() as Promise<T>;
        case "text":
            return res.text() as unknown as T;
        case "none":
            return undefined as unknown as T;
    }
}