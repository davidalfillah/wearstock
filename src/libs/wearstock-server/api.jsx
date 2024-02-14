import axios from "axios";

export async function getFilterAll() {
  try {
    const response = await axios.get("http://localhost:3307/filter-all");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createUserAccount(registerData) {
  try {
    const newAccount = await axios.post(
      "http://localhost:3307/users",
      registerData
    );

    if (!newAccount) throw Error;
    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateUserAccount(data) {
  try {
    const response = await axios.patch(
      `http://localhost:3307/users/${data.id}`,
      data
    );
    if (!response) throw Error;
    return response;
  } catch (error) {
    return error;
  }
}

export async function signInAccount(user) {
  try {
    const response = await axios.post("http://localhost:3307/login", {
      email: user.email,
      password: user.password,
    });
    return { isSuccess: true, data: response.data };
  } catch (error) {
    return { isSuccess: false, data: error.response.data };
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get("http://localhost:3307/me");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    const response = await axios.delete("http://localhost:3307/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchResource(conditions) {
  try {
    const response = await axios.get("http://localhost:3307/resources", {
      params: conditions,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchKeyword(conditions) {
  try {
    const response = await axios.get("http://localhost:3307/keyword", {
      params: conditions,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchResourceByAuthor({ id, conditions }) {
  try {
    const response = await axios.get(
      `http://localhost:3307/resources/author/${id}`,
      {
        params: conditions,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchResourceByFavorite({ id, conditions }) {
  try {
    const response = await axios.get(
      `http://localhost:3307/resources/favorite/${id}`,
      {
        params: conditions,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getResourceID(id) {
  try {
    const response = await axios.get(`http://localhost:3307/resources/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAuthorID(id) {
  try {
    const response = await axios.get(`http://localhost:3307/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function createLink(data) {
  try {
    const link = await axios.post("http://localhost:3307/link", data);

    if (!link) throw Error;
    return link;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createMoreLinks(data) {
  try {
    const link = await axios.post("http://localhost:3307/links", {
      links: data,
    });
    if (!link) throw Error;
    return link;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateMoreLinks(data) {
  try {
    const link = await axios.patch("http://localhost:3307/links", data);
    if (!link) throw Error;
    return link;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteMoreLinks(data) {
  try {
    const link = await axios.post("http://localhost:3307/links-delete", {
      links: data,
    });
    if (!link) throw Error;
    return link;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteLink(id) {
  try {
    const link = await axios.delete(`http://localhost:3307/link/${id}`);

    if (!link) throw Error;
    return link;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function uploadAvatar(data) {
  try {
    let file = data.file;
    let formData = new FormData();
    formData.append("file", file);
    const upload = await axios.post(
      `http://localhost:3307/upload/avatar/${data.id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { name: data.name },
      }
    );
    if (!upload) throw Error;
    return upload;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createResources(data) {
  try {
    const resources = await axios.post(
      "http://localhost:3307/resources",
      data.resource
    );

    console.log(resources);

    if (!resources) throw Error;
    let resourceName = resources.data.slug;
    let formData = new FormData();
    data.upload.forEach((file, i) => {
      formData.append(`thumb-files`, file);
      formData.append(`resource`, resources);
    });

    const uploadThumb =
      data.upload &&
      (await axios.post("http://localhost:3307/upload/thumb/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { name: resourceName },
      }));

    if (!uploadThumb) throw Error;
    let idResource = resources.data.id;
    const thumb =
      resources &&
      (await axios.post(`http://localhost:3307/thumb/${idResource}`, {
        file: uploadThumb.data,
      }));
    if (!thumb) throw Error;

    let file = data.uploadFile;
    let formFile = new FormData();
    formFile.append("file-resource", file);
    formFile.append(`resource`, resources);
    const uploadFile =
      data.uploadFile &&
      (await axios.post("http://localhost:3307/upload/file/", formFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: { name: resourceName },
      }));
    if (!uploadFile) throw Error;

    const createFile =
      uploadFile &&
      (await axios.post(`http://localhost:3307/files/${idResource}`, {
        dataFile: uploadFile,
      }));
    if (!createFile) throw Error;

    const createStyles =
      data.styles &&
      (await axios.post(`http://localhost:3307/styles/${idResource}`, {
        styles: data.styles,
      }));
    if (data.styles && !createStyles) throw Error;

    const createFormats =
      data.fileType &&
      (await axios.post(`http://localhost:3307/formats/${idResource}`, {
        formats: data.fileType,
      }));
    if (data.fileType && !createFormats) throw Error;

    const createColors =
      data.colors &&
      (await axios.post(`http://localhost:3307/colors/${idResource}`, {
        colors: data.colors,
      }));
    if (data.colors && !createColors) throw Error;

    const createTags =
      data.tags &&
      (await axios.post(`http://localhost:3307/tags/${idResource}`, {
        tags: data.tags,
      }));
    if (data.tags && !createTags) throw Error;

    return [
      {
        resources,
        uploadThumb,
        thumb,
      },
    ];
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function uploadThumb(data) {
  try {
    let formData = new FormData();
    data.forEach((file, i) => {
      formData.append(`thumb-files`, file);
    });

    const resources = await axios.post(
      "http://localhost:3307/upload/thumb/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!resources) throw Error;
    return resources;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createThumb(data) {
  try {
    const thumb = await axios.post(
      `http://localhost:3307/thumb/${data.id}`,
      data.data
    );
    if (!thumb) throw Error;
    return resources;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createFavorite(data) {
  try {
    const favorite = await axios.post(`http://localhost:3307/favorites/`, data);
    if (!favorite) throw Error;
    return favorite;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createFollow(data) {
  try {
    const follows = await axios.post(`http://localhost:3307/follows/`, data);
    if (!follows) throw Error;
    return follows;
  } catch (error) {
    console.log(error);
    return error;
  }
}
