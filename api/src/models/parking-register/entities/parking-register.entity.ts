import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Vehicle } from 'src/models/vehicle/entities/vehicle.entity';
import { Establishment } from 'src/models/establishment/entities/establishment.entity';

@Entity({ name: 'parkingRegisters' })
export class ParkingRegister {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  entry: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty()
  exit: Date | null;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.parkingRegisters, {
    lazy: true,
    eager: false,
  })
  @ApiProperty({ type: () => Vehicle })
  vehicle: Vehicle;

  @ManyToOne(
    () => Establishment,
    (establishment) => establishment.parkingRegisters,
    { lazy: true, eager: false },
  )
  @ApiProperty({ type: () => Establishment })
  establishment: Establishment;

  constructor(partial: Partial<ParkingRegister>) {
    Object.assign(this, partial);
  }
}
