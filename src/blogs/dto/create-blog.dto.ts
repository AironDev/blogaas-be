import { User } from "src/users/entities/user.entity";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
    IsString,
    MaxLength,
    ValidateIf,
    IsOptional,
    IsIn,
    IsDate
} from 'class-validator';


export class CreateBlogDto {
    id: number;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
	@IsString()
	@MaxLength(500)
    description: string;


    @ApiProperty()
	@IsString()
	@MaxLength(20)
    niche: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    user: User;
}
