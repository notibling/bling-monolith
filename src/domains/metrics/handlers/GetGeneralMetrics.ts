import { HandlerDef } from '@/common/HttpHandler';
import { GeneralMetricsModel } from '@/models/Metrics/GeneralMetricsModel';


const GetGeneralMetricsHandler: HandlerDef = async (req, res) => {
  try {
    const account = await GeneralMetricsModel.fetchAccountsMetrics();
    const sales = await GeneralMetricsModel.fetchSalesMetrics();

    return res.status(200).json({
      success: true,
      account,
      sales
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false, message: "An error has ocurred"
    })
  }
}

export default GetGeneralMetricsHandler;