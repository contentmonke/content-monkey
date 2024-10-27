import { Container, Pagination } from "@mui/material";
import { pagination } from "../style/review-page";

function CustomPagination({ scrollRef, items, page, handlePageChange }: any) {


  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handlePageChangeLocal = (pageCount: any) => {
    handlePageChange(pageCount);
    scrollToTop();
  }
  return (
    <Container sx={{ ...pagination }}>
      <Pagination
        count={Math.ceil(items.length / 10)}
        page={page}
        onChange={(event, pageCount) => handlePageChangeLocal(pageCount)}
      />
    </Container>

  );
}

export default CustomPagination;