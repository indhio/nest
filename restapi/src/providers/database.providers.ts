import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;

      var uri = "mongodb://" + uriOptions.host + ":" + uriOptions.port + "/" + options.dbName;

      return await mongoose.connect(uri, options);
    },
  },
];

var options = {
  user: process.env.MONGODB_USER || '', 
  pass: process.env.MONGODB_PASSWORD || '',
  dbName: process.env.MONGODB_DATABASE || 'restapi',
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  useNewUrlParser: true
}

var uriOptions = {
  host: process.env.MONGODB_HOST || 'localhost', 
  port: process.env.MONGODB_PORT || 27017,
}
