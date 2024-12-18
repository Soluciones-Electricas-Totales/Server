import RawData from '../../models/RawData.js';

const getAll = async (req, res) => {
  const rawData = await RawData.find();

  // populate a value here
  // .populate({
  //   path: 'questions',
  //   model: 'Question',
  // });

  res.status(200).json({ rawData });
};

export default getAll;
