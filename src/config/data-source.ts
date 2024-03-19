// ormconfig.ts
import 'dotenv/config';
import { User } from 'src/users/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
// Adjust the path to your entities

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres', // or any other database type
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: ['dist/db/migration/**/*{.ts,.js}'], // Adjust your migrations path as needed
  synchronize: true,
};
const dataSource = dataSourceOptions;

export default dataSource;
