import { ClientsService } from '@/services/ClientsService';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useClients(perPage = 20) {
  // const pagination = usePagination(perPage);
  // const queryClient = useQueryClient();

  // const { data, isLoading } = useQuery({
  //   queryKey: ['clients', { page: pagination.currentPage, perPage }],
  //   queryFn: async () => {
  //     await new Promise(res => setTimeout(res, 1000));

  //     const response = await ClientsService.getAll(
  //       pagination.currentPage,
  //       perPage
  //     );

  //     pagination.setTotalItems(response?.items ?? 0);

  //     return response;
  //   },
  //   staleTime: Infinity,
  // });

  // useEffect(() => {
  //   if (pagination.hasNextPage) {
  //     const nextPage = pagination.currentPage + 1;
  //     queryClient.prefetchQuery({
  //       queryKey: ['clients', { page: nextPage, perPage }],
  //       queryFn: async () => {
  //         const response = await ClientsService.getAll(nextPage, perPage);

  //         pagination.setTotalItems(response?.items ?? 0);

  //         return response;
  //       },
  //       staleTime: Infinity,
  //     });
  //   }
  // }, [pagination.currentPage, pagination.hasNextPage]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['clients'],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => ClientsService.getAll(pageParam, perPage),
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        const totalPages = Math.ceil(lastPage.items / perPage);
        const isLastPage = allPages.length >= totalPages;

        if (isLastPage) return null;

        return lastPageParam + 1;
      },
    });

  const clients = data?.pages.flatMap((page) => page.data);

  return {
    // clients: data?.data ?? [],
    clients: clients ?? [],
    isLoading,
    // pagination,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
