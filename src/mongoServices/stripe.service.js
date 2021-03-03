const insertRecord = async (model, body) => {
  let newRecord = new model(body);
  let save = await newRecord.save();
  return save;
};

export default { insertRecord };
