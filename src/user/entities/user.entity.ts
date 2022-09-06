import * as bcrypt from 'bcrypt';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('tbl_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nome: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  status: boolean;
  @Column()
  confirmationToken: string;
  @Column({ nullable: false })
  salt: string;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;

  // @OneToOne(() => Task, (task) => task.user)
  // @JoinColumn()
  // task: Task;
  @ManyToOne(() => Task) //muitos usuarios participam de uma tarefa
  task: Task;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
