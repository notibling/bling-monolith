
import { Where } from '@/common/Database/WhereQuery';
import { HandlerDef } from '@/common/HttpHandler';
import { CmsSingleTypeModel, ICmsSingleType } from '@/models/CmsSingleType';

interface IGetCmsSingleTypePayload {
  key?: string;
}

const FetchSingleTypeHandler: HandlerDef = async (req, res) => {
  try {
    const { key } = req.query as IGetCmsSingleTypePayload;

    const where = [];

    if (key) where.push(new Where<ICmsSingleType<any>>('key', '=', key))

    const singleTypes = await CmsSingleTypeModel.fetch(...where)
    
    return res.status(200).json({
      success: true,
      singleTypes
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false, message: "An error has ocurred"
    })
  }
}

export default FetchSingleTypeHandler;