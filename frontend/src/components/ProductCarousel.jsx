import { Link } from 'react-router-dom'; // kullanıcı link' bastığında sayfa yenilemeden kullanıcıyı sayfada yönlendirmek
import { Carousel, Image } from 'react-bootstrap'; // react-boots ilke hazır sayfa css'i
import Message from './Message'; // hata olursa message component'iminle hatayı göstericez
import { useGetTopProductsQuery } from '../slices/productsApiSlice'; // bir api isteği yapılacak

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel pause='hover' className='mb-4' style={{background: '#D97F30'}}>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`} style={{textDecoration: 'none'}}>

            <div className="d-flex justify-content-center align-items-center"> {/*react-bootstrap sayesinde classname'ye yazılan bu değerler react-bootstrap'te bulunan hazır css'leri çalıştırıyor */}
            <Image src={product.image} alt={product.name} fluid />
            </div>

            <div className='text-center' style={{marginBottom: '50px'}}> {/*corousel componunt'tan gelen 3 parça çizgi bizim h2 içeriklerimizle üst üste binmesin diye bu margin verilmiştir */}
              <h2 className='text-white'>
              {product.name} (${product.price})
              </h2>
            </div>
              
            
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
