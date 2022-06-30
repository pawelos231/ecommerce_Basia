import { commerce } from "../../lib/commerce";
import styles from "../../styles/productPage.module.sass";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.css";
import Description from "../../components/Products/Description/Description";
import { useState } from "react";
import ModalForPhotos from "../../components/Products/ModalPhotos/ModalForPhotos.js";
import { shimmer, toBase64 } from "../../components/ShimmerEffect/Shimmer";
import { fetchCart } from "../../actions/fetchcommerceCart";
import { useEffect } from "react";
import Variants from "../../components/Products/Description/VariantsGroups/Variants";
let index = 0;
export async function getStaticPaths() {
  const { data } = await commerce.products.list();
  const paths = data.map((item) => {
    return {
      params: { id: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const id = params.id;
  const { data } = await commerce.products.list({
    query: id,
  });
  if (!data.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { prodcs: data[0], updatedAt: Date.now() },
    revalidate: 1,
  };
}
const ProductDetails = ({ prodcs }) => {
  const [click, setClick] = useState(false);
  const setClickModal = (i) => {
    setClick(!click);
    index = i;
  };
  console.log(click);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  let value = useSelector((state) => {
    return state.SwitchToggle;
  });
  let cart = useSelector((state) => {
    return state.cartFetch.total_items;
  });
  console.log(prodcs, "SIEMA");
  if (!prodcs) return <div>loading...</div>;
  return (
    <>
      <Navbar totaltems={cart} />
      <div className={styles.mainContainer} data-ison={value}>
        <div className={styles.containerForContent}>
          <div>
            {click === true ? (
              <ModalForPhotos
                setClickModal={setClickModal}
                click={click}
                setClick={setClick}
                itemId={index}
                prodcs={prodcs}
              />
            ) : null}
            <Carousel
              swipeable
              infiniteLoop
              emulateTouch
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
              autoPlay
            >
              {prodcs.assets.map((item, i) => {
                return (
                  <>
                    <div
                      key={item.url}
                      className={styles.ImageCon}
                      onClick={() => setClickModal(i)}
                    >
                      <Image
                        src={item.url}
                        width={400}
                        height={300}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(400, 300)
                        )}`}
                        objectFit="cover"
                        layout="responsive"
                        quality={30}
                      />
                    </div>
                  </>
                );
              })}
            </Carousel>
          </div>
          <article>
            <h2>{prodcs.name}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              tempore exercitationem expedita dignissimos earum minima amet, eum
              itaque nesciunt, suscipit quaerat cupiditate quia sit voluptatibus
              accusamus laborum aperiam. Nemo, facere.
              <Variants prodcs={prodcs} />
            </p>
          </article>
        </div>
        <div className={styles.comments}>
          <Description prodcs={prodcs} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
