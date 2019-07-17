import * as express from "express";
import * as path from "path";
import * as webpack from "webpack";
import * as devMiddleware from "webpack-dev-middleware";
import { Configuration } from "webpack";
import * as hotMiddleware from "webpack-hot-middleware";
import * as compression from 'compression';


const configs: (env: any, options: any) => Configuration[] = require("../../webpack.config");
const config = configs({}, {mode: "development"}).find(config => config.name === "web");


export class App {
	public express: express.Application

	constructor() {
		this.express = express();
		this.express.use(compression());
		this.configureMiddleWare();
		this.configureApi();


		this.express.use(express.static(path.join(__dirname, '../../public')));

		this.express.get("*", (req, res, next) => {
			if(req.path.lastIndexOf('.') > req.path.lastIndexOf('/')) {
                //if this request looks like a static file, ignore it
                return next();
            }
			console.log(__dirname)
			let filePath: string;

            if(process.env.NODE_ENV === 'development') {
                filePath = path.resolve(__dirname, '../devmain.html');
            } else {
                filePath = path.resolve(__dirname, '../../public/bundle/main.html');
            }
			res.sendFile(filePath);
		});
	}

	private configureMiddleWare(): void {

		if(process.env.NODE_ENV === "development") {

			const compiler = webpack({
				...config,
				mode: "development",
			});
	
			this.express.use(devMiddleware(compiler, {
				publicPath: config!.output!.publicPath!
			}));
	
			this.express.use(hotMiddleware(compiler));

		}
	}

	private configureApi(): void {

	}
}
