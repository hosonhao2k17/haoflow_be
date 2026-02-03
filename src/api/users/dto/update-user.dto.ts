import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean } from 'class-validator';
import { BooleanField } from 'src/decorators/field.decorator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @BooleanField({options: true})
    verified?: boolean;
}
