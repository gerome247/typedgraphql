import { User } from '../../entity/User';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class CreateUserResolver {
    @Mutation(() => User)
    async createUser(@Arg("data") data: RegisterInput) {
            return User.create(data).save();
        }
}