import { Blog } from '../../blogs/entities/blog.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToMany(() => Blog, (blog) => blog)
  blog: Blog;

  @ManyToMany(() => Post, (post) => post)
  post: Post;
}
