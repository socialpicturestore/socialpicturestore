import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'
import { createApi } from '@reduxjs/toolkit/query/react'

/* Мьютекс используется для предотвращения одновременных запросов на обновление токена */
const mutex = new Mutex()

const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: headers => {
    const token = sessionStorage.getItem('access-token')

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  FetchArgs | string,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  /* ждём, пока мьютекс станет свободным, не блокируя его */
  await mutex.waitForUnlock()

  /* выполняем исходный запрос */
  let result = await baseQueryWithAccessToken(args, api, extraOptions)

  /* проверяем, вернул ли запрос ошибку с кодом 401 (Unauthorized), что указывает на истёкший токен */
  if (result.error && result.error.status === 401) {
    /* проверяем, не заблокирован ли мьютекс другим запросом */
    if (!mutex.isLocked()) {
      /* захватываем мьютекс, чтобы заблокировать другие запросы на обновление токена */
      const release = await mutex.acquire()

      try {
        /* пытаемся получить новый токен по refresh token */
        const refreshResult = await baseQueryWithAccessToken(
          {
            method: 'POST',
            url: 'auth/update-tokens',
          },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          /* сохраняем новый токен в storage */
          sessionStorage.setItem(
            'accessToken',
            (refreshResult.data as { accessToken: string }).accessToken
          )
          /* повторяем исходный запрос с новым access token */
          result = await baseQueryWithAccessToken(args, api, extraOptions)
        } else {
          /* очищаем store, если не удалось получить новую пару access refresh */
          baseApi.util.resetApiState()
          /* удаляем expired token */
          sessionStorage.removeItem('accessToken')
          /* убеждаемся, что код выполняется в браузере, а не на сервере */
          if (typeof window !== 'undefined') {
            /* перенаправляем пользователя на страницу логина */
            window.location.href = 'auth/login'
          }
        }
      } finally {
        /* освобождаем mutex */
        release()
      }
    } else {
      /* ждем, если mutex заблокирован другим потоком */
      await mutex.waitForUnlock()
      /* повторяем исходный запрос */
      result = await baseQueryWithAccessToken(args, api, extraOptions)
    }
  }
  return result
}

export const baseApi = createApi({
  reducerPath: 'inctagramApi',
  tagTypes: [],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})
