import * as express from "express";
import * as moment from 'moment';
import * as fs from 'fs';

import ChangeHelper from '../helpers/ChangeHelper';
import { IConfig } from '../Interfaces/IConfig';

const config: IConfig = require('../../config.json');

export default class HomeRoutes {
    private router = express.Router();
    private changeHelper: ChangeHelper;

    constructor() {
        this.changeHelper = new ChangeHelper(config);
    }

    public routes(): express.Router {
        this.router.get('/', (req: express.Request, res: express.Response) => {
            res.sendfile('/index.html');
        });

        // Listen route for the webhook
        this.router.post('/listen', (req: any, res: express.Response) => {
            if (req.query && req.query.validationtoken) {
                console.log('Found validation token: ', req.query.validationtoken);
                res.send(req.query.validationtoken);
                res.status(200);
            } else {
                this.changeHelper.check(req.body).then((data) => {
                    console.log(data);
                    if (data.length > 0) {
                        /* Write to file */
                        // Write changes to file -> this can be updated to a database or queue mechanism
                        const fileName = __dirname + '/../../public/webhook.txt';
                        fs.exists(fileName, (exists) => {
                            let fileData = "";
                            if (exists) {
                                fileData = fs.readFileSync(fileName, 'utf-8');
                            }
                            let txtFile = "";
                            txtFile += `<b>Retrieved</b>: ${moment().toISOString()}</br>`;
                            txtFile += JSON.stringify(data);
                            fileData = txtFile + '</br></br>' + fileData;
                            fs.writeFileSync(fileName, fileData, 'utf-8');
                        });
                    }
                    res.sendStatus(200);
                }).catch((err) => {
                    res.sendStatus(400);
                });
            }
        });

        return this.router;
    }
}