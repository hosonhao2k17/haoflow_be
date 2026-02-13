import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean } from 'class-validator';
import { BooleanField } from 'src/decorators/field.decorator';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto,['password'])) {

    @BooleanField({options: true})
    verified?: boolean;
}
