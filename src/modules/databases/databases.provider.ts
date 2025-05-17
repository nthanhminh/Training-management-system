import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const type = configService.get<'postgres'>('DB_TYPE');
      const host = configService.get<string>('DB_HOST');
      const port = configService.get<number>('DB_PORT');
      const username = configService.get<string>('DB_USERNAME');
      const password = configService.get<string>('DB_PASSWORD');
      const database = configService.get<string>('DB_NAME');

      console.log("Configs: ", type, host, port, username, password, database);

      const dataSource = new DataSource({
        type,
        host,
        port,
        username,
        password,
        database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
