import { Blog } from 'src/blogs/entities/blog.entity';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  content: string;

  @Column()
  type: string; //video, audio, article

  @Column()
  isPublished: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user)
  user: User;

  @OneToMany(() => Category, (categories) => categories)
  categories: Category[];

  @ManyToOne(() => Blog, (blog) => blog)
  blog: Blog;
}
