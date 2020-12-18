import { User } from "../../entity/User";
import { redis } from "../../redis";
import bcrypt from 'bcryptjs';

import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { ChangePasswordInput } from "./changePassword/ChangePasswordInput";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true})
  async ChangePassword(
    @Arg("data") { token, password }:
    ChangePasswordInput,
    @Ctx() ctx: MyContext
    ): Promise<User | null> {

    const userId = await redis.get(forgotPasswordPrefix + token);

    if(!userId) {
        return null;
    }

    const user = await User.findOne(userId);

    if (!user) {
        return null;
    }

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);

    await user.save();

    ctx.req.session!.userId = user.id;

    return user;

  }
}