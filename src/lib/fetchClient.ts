'use client'

import {apiBaseUrl} from "@/constants/constants";

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
    try {
        const res = await fetch(`${apiBaseUrl}${input}`, {
            headers: {
                "Content-Type": "application/json",
                ...(fetchOptions.headers || {}),
            },
            ...fetchOptions,
        });
        if (!res.ok && !skipErrorHandler) {
            console.error(`[fetchClient] エラー: ${res.status} ${res.statusText}`);
            throw new Error(`HTTP error: ${res.status}`);
        }
        switch (parse) {
            case "json":
                return await res.json() as Promise<T>;
            case "text":
                return await res.text() as unknown as T;
            case "none":
                return undefined as unknown as T;
        }
    } catch (e) {
        if (!skipErrorHandler) {
            console.error(`[fetchClient] 通信例外:`, e);
        }
        throw e;
    }
}