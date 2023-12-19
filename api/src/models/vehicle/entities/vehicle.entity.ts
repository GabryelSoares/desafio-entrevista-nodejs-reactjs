import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';

@Entity({ name: 'vehicles' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  brand: string;

  @Column()
  @ApiProperty()
  model: string;

  @Column()
  @ApiProperty()
  color: string;

  @Column({ unique: true })
  @ApiProperty()
  plate: string;

  @Column({
    type: 'enum',
    enum: VehicleTypeEnum,
  })
  @ApiProperty({ enum: VehicleTypeEnum })
  type: VehicleTypeEnum;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deletedAt: Date;

  constructor(partial: Partial<Vehicle>) {
    Object.assign(this, partial);
  }
}
