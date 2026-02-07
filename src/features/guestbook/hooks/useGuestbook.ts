import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useGuestbook() {
    const { data, error, mutate, isLoading } = useSWR('/api/guestbook', fetcher)

    return {
        entries: data,
        isLoading,
        isError: error,
        mutate,
    }
}
