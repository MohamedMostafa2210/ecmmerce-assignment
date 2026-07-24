export const findOne = async ({
  model,
  filter = {},
  select = "",
  sort = "_id",
  populate = [],
} = {}) => {
  return await model
    .findOne(filter)
    .select(select)
    .sort(sort)
    .populate(populate);
};
export const find = async ({
  model,
  filter = {},
  select = "",
  sort = "_id",
  populate = [],
  skip = 0,
  limit = 0,
} = {}) => {
  let query = model
    .find(filter)
    .select(select)
    .sort(sort)
    .populate(populate)
    .skip(skip);

  if (limit) {
    query = query.limit(limit);
  }

  return await query;
};
export const createOne = async ({ model, data, options } = {}) => {
  return await model.create(data, options);
};
export const updateOne = async ({
  model,
  filter = {},
  data,
  options = { runValidators: true },
} = {}) => {
  return await model.updateOne(filter, data, options);
};
export const deleteOne = async ({ model, filter = {}, options = {} } = {}) => {
  return await model.deleteOne(filter, options);
};
