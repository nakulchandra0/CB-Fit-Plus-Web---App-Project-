const paginateResponse = async (page, limit, object) => {
  page = Number.parseInt(page);
  limit = Number.parseInt(limit);

  let count = object.length;
  let totalPages = Math.ceil(count / limit);

  let classes;
  if (page && limit) {
    classes = object.slice(limit * (page - 1), limit * page);
  } else {
    classes = object;
  }

  const results = {
    classes,
    page,
    count,
    totalPages,
  };
  return results;
};

export default paginateResponse;
