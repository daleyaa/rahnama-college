import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProgramEntity } from "../program/entity/program.entity";

@Entity("plans")
export class PlanEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  deadline!: Date;

  @OneToMany(() => ProgramEntity, (program) => program.plan, { cascade: ["insert"] })
  programs!: ProgramEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

}