import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';
import BlogGrid from '@/components/landing-page/blog/BlogGrid';
import { getAllBlogPosts } from '@/lib/data/blog';
import BlogHero from '@/components/landing-page/blog/BlogHero';

export const metadata: Metadata = generatePageMetadata('blog');

const BlogPage = async () => {
  const posts = await getAllBlogPosts();

  return (
    <div className='min-h-screen bg-[#030303]'>
      <BlogHero />
      <BlogGrid posts={posts} showLoadMore={true} />
    </div>
  );
};

export default BlogPage;
