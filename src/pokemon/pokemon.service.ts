import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,

  ) {}


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
      
    } catch (error) {
      this.handleExceptions( error );
    }

  }



  findAll( paginationDTO: PaginationDto ) {

    const { limit = 10, offset = 0} = paginationDTO;

    return this.pokemonModel.find()
      .limit( limit)
      .skip( offset )
      .sort ({
         no: 1       
      })
      .select( '-__v');
  }

  async findOne(term: string): Promise<Pokemon> {  // Asegúrate de especificar el tipo de retorno
    let pokemon: Pokemon | null = null;  // Ahora acepta null

    if (!isNaN(+term)) {
        pokemon = await this.pokemonModel.findOne({ no: term });
    }

    // MongoID
    if (!pokemon && isValidObjectId(term)) {
        pokemon = await this.pokemonModel.findById(term);
    }

    // Name
    if (!pokemon) {
        pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() });
    }

    if (!pokemon) {
        throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    }

    return pokemon;  // Aquí TypeScript sabe que pokemon no es null
}

  async update( term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne( term );
    if ( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    
    try {
      await pokemon.updateOne( updatePokemonDto );
      return { ...pokemon.toJSON(), ...updatePokemonDto };
      
    } catch (error) {
      this.handleExceptions( error );
    }
  }

  async remove( id: string) {
    // const pokemon = await this.findOne( id );
    // await pokemon.deleteOne();
    // return { id };
    // const result = await this.pokemonModel.findByIdAndDelete( id );
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if ( deletedCount === 0 )
      throw new BadRequestException(`Pokemon with id "${ id }" not found`);

    return;
  }


  private handleExceptions( error: any ) {
    if ( error.code === 11000 ) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue ) }`);
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }

}


