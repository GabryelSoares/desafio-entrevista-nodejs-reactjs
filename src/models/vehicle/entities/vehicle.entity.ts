import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleTypeEnum } from 'src/helpers/enums/vehicle.enum';
import { ParkingRegister } from 'src/models/parking-register/entities/parking-register.entity';
import { Establishment } from 'src/models/establishment/entities/establishment.entity';

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

  @ManyToOne(() => Establishment, (establishment) => establishment.vehicles)
  establishment: Establishment;

  @OneToMany(
    () => ParkingRegister,
    (parkingRegister) => parkingRegister.vehicle,
    { lazy: true, eager: false },
  )
  @ApiProperty({ type: () => ParkingRegister })
  parkingRegisters: ParkingRegister[];

  constructor(partial: Partial<Vehicle>) {
    Object.assign(this, partial);
  }
}
