//import { MaxLength, Length } from "class-validator";
import { IsEmail, Length } from "class-validator";
import { PasswordMixin } from "../../shared/PasswordInput";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./isEmailAlreadyExist";

@InputType()
export class RegisterInput extends PasswordMixin(class {}) {
  @Field()
  @Length(1, 255, { message: "FirstName must have a length greater than 1"})
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: "email already in use "})
  email: string;

}