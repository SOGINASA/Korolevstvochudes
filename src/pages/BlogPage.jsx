import React from 'react';
import { Helmet } from 'react-helmet-async';

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Блог - Королевство Чудес</title>
      </Helmet>
      <div className="container-custom py-20">
        <h1 className="heading-2 text-center mb-8">Блог</h1>
        <p className="text-center text-gray-600">Страница в разработке...</p>
      </div>
    </>
  );
};

export default BlogPage;