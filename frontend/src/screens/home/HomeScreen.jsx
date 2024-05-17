import styled from "styled-components";
import Hero from "../../components/home/Hero";
import TopProductList from "../../components/home/TopProductList";
import Catalog from "../../components/home/Catalog";
import { mensCatalog } from "../../data/data";
import Brands from "../../components/home/Brands";

const HomeScreenWrapper = styled.main``;

const HomeScreen = () => {
  return (
    <HomeScreenWrapper>
      <Hero />
      <Brands />
      <TopProductList title={"Sản phẩm mới"} />
      <TopProductList title={"Sản phẩm bán chạy"} />
      <Catalog catalogTitle={"Các sản phẩm"} products={mensCatalog} />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
