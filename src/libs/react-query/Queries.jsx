import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  createUserAccount,
  getResourceID,
  searchResource,
  signInAccount,
  signOutAccount,
  searchKeyword,
  getAuthorID,
  searchResourceByAuthor,
  updateUserAccount,
  createLink,
  deleteLink,
  createMoreLinks,
  deleteMoreLinks,
  uploadAvatar,
  getFilterAll,
  createResources,
  uploadThumb,
  createThumb,
  createFavorite,
  createFollow,
  searchResourceByFavorite,
} from "../wearstock-server/api";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useUpdateUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUserAccount(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("searchKeyword", data);
    },
  });
};

export const useGetFilterAll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => getFilterAll(),
    onSuccess: (data) => {
      queryClient.invalidateQueries("searchKeyword", data);
    },
  });
};

export const useSearchResources = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conditions) => searchResource(conditions),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useSearchKeyword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (conditions) => searchKeyword(conditions),
    onSuccess: (data) => {
      queryClient.invalidateQueries("searchKeyword", data);
    },
  });
};

export const useGetResourcesID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => getResourceID(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useSearchResourcesByAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, conditions }) =>
      searchResourceByAuthor({ id, conditions }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("getResourcesByAuthor", data);
    },
  });
};

export const useSearchResourcesByFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, conditions }) =>
      searchResourceByFavorite({ id, conditions }),
    onSuccess: (data) => {
      queryClient.invalidateQueries("getResourcesByAuthor", data);
    },
  });
};

export const useGetAuthorID = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => getAuthorID(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useCreateMoreLinks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createMoreLinks(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useCreateResources = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createResources(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useUpdateMoreLinks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createMoreLinks(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file) => uploadAvatar(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useDeleteMoreLinks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteMoreLinks(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useUploadThumb = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file) => uploadThumb(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useCreateThumb = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createThumb(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useCreateFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createFavorite(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};

export const useCreateFollows = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createFollow(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("someQueryKey", data);
    },
  });
};
