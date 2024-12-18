import { extractContentFromBuffer } from "../../lib/fileUtil.js";
import RawData from "../../models/RawData.js";

const createRawData = async (req, res) => {
  if (!req.file?.buffer) {
    return res.status(400).send("No file uploaded");
  }

  const name = req.body.name;

  const content = await extractContentFromBuffer(req.file.buffer);

  const rawData = await RawData.create({ name, content });

  res.status(200).json({ rawData });
};

export default createRawData;
