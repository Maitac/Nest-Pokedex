import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';



@Module({
  imports: [

    ConfigModule.forRoot(),

    ServeStaticModule.forRoot({
    rootPath: join(__dirname,'..','public'),
    }),

    MongooseModule.forRoot ('mongodb://localhost:27017/nest-pokemon'), //( process.env.MONGODB),

    PokemonModule,

    CommonModule,

    SeedModule,
  ],
 
})
export class AppModule {

constructor() {
  console.log (process.env)
}

}



