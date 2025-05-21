import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const validDbTypes = [
    'mysql',
    'mariadb',
    'postgres',
    'cockroachdb',
    'sqlite',
    'mssql',
    'sap',
    'oracle',
    'cordova',
    'nativescript',
    'react-native',
    'sqljs',
    'mongodb',
    'aurora-mysql',
    'aurora-postgres',
    'better-sqlite3',
    'capacitor',
    'spanner',
];

const dbTypeFromEnv = process.env.DB_TYPE;
const dbType = validDbTypes.includes(dbTypeFromEnv) ? dbTypeFromEnv : 'postgres';

const AppDataSource = new DataSource({
    type: dbType,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME || 'your-username',
    password: process.env.DB_PASSWORD || 'your-password',
    database: process.env.DB_NAME || 'your-database',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: ['src/modules/databases/migrations/*{.ts,.js}'],
    synchronize: false,
});

export default AppDataSource;
