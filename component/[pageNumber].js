// pages/[pageNumber].js

import { useRouter } from "next/router";

const PageNumber = () => {
  const router = useRouter();
  const { pageNumber } = router.query;

  return (
    <>
      <h1>Page {pageNumber} content</h1>
    </>
  );
};

export default PageNumber;
