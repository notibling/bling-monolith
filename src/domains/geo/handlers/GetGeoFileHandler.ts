import fs from 'fs';
import path from 'path';

import { HandlerDef } from "@/common/HttpHandler";
import { typeCast } from "@/common/typeCast";

interface IQueryParameters {
  type: 'single-country' | 'list-countries',
  countryISO?: string;
}


const Handler: HandlerDef = async (req, res) => {
  try {
    const { type, countryISO } = typeCast<IQueryParameters>(req.query);

    let file: string = '';

    if (type === 'list-countries') file = fs.readFileSync(path.join(__dirname, '../data/basic-countries.json'), 'utf-8');

    if (type === 'single-country') file = fs.readFileSync(path.join(__dirname, `../data/${countryISO}.json`), 'utf-8');


    return res.json({ success: true, data: JSON.parse(file) });
  } catch (error) {
    console.log(error)
    return res.json({ success: false, data: [] });
  }
}

export default Handler;