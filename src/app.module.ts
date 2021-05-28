import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DynamooseModule } from 'nestjs-dynamoose';
import { NotificationModule } from './notification/notification.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: {
        endpoint:
          process.env.IS_NOT_SLS === 'true'
            ? '/graphql'
            : `/${process.env.STAGE}/graphql`,
      },
    }),
    DynamooseModule.forRoot({
      aws: { 
        accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.REGION
      },
      model: {
        create: false,
        prefix: `${process.env.SERVICE}-${process.env.STAGE}-`,
        suffix: '-table',
      },
    }),
    NotificationModule,
  ],
})
export class AppModule {}
